from datetime import datetime
from app import db

class Contact(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(150), nullable=False)
    content = db.Column(db.Text, nullable=False)
    date_posted = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    def __init__(self, username, email, content):
        self.username = username
        self.email = email
        self.content = content
    
    def __repr__(self):
        return f"User('{self.username}', '{self.email}', '{self.date_posted}')"