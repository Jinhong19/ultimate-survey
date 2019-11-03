import flask

app = flask.Flask("__main__")


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all_urls(path):
    return flask.render_template("index.html")


app.run(debug=True)
