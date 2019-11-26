import flask
from flask import Flask, Response, redirect, url_for, request, session, abort
from flask_login import LoginManager, UserMixin, login_required, login_user, logout_user
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
from bson import json_util
from bson.json_util import dumps, loads  # used to convert Python MongoDB JSON to/from BSON
from flask import Flask, Response, redirect, url_for, request, session, abort
from flask_login import LoginManager, UserMixin, login_required, login_user, logout_user


app = flask.Flask("__main__")

# Setting up database

app.config.update(
    DEBUG=True,
    SECRET_KEY='the_biggest_secret'
)
mongo = PyMongo(app,
                     uri='mongodb+srv://testUser:testUserUltimate3@ultimatesurvey-74jff.mongodb.net/Platform?retryWrites=true&w=majority')


# flask-login
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = "login"


# silly user model
class User(UserMixin):
    def __init__(self, username):
        self.username = username

    # def __repr__(self):
    #     return "%d/%s/%s" % (self.id, self.name, self.password)

    def get_id(self):
        return self.username


# TODO - Convert our database into user objects for flask authentication
# I think loader will load the data from database

# users = [User(id) for id in range(1, 21)]


# # some protected url
# @app.route('/')
# @login_required
# def home():
#     return Response("Hello World!")
#

# somewhere to login
@app.route("/login", methods=["GET", "POST"])
def login():
    users = mongo.db.Employees
    person = users.find_one({'username': request.json['username']})
    if person:
    # hashed = bcrypt.hashpw(request.json['password'].encode('utf-8'), bcrypt.gensalt())
    # if bcrypt.checkpw(login_user['password'].encode('utf-8'), hashed):
    #     session['email'] = request.json['email']
    #     return 'You in'
        if person['password'] == request.json['password']:
            user_obj = User(person['username'])
            login_user(user_obj)
            return 'You have logged in!'

    return 'Invalid username or password'


# somewhere to logout
# TODO - how to call logout
@app.route('/logout')
@login_required
def logout():
    logout_user()
    return 'You logged out!'


# can delete
# handle login failed
@app.errorhandler(401)
def page_not_found():
    return Response('<p>Login failed</p>')


# callback to reload the user object
@login_manager.user_loader
def load_user(username):
    u = mongo.db.Employees.find({"username": username})
    if not u:
        return None
    return User(username=username)


# ---------------------------------------------------------------- Authentication above
# TESTING -----------------------------------------------------------

@app.route('/user/test', methods=['GET'])
@login_required
def get_user_id():

    return 'You are In'

# -----------------------------------------------------------------------------------------
# GET - return responses for a certain employeeid
# POST - pushes a survey response to the database
@app.route('/response/<user_id>', methods=['GET', 'POST'])
@login_required
def user_response(user_id):
    if flask.request.method == 'GET':
        responses = mongo.db.Responses
        cursor_query = responses.find({"employeeid": ObjectId(user_id)})
        return dumps(list(cursor_query))

    elif flask.request.method == 'POST':
        responses = mongo.db.Responses
        body = request.json
        _employeeid = ObjectId(user_id)
        object_id = responses.insert({'surveyid': 'SomeSurveyid', 'response': body, 'employeeid': _employeeid})
        return "Inserted Response for Employee " + str(user_id)

    # GET - return a list of all surveys available to a employee


#GET - return responses for a certain employeeid
#POST - pushes a survey response to the database
@app.route('/response/<user_id>', methods=['GET', 'POST'])
def user_response(user_id):
	if flask.request.method == 'GET':
		responses = mongo.db.Responses
		cursor_query= responses.find({"employeeid":ObjectId(user_id)})
		return dumps(list(cursor_query))

	elif flask.request.method == 'POST':
		responses = mongo.db.Responses
		body = request.get_json(force=True)
		_employeeid = ObjectId(user_id)
		object_id = responses.insert_one({'surveyid': 'SomeSurveyid', 'response':body, 'employeeid':_employeeid})
		return "Inserted Response for Employee " + str(user_id) 

#GET - return a list of all surveys available to a employee
@app.route('/survey/employee/<user_id>', methods=['GET'])
@login_required
def user_survey(user_id):
    if flask.request.method == 'GET':
        surveys = mongo.db.Surveys
        cursor_query = surveys.find({'Employees': ObjectId(user_id)})
        return dumps(list(cursor_query))


# MANAGER ----------------------------------------------------------------
#GET - return a list of all surveys created by a manager
#POST - submit a new survey - survey body is not modified - also performs query of employees under manger
@app.route('/survey/manager/<manager_id>', methods=['GET', 'POST'])
@login_required
def get_created_surveys(manager_id):
    if flask.request.method == 'GET':
        surveys = mongo.db.Surveys
        cursor_query = surveys.find({"manager": ObjectId(
            manager_id)})  # we will need to join question objects here, I'm thinking a function that queries for all the needed questions and replaces each index of the questions array with the proper object, will need this to get single surveys too
        return dumps(list(cursor_query))
    else:
        # TODO - implement POST
        surveys = mongo.db.Surveys
        body = request.json
        to_send = {'survey': body, 'manager': ObjectId(manager_id),
                   'Employees': ['5d9f7051269df83d214204b4', '5d9f7051269df83d214204b0']}
        object_id = surveys.insert(to_send)
        return "Inserted survey for manger: " + str(manager_id)


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
@login_required
def get_survey_respones(survey_id):
    responses = mongo.db.Responses
    cursor_query = responses.find({'surveyid': ObjectId(survey_id)})
    return dumps(list(cursor_query))


if __name__ == '__main__':
    app.run(debug=True)