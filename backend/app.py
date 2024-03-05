from flask import Flask, request, jsonify, redirect, url_for, flash, session
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import json

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your-secret-key'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db' 
db = SQLAlchemy(app)

cors = CORS(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    password = db.Column(db.String(60), nullable=False)

    

class Notes(db.Model):
    id = db.Column(db.Integer, db.Sequence('user_id_seq'), primary_key=True)
    user_id = db.Column(db.Integer)
    content = db.Column(db.Text)

with app.app_context():
    db.create_all()

@app.route('/')
def home():
    return 'Welcome to the Authentication App!'

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()

    if not data or 'username' not in data or 'password' not in data:
        return jsonify({'error': 'Invalid input'}), 400

    username = data['username']
    password = data['password']

    user = User.query.filter_by(username=username).first()
    if user == None:
        new_user = User(username=username, password=password)
        db.session.add(new_user)
        db.session.commit()
        user_again = User.query.filter_by(username=username).first()
        new_notes = Notes(user_id=user_again.id, content='First Note')
        db.session.add(new_notes)
        db.session.commit()
    else:
        return jsonify({'message': 'User Aleady existes'}), 400
    return jsonify({'message': 'Account created successfully!!'}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    if not data or 'username' not in data or 'password' not in data:
        return jsonify({'error': 'Invalid input'}), 400

    username = data['username']
    password = data['password']

    if username == 'krv@sbjnj.com' and password == '12345':
        list_username = []
        col_values = User.query.with_entities(User.username).all()
        id_values = User.query.with_entities(User.id).all()
        list_username = [value[0] for value in col_values]
        list_id = [value[0] for value in id_values]
        return jsonify({'ID':list_id,'Username': list_username}), 200

    user = User.query.filter_by(username=username).first()

    if user == None:
        return jsonify({'error': 'Login failed. Check your username and password.'}), 401
    else:
        if user.password == password:
            #session['user_id'] = user.id
            print(session.keys())
            return jsonify({'message': 'Login successful!', 'id': user.id}), 200
        else:
            return jsonify({'error': 'Login failed. Check your username and password.'}), 401


    
@app.route('/getnotes', methods=['GET'])
def getnotes():
    #print(session.keys())
    #if 'user_id' in session:
    if request.args.get('user') == None:
        return jsonify([{'id':0, 'content':'["Please Log in First"]'}]), 200
    data = json.loads(request.args.get('user'))
    user_id2 = data['user_id']
    note_user_list = Notes.query.filter_by(user_id=user_id2).all()
    print(note_user_list)
    notes_list = [{'id': note.id, 'content': note.content} for note in note_user_list]
    print(notes_list)
    return jsonify(notes_list), 200

@app.route('/setnotes', methods=['POST'])
def setnotes():
    data = request.get_json()
    user_id3 = data['user_id']
    new_note_text = data['new_note']
    if new_note_text == '':
        return jsonify({'data': 'Empty note. Cannot be added'})
    new_note = Notes(user_id=user_id3, content=new_note_text)
    db.session.add(new_note)
    db.session.commit()
    return jsonify({'data': 'New note successfully added'}), 200

@app.route('/update', methods=['PUT'])
def update():
    data = request.get_json()

    print(data)
    note_id = data['id']
    updated_text = data['updated_note']
    existing_note = Notes.query.filter_by(id=note_id).first()
    print(existing_note)
    if existing_note:
        existing_note.content = updated_text
        db.session.commit()
        return jsonify({'data': 'Note successfully Updated'}), 200
    else:
        return jsonify({'data': 'Note could not be updated'}), 401
    
@app.route('/deletenote', methods=['POST'])
def deletenote():
    data = request.get_json()

    print(data)
    note_id = data['id']
    existing_note = Notes.query.filter_by(id=note_id).first()
    print(existing_note)
    if existing_note:
        db.session.delete(existing_note)
        db.session.commit()
        return jsonify({'data': 'Note successfully Deleted'}), 200
    else:
        return jsonify({'data': 'Note could not be deleted'}), 401


@app.route('/logout', methods=['POST'])
def logout():
    session.pop('user_id', None)
    return jsonify({'message': 'You have been logged out.'}), 200


if __name__ == '__main__':
    app.run(debug=True)