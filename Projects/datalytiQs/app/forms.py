from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, TextAreaField
from wtforms.validators import DataRequired, Length, Email

class ContactForm(FlaskForm):
    your_name = StringField('Your Name', validators=[DataRequired(), Length(min=3, max=100)])
    email_address = StringField('Email Address', validators=[DataRequired(), Email()])
    message = TextAreaField('Message', validators=[DataRequired(), Length(min=3, max=500)])
    submit = SubmitField('Submit')