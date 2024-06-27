from flask import jsonify, make_response, request
from flask_restful import Resource

from dbconfig import db
from models.service import Service

class Services(Resource):
    def get(self):
        try:
            services=[service.to_dict(rules=['-user', '-orders', '-cart_items']) for service in Service.query.all()]
            return make_response(jsonify(services),200)
        except Exception as e:
            return {"message": "Error retrieving services", "error": str(e)}, 500
    
    def post(self):
        try: 
            service_data = request.get_json()
            new_service= Service(
                name = service_data['name'],
                description = service_data['description'],
                price = service_data['price']
            )
            db.session.add(new_service)
            db.session.commit()

            return make_response(new_service.to_dict(), 200)
        except KeyError as e:
            return {"message": f"Missing required field: {e.args[0]}", "error": str(e)}, 400
        except Exception as e:
            return {"message": "Error creating order", "error": str(e)}, 500
    
    
class ServiceById(Resource):
    def get(self, id):
        service = Service.query.filter_by(id=id).first().to_dict()
        if not service:
            return {"message": "service not found"}, 404
        
        return make_response(service, 200)
        
    
    def delete(self, id):
        service=Service.query.filter(Service.id == id).first()
        
        if not service:
            return {"message": "service not found"}, 404
        
        db.session.delete(service)
        db.session.commit()
        
        message = {"message": "service deleted successfully"}
        
        return make_response(message, 200)   
    
    