from flask import Flask, jsonify, request, session, redirect, url_for
import flask
from flask_pymongo import PyMongo
import ast
from bson.objectid import ObjectId
from bson.json_util import dumps, loads  # used to convert Python MongoDB JSON to/from BSON
import bcrypt
from flask_login import LoginManager, UserMixin, login_required, login_user, logout_user

# pip install Flask Flask-PyMongo
# Example API URL: http://127.0.0.1:5000/response/5d9f7051269df83d214204b4

app = flask.Flask("__main__")
app.config['SECRET_KEY'] = 'I am the strongest man alive'
# app.config['MONGO_DBNAME'] = 'Platform'
# app.config[
#     'MONGO_URI'] = 'mongodb+srv://testUser:testUserUltimate3@ultimatesurvey-74jff.mongodb.net/' + 'Platform' + '?retryWrites=true&w=majority'
# mongo = PyMongo(app)
# we can add more database, if needed
PlatformDB = PyMongo(app,
                     uri='mongodb+srv://testUser:testUserUltimate3@ultimatesurvey-74jff.mongodb.net/Platform?retryWrites=true&w=majority')


login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = "login"

# used to get all the routing in react to work ###
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all_urls(path):
    if 'email' in session:
        email = session['email']
        return 'Hi '+email
    return flask.render_template("index.html")


##################################################


# TODO - login ----------------------------------
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
# TODO - hash password in the future
@app.route("/login", methods=["GET", "POST"])
def login():
    users = PlatformDB.db.Employees
    person = users.find_one({'username': request.json['username']})
    if person:
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


# callback to reload the user object
@login_manager.user_loader
def load_user(username):
    u = PlatformDB.db.Employees.find({"username": username})
    if not u:
        return None
    return User(username=username)

# FOR TESTING
# Get User ID - in the database, Stephany is the manager of Deangelo - there is a survey created and a response in the database
@app.route('/user/<email>', methods=['GET', 'POST'])
def get_user_id(email):
    if request.method == "GET":
        users = PlatformDB.db.Employees
        login_user = users.find_one({'email': email})
        if login_user:
            return login_user
        else:
            return 'not found'
    elif request.method == "POST":
        req_Json = request.json
        name = req_Json['name']
        return jsonify({"response": "Hi " + name + ", you can do it!"})


# EMPLOYEEE ----------------------------------------------------------

# GET - return a list of all responses for a certain employeeid
# POST - pushes a response to the database
# example post request - {"surveyid":"5d9e2dea1c9d440000ef1937","answers":["Nice",4]}
@app.route('/response/<user_id>', methods=['GET', 'POST'])
def user_response(user_id):
    if flask.request.method == 'GET':
        responses = PlatformDB.db.Responses
        cursor_query = responses.find({"employeeid": ObjectId(user_id)})
        if cursor_query is None:
            return []
        else:
            return dumps(list(cursor_query))
    elif flask.request.method == 'POST':
        # TODO - implement POST response
        responses = PlatformDB.db.Responses
        body = request.json
        _surveyid = ObjectId(body['surveyid'])
        _answers = body['answers']
        _employeeid = ObjectId(user_id)

        object_id = responses.insert({'surveyid': _surveyid, 'answers': _answers, 'employeeid': _employeeid})
        return "Inserted Response for Employee " + str(user_id)

    else:
        return ""


# GET - return a list of all surveys available to a employee
@app.route('/survey/employee/<user_id>', methods=['GET'])
def user_survey(user_id):
    if flask.request.method == 'GET':
        surveys = mongo.db.Surveys
        cursor_query = surveys.find({'Employees': ObjectId(user_id)})
        return dumps(list(cursor_query))


# TODO - implement POST


# MANAGER ----------------------------------------------------------------

# GET - return a list of all surveys created by a manager
# POST - submit a new survey
@app.route('/survey/manager/<manager_id>', methods=['GET', 'POST'])
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


@app.route('/responses/<survey_id>', methods=['GET'])
def get_survey_respones(survey_id):
    responses = mongo.db.Responses
    cursor_query = responses.find({'surveyid': ObjectId(survey_id)})
    return dumps(list(cursor_query))


if __name__ == '__main__':
    app.run(debug=True)
