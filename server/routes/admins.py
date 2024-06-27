from flask import make_response, request, jsonify
from flask_restful import Resource

from dbconfig import db
from models.admin import Admin


class Admins(Resource):
    def get(self):
        try:
            admins= [admin.to_dict() for admin in Admin.query.all()]
            return make_response(jsonify(admins), 200)
        except Exception as e:
            return {"message":"Error retrieving admins", "error": str(e)}, 500
        

class AdminById(Resource):
    def get(self, id):
        admin = Admin.query.filter_by(id=id).first().to_dict()
        if not admin:
            return {"message": "Admin not found"},404
        
        return make_response(admin, 200)
    
    def delete(self, id):
        admin = Admin.query.filter(Admin.id==id).first()
        if not admin:
            return {"message": "Admin not found"}, 404
        
        db.session.delete(admin)
        db.session.commit()
        
        return make_response({"message": "Admin deleted successfully"}, 200)
                