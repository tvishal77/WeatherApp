from flask import Flask, json,redirect,render_template,flash,request
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash,check_password_hash
from flask_login import UserMixin

# mydatabase connection
local_server=True
app=Flask(__name__)
app.secret_key="vishal"

# app.config['SQLALCHEMY_DATABASE_URI']='mysql://username:password@localhost/databsename'
app.config['SQLALCHEMY_DATABASE_URI']='mysql://root:@localhost/weather_app'
db=SQLAlchemy(app)


#class used to represent test table
class Test(db.Model):
    id=db.Column(db.Integer,primary_key=True)
    name=db.Column(db.String(50))

#class used to represent user table
class User(UserMixin,db.Model):
    id=db.Column(db.Integer,primary_key=True)
    uname=db.Column(db.String(20),unique=True)
    emailid=db.Column(db.String(50))
    passw=db.Column(db.String(1000))
#Home page routing
@app.route("/")
def home():
    return render_template("login.html")

@app.route("/signup2",methods=['POST','GET'])
def sign():
    if request.method=="POST":
        uname=request.form.get("username")
        emailid=request.form.get("email")
        passw=request.form.get("password")
        #print(uname,emailid,passw)
        encpassword=generate_password_hash(passw)
        user=User.query.filter_by(uname=uname).first()
        emailUser=User.query.filter_by(emailid=emailid).first()
        if user or emailUser:
            flash("Email or username is already taken","warning")
            return render_template("signup2.html")
        
        new_user=db.engine.execute(f"INSERT INTO `user` (`uname`,`emailid`,`passw`) VALUES ('{uname}','{emailid}','{encpassword}') ")
        flash("SignUp Success Please Login","success")
        return render_template("login.html")
        
    return render_template("signup2.html")

@app.route("/login",methods=['POST','GET'])
def login():
    if request.method=="POST":
        uname=request.form.get("username")
        passw=request.form.get("password")
        user=User.query.filter_by(uname=uname).first()
        if user and check_password_hash(user.passw,passw):
            flash("Login Success","info")
            return render_template("weather.html")
        else:
            flash("Invalid Credentials","danger")
            return render_template("login.html")
    return render_template("login.html")

@app.route("/logout",methods=['POST','GET'])
def logout():
    return redirect('/login')
# testing wheather db is connected or not  
@app.route("/test")
def test():
    try:
        a=Test.query.all()
        print(a)
        return f'MY DATABASE IS CONNECTED'
    except Exception as e:
        print(e)
        return f'MY DATABASE IS NOT CONNECTED {e}'

# To run the web application
app.run(debug=True)