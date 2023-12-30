from flask import Flask

##app = Flask(__name__, instance_relative_config=True)
app = Flask(__name__)

from app import routes

""" app.config.from_object('config')
app.debug = True """