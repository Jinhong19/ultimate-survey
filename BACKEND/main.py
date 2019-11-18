from flask import Flask, jsonify, request
import flask
from flask_pymongo import PyMongo
import json
import ast
from bson.objectid import ObjectId
from bson.json_util import dumps, loads #used to convert Python MongoDB JSON to/from BSON


app = flask.Flask("__main__")

app.config['MONGO_DBNAME'] = 'Platform'
username = "testUser"
password = "testUserUltimate3"
app.config['MONGO_URI'] = "mongodb+srv://" + username + ":"+ password +"@ultimatesurvey-74jff.mongodb.net/" + 'Platform' +"?retryWrites=true&w=majority"

mongo = PyMongo(app)

#TESTING -----------------------------------------------------------
@app.route('/user/<email>', methods=['GET'])
def get_user_id(email):
	user_dictionary = {'Deangelo_Durham@bluesorbetsecurity.com': '5d9f7051269df83d214204b4',
						'Stephany_Knox@bluesorbetsecurity.com':"5d9f7051269df83d214204b0"}
	return user_dictionary[email]

#EMPLOYEEE ----------------------------------------------------------

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
		body = request.json
		_employeeid = ObjectId(user_id)
		object_id = responses.insert_one({'surveyid': 'SomeSurveyid', 'response':body, 'employeeid':_employeeid})
		return "Inserted Response for Employee " + str(user_id) 

#GET - return a list of all surveys available to a employee
@app.route('/survey/employee/<user_id>', methods=['GET'])
def user_survey(user_id):
	if flask.request.method == 'GET':
		surveys = mongo.db.Surveys
		cursor_query = surveys.find({'Employees':ObjectId(user_id)})
		return dumps(list(cursor_query))



#MANAGER ----------------------------------------------------------------

#GET - return a list of all surveys created by a manager
#POST - submit a new survey - survey body is not modified - also performs query of employees under manger
@app.route('/survey/manager/<manager_id>', methods=['GET', 'POST'])
def get_created_surveys(manager_id):
	if flask.request.method == 'GET':
		surveys = mongo.db.Surveys
		cursor_query = surveys.find({"manager":ObjectId(manager_id)})
		return dumps(list(cursor_query))
	else:
		#TODO - implement POST
		surveys = mongo.db.Surveys
		body = request.json
		employees = userDFS(manager_id)
		to_send = {'survey': body, 'manager': ObjectId(manager_id), 'Employees':employees}
		surveys.insert_one(to_send)
		return "Inserted survey for manger: "+ str(manager_id)


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
			result.append(ObjectId(doc['_id']))
	return result


@app.route('/responses/<survey_id>', methods=['GET'])
def get_survey_respones(survey_id):
	responses = mongo.db.Responses
	cursor_query = responses.find({'surveyid': ObjectId(survey_id)})
	return dumps(list(cursor_query))


if __name__ == '__main__':
    app.run(debug=True)
