from flask import make_response
from flask_restful import Resource


class Home(Resource):
    def get(self):
        return make_response({"message": "Welcome to Geocel Enterprises API"}, 200)
    