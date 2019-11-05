# ultimate-survey
Set up:
npm install
pip install dnspython Flask Flask-pymongo

To modify frontend:
1. go to dir react_frontend
2. npm run build

To run the project:
1. go to flask_backend dir
2. python main.py
3. go to local host 5000

How to use end point in react to fetch data:
```
fetch('https://mywebsite.com/endpoint/', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    firstParam: 'yourValue',
    secondParam: 'yourOtherValue',
  })
})
```
