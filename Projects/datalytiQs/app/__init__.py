from flask import Flask
from flask_sqlalchemy import SQLAlchemy as SA
from config import Config as config

app = Flask(__name__)
app.config['SECRET_KEY'] = config.SECRET_KEY
app.config['SQLALCHEMY_DATABASE_URI'] = config.SQLALCHEMY_DATABASE_URI
db = SA(app)


from app import routes
