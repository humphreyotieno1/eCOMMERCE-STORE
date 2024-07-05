from flask import make_response, request
from flask_restful import Resource
from flask_jwt_extended import create_access_token
import logging

from models.user import User
# from models.admin import Admin

class Login(Resource):
    def post(self):
       
        try:
            data = request.get_json()
            user_name = data["username"]
            password = data["password"]
           
        except KeyError:
            return make_response({"error": "Username or password not provided"}, 400)
        
        user = User.query.filter_by(user_name=user_name).first()
        if user and user.check_password(password):
            access_token = create_access_token(identity=user.id)
            return make_response({"message": "User Login Success", "access_token": access_token}, 200) 
        
        else:
            return make_response({"error": "Invalid username or password"}, 401)

        
   