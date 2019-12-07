import flask
from flask_cors import cross_origin
from flask import Flask, Response, redirect, url_for, request, session, abort
from flask_login import LoginManager, UserMixin, login_required, login_user, logout_user, current_user
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
from bson import json_util
from bson.json_util import dumps, loads  # used to convert Python MongoDB JSON to/from BSON
from flask import Flask, Response, redirect, url_for, request, session, abort
from flask_login import LoginManager, UserMixin, login_required, login_user, logout_user
from passlib.hash import sha256_crypt

# Flask App
app = flask.Flask("__main__")
app.config.update(
    DEBUG=True,
    SECRET_KEY='the_biggest_secret'
)

# DB connection
mongo = PyMongo(app,
                uri='mongodb+srv://testUser:testUserUltimate3@ultimatesurvey-74jff.mongodb.net/Production?retryWrites=true&w=majority')

# flask-login
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = "login"


class User(UserMixin):
    def __init__(self, person):
        self.username = person['email']
        self._id = str(person['_id'])
        # check if word "manager" is in positionTitle field
        # self.isManager = "Manager" in person['positionTitle'] or "manager" in person['positionTitle']
        # check if any employees in the same company has managerId equals to person['employeeId]
        def isManager():
            employees = mongo.db.Employees
            employeeId = person['employeeId']
            companyId = person['companyId']
            has_one_employee = employees.find_one({'managerId': employeeId, 'companyId': companyId}) is not None
            return has_one_employee
        self.isManager = isManager()
        self.fname = person['firstName']
        self.lname = person['lastName']

    def get_id(self):
        return self.username

    def get_objectid(self):
        return self._id


# AUTHENTICATION -------------------------------------------------------

# Grab the hashed password from database (in order to change the normal pw to hashed-pw, use /resetPassword,
# type in any password, it will be hashed and stored)
# Hash user input password, then compare password
@app.route("/login", methods=["GET", "POST"])
@cross_origin(supports_credentials=True)
def login():
    users = mongo.db.Employees
    person = users.find_one({'email': request.get_json(force=True)['username']})
    if person:
        if request.get_json(force=True)['password'] == person['password'] : # sha256_crypt.verify(request.get_json(force=True)['password'], person['password'])
            user_obj = User(person)
            login_user(user_obj)
            return flask.jsonify({'message': 'success', 'isManager': user_obj.isManager, 'fname': user_obj.fname,
                                  'lname': user_obj.lname})
    return flask.jsonify({'message': "failure"})


# Get request to logout
@app.route('/logout')
@login_required
@cross_origin(supports_credentials=True)
def logout():
    logout_user()
    return flask.jsonify({'message': 'success'})


@app.errorhandler(400)
def not_log_in(a):
    return flask.jsonify({'message': "Please login first."})


# callback to reload the user object
@login_manager.user_loader
def load_user(username):
    user = mongo.db.Employees.find_one({"email": username})
    if not user:
        return None
    return User(user)


# reset password, and store hashed password in the database
@app.route('/resetPassword', methods=['POST'])
def update_password():
    users = mongo.db.Employees
    body = request.get_json(force=True)
    user = users.find_one({"email": body["username"]})
    if not user:
        return flask.jsonify({"message": "Username does not exist."})
    elif not body["password"]:
        return flask.jsonify({"message": "Password can not be empty."})
    else:
        hashed_pw = sha256_crypt.encrypt(body["password"])
        users.update({"email": body["username"]}, {"$set": {"password": hashed_pw}}, upsert=False)
        return flask.jsonify({'message': "Reset Password Success!"})


# EMPLOYEE ---------------------------------------------------------------- 

# GET - return responses for a certain employeeid
# POST - pushes a survey response to the database
@app.route('/response', methods=['GET', 'POST'])
@login_required
@cross_origin(supports_credentials=True)
def user_response():
    if flask.request.method == 'GET':
        responses = mongo.db.Responses
        cursor_query = responses.find({"employeeid": ObjectId(current_user._id)})
        return flask.jsonify(dumps(list(cursor_query)))

    elif flask.request.method == 'POST':
        responses = mongo.db.Responses
        body = request.get_json(force=True)
        _employeeid = ObjectId(current_user._id)
        object_id = responses.insert_one({'surveyid': 'SomeSurveyid', 'response': body, 'employeeid': _employeeid})
        return flask.jsonify({'message': "Inserted Response for Employee " + str(current_user._id)})


# GET - return a list of all surveys available to a employee
@app.route('/survey/employee', methods=['GET'])
@cross_origin(supports_credentials=True)
@login_required
def user_survey():
    if flask.request.method == 'GET':
        surveys = mongo.db.Surveys
        cursor_query = surveys.find({'Employees': ObjectId(current_user._id)})
        return flask.jsonify(dumps(list(cursor_query)))

@app.route('/submitted/<survey_id>', methods=['GET'])
@cross_origin(supports_credential=True)
@login_required
def check_if_submitted(survey_id):
    if flask.request.method == 'GET':
        surveys = mongo.db.Surveys
        responses = mongo.db.Responses
        survey_object = surveys.find_one({'_id':ObjectId(survey_id),'Employees':ObjectId(current_user._id)}) 
        survey_exists = (survey_object != None)
        if survey_exists:
            response_object = responses.find_one({'employeeid':ObjectId(current_user._id), 'surveyid':ObjectId(survey_id)})
            responded_to = (response_object != None)
        else:
            response_object = None
            responded_to = False
        return flask.jsonify(dumps({'survey_exists':survey_exists, 'survey_object':survey_object, 'responded_to':responded_to, 'response_object':response_object}))
        


        #how will this be impacted by changing getting surveys functionality?



# MANAGER ----------------------------------------------------------------

# GET - return a list of all surveys created by a manager
# POST - submit a new survey - survey body is not modified - also performs query of employees under manger
@app.route('/survey/manager', methods=['GET', 'POST'])
@cross_origin(supports_credentials=True)
@login_required
def get_created_surveys():
    if flask.request.method == 'GET':
        surveys = mongo.db.Surveys
        cursor_query = surveys.find({"manager": ObjectId(current_user._id)})
        print(current_user._id)
        return flask.jsonify(dumps(list(cursor_query)))
    else:
        surveys = mongo.db.Surveys
        body = request.get_json(force=True)
        to_send = {'survey': body, 'manager': ObjectId(current_user._id),
                   'Employees': userDFS(current_user._id)}
        object_id = surveys.insert(to_send)
        return flask.jsonify({'message': "Inserted survey for manger: " + str(current_user._id)})


def userDFS(manager_id):
    employees = mongo.db.Employees
    query = {'_id': ObjectId(manager_id)}
    manager_data = employees.find(query)
    manager_count = employees.count_documents(query)

    result = []
    if manager_count > 0:
        entry = manager_data.next()
        manager_employeeid = entry['employeeId']

        query = {'managerId': manager_employeeid}
        employees_of = employees.find(query)
        count_employees_of = employees.count_documents(query)

        for doc in employees_of:
            user_employees = userDFS(doc['_id'])
            result.append(ObjectId(doc['_id']))
            for user in user_employees:
                result.append(user)
    return result


@app.route('/responses/<survey_id>', methods=['GET'])
@cross_origin(supports_credentials=True)
@login_required
def get_survey_respones(survey_id):
    responses = mongo.db.Responses
    cursor_query = responses.find({'surveyid': ObjectId(survey_id)})
    return flask.jsonify(dumps(list(cursor_query)))


@app.route('/user/info',methods=['GET'])
@cross_origin(supports_credentials=True)
@login_required
def get_user_info():
    return flask.jsonify({
        "firstName": current_user.fname,
        "lastName": current_user.lname,
        "_id": current_user._id,
        "isManager": current_user.isManager
    })

if __name__ == '__main__':
    app.run(debug=True)
