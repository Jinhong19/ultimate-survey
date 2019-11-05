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

  state = {
    contacts: []

  }

 componentDidMount() {
    fetch('http://127.0.0.1:5000/response/5d9f7051269df83d214204b4')
    .then(res => res.json())
    .then((data) => {
         this.setState({ contacts: data })
       })
       .catch(console.log)
  }
  
  #data stored in this.state
