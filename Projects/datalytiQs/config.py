# Enable Flask's debugging features. Should be False in production

import os

class Config:
    DEBUG = True
    SECRET_KEY = os.environ.get('SECRET_KEY')
    SQLALCHEMY_DATABASE_URI = os.environ.get('SQLALCHEMY_DATABASE_URI')  #'sqlite:///site.db'