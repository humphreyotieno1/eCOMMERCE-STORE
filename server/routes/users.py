from flask import make_response, jsonify, request
from flask_restful import Resource
from flask_jwt_extended import create_access_token, jwt_required, get_jwt


from dbconfig import db
from models.user import User


class Users(Resource):
    def get(self):
        try:
            users = [
                user.to_dict(
                    rules=["-orders", "-cart_items", "-services", "-_password_hash"]
                )
                for user in User.query.all()
            ]
            return make_response(jsonify(users), 200)
        except Exception as e:
            return {"message": "Error retrieving users", "error": str(e)}, 500


class UserById(Resource):
    def get(self, id):
        user = (
            User.query.filter_by(id=id)
            .first()
            .to_dict(rules=["-orders", "-cart_items", "-services", "-_password_hash"])
        )
        if not user:
            return {"message": "User not found"}, 404

        return make_response(user, 200)

    def delete(self, id):
        user = User.query.filter(User.id == id).first()
        if not user:
            return {"message": "User not found"}, 404

        db.session.delete(user)
        db.session.commit()

        return make_response({"message": "User deleted successfully"}, 200)
    