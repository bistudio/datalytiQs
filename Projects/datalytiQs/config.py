# Enable Flask's debugging features. Should be False in production

import os

DEBUG = True
SECRET_KEY = os.environ.get('SECRET_KEY')