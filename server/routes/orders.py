from flask import jsonify, make_response, request
from flask_restful import Resource

from dbconfig import db
from models.order import Order

class Orders(Resource):
    def get(self):
        try:
            orders=[order.to_dict(rules=['-user', '-products', '-services', '-cart_items']) for order in Order.query.all()]
            return make_response(jsonify(orders),200)
        except Exception as e:
            return {"message": "Error retrieving orders", "error": str(e)}, 500
    
    def post(self):
        try: 
            order_data = request.get_json()
            new_order= Order(
                total_amount = order_data['total_amount'],
                status = order_data['status'],
            )
            db.session.add(new_order)
            db.session.commit()

            return make_response(new_order.to_dict(), 200)
        except KeyError as e:
            return {"message": f"Missing required field: {e.args[0]}", "error": str(e)}, 400
        except Exception as e:
            return {"message": "Error creating order", "error": str(e)}, 500
    
    
class OrderById(Resource):
    def get(self, id):
        order = Order.query.filter_by(id=id).first().to_dict()
        if not order:
            return {"message": "order not found"}, 404
        
        return make_response(order, 200)
        
    
    def delete(self, id):
        order=Order.query.filter(Order.id == id).first()
        
        if not order:
            return {"message": "order not found"}, 404
        
        db.session.delete(order)
        db.session.commit()
        
        return make_response({"message": "order deleted successfully"}, 200)   
