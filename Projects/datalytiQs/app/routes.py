from flask import render_template, request, redirect, url_for, flash, session, send_from_directory
from app import app
from app.forms import ContactForm
import config

app.config['SECRET_KEY'] = config.SECRET_KEY

@app.route('/get_json_data')
def get_json_data():
    json_file_path = './data/testimonials.json'
    return send_from_directory(app.root_path, json_file_path, as_attachment=True)

@app.route('/')
@app.route('/home')
def home():
    return render_template('home.html', title='Home')

@app.route('/clientwork')
def client_work():
    return render_template('clientwork.html', title='Client Work')

@app.route('/projects')
def projects():
    return render_template('projects.html', title='Projects')

@app.route('/casestudies')
def case_studies():
    return render_template('casestudies.html', title='Case Studies')

@app.route('/blogs')
def blogs():
    return render_template('blogs.html', title='Blogs')

@app.route('/contact')
def contact():
    form = ContactForm()
    if form.validate_on_submit():
        flash('Thanks {}, we have received your message!'.format(form.your_name.data))
        return redirect(url_for('home'))
    return render_template('contact.html', title='Contact', form=form)