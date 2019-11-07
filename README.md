# ultimate-survey

Set up:
```
npm install
npm i
pip install dnspython Flask Flask-pymongo
```
To modify frontend:
1. go to dir react_frontend
2. npm run build

To run the project:
1. go to flask_backend dir
2. python main.py
3. go to local host 5000

How to use end point in react to fetch data:
```
fetch('http://127.0.0.1:5000/response/5d9f7051269df83d214204b4', {
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
