from flask import Flask, render_template, request, redirect, url_for, flash, session

app = Flask(__name__)

@app.route('/')
@app.route('/home')
def home():
    return render_template('home.html')

@app.route('/clientwork')
def client_work():
    return render_template('clientwork.html')

@app.route('/projects')
def projects():
    return render_template('projects.html')

@app.route('/casestudies')
def case_studies():
    return render_template('casestudies.html')

@app.route('/contact')
def contact():
    return render_template('contact.html')


if __name__ == '__main__':
    app.run(debug=True)