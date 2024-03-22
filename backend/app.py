from flask import Flask

app = Flask(__name__)


try:
    from controllers import *
except Exception as e:
    print(e)


@app.route('/')
def index():
    return 'Hello World!'

if __name__ == '__app__':
    app.run(debug = True)