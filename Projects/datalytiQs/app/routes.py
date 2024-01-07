from flask import render_template, request, redirect, url_for, flash, session, send_from_directory
from app import app, db
from app.forms import ContactForm
from app.models import Contact


@app.route('/get_json_data')
def get_json_data():
    json_file_path = './data/testimonials.json'
    return send_from_directory(app.root_path, json_file_path, as_attachment=True)

@app.route('/gender_paygap_json_data')
def gender_paygap_json_data():
    json_file_path = './data/gender_pay_gap.json'
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

@app.route('/contact', methods=['GET', 'POST'])
def contact():
    form = ContactForm(request.form)
    if form.validate_on_submit():
        username = form.your_name.data
        email = form.email_address.data
        message = form.message.data
        # create a new user record in the database
        contact = Contact(username, email, message)
        db.session.add(contact)       
        # commit all changes to the database
        db.session.commit()
        flash('Thanks {}, we have received your message!'.format(form.your_name.data))
        return redirect(url_for('home'))
    else:
        # show validaton errors
        # see https://pythonprogramming.net/flash-flask-tutorial/
        for field, errors in form.errors.items():
            for error in errors:
                flash("Error in {}: {}".format(
                    getattr(form, field).label.text,
                    error
                ), 'error')
        return render_template('contact.html', form=form)
    return render_template('contact.html', title='Contact', form=form)