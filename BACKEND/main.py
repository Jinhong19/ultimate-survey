import flask
from flask import Flask, Response, redirect, url_for, request, session, abort
from flask_login import LoginManager, UserMixin, login_required, login_user, logout_user, current_user
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
from bson import json_util
from bson.json_util import dumps, loads  # used to convert Python MongoDB JSON to/from BSON
from flask import Flask, Response, redirect, url_for, request, session, abort
from flask_login import LoginManager, UserMixin, login_required, login_user, logout_user

#Flask App
app = flask.Flask("__main__")
app.config.update(
    DEBUG=True,
    SECRET_KEY='the_biggest_secret'
)

#DB connection
mongo = PyMongo(app, uri='mongodb+srv://testUser:testUserUltimate3@ultimatesurvey-74jff.mongodb.net/Platform?retryWrites=true&w=majority')

# flask-login
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = "login"

class User(UserMixin):
    def __init__(self, person):
        self.username = person['email']
        self._id = str(person['_id'])
    def get_id(self):
        return self.username
    def get_objectid(self):
        return self._id

# AUTHENTICATION -------------------------------------------------------

@app.route("/login", methods=["GET", "POST"])
def login():
    users = mongo.db.Employees
    person = users.find_one({'email': request.get_json(force=True)['username']})
    if person:
    # hashed = bcrypt.hashpw(request.json['password'].encode('utf-8'), bcrypt.gensalt())
    # if bcrypt.checkpw(login_user['password'].encode('utf-8'), hashed):
    #     session['email'] = request.json['email']
    #     return 'You in'
        if person['password'] == request.get_json(force=True)['password']:
            user_obj = User(person)
            login_user(user_obj)
            return flask.jsonify({'message':'You have logged in!'})

    return flask.jsonify({'message':"Invalid username or password"})

@app.route('/logout')
@login_required
def logout():
    logout_user()
    return flask.jsonify({'message':'You logged out!'})

@app.errorhandler(401)
def page_not_found():
    return Response('<p>Login failed</p>')

# callback to reload the user object
@login_manager.user_loader
def load_user(username):
    user = mongo.db.Employees.find_one({"email": username})
    if not user:
        return None
    return User(user)


# EMPLOYEE ---------------------------------------------------------------- 

#GET - return responses for a certain employeeid
#POST - pushes a survey response to the database
@app.route('/response', methods=['GET', 'POST'])
@login_required
def user_response():
	if flask.request.method == 'GET':
		responses = mongo.db.Responses
		cursor_query= responses.find({"employeeid":ObjectId(current_user._id)})
		return flask.jsonify(dumps(list(cursor_query)))

	elif flask.request.method == 'POST':
		responses = mongo.db.Responses
		body = request.get_json(force=True)
		_employeeid = ObjectId(current_user._id)
		object_id = responses.insert_one({'surveyid': 'SomeSurveyid', 'response':body, 'employeeid':_employeeid})
		return flask.jsonify({'message':"Inserted Response for Employee " + str(current_user._id)})

#GET - return a list of all surveys available to a employee
@app.route('/survey/employee', methods=['GET'])
@login_required
def user_survey():
    if flask.request.method == 'GET':
        surveys = mongo.db.Surveys
        cursor_query = surveys.find({'Employees': ObjectId(current_user._id)})
        return flask.jsonify(dumps(list(cursor_query)))


# MANAGER ----------------------------------------------------------------

#GET - return a list of all surveys created by a manager
#POST - submit a new survey - survey body is not modified - also performs query of employees under manger
@app.route('/survey/manager', methods=['GET', 'POST'])
@login_required
def get_created_surveys():
    if flask.request.method == 'GET':
        surveys = mongo.db.Surveys
        cursor_query = surveys.find({"manager": ObjectId(current_user._id)})  
        return flask.jsonify(dumps(list(cursor_query)))
    else:
        surveys = mongo.db.Surveys
        body = request.get_json(force=True)
        to_send = {'survey': body, 'manager': ObjectId(current_user._id),
                   'Employees': userDFS(current_user._id)}
        object_id = surveys.insert(to_send)
        return flask.jsonify({'message':"Inserted survey for manger: " + str(current_user._id)})


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
    return flask.jsonify(dumps(list(cursor_query)))


if __name__ == '__main__':
    app.run(debug=True)