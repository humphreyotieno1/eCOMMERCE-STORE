from flask import jsonify, make_response, request
from flask_restful import Resource

from dbconfig import db
from models.cart_item import CartItem

class CartItems(Resource):
    def get(self):
        try:
            cartitems=[cartitem.to_dict(rules=['-user','-services', '-orders', '-products']) for cartitem in CartItem.query.all()]
            return make_response(jsonify(cartitems),200)
        except Exception as e:
            return {"message": "Error retrieving cartitems", "error": str(e)}, 500
    
    def post(self):
        try: 
            cartitem_data = request.get_json()
            new_cartitem= CartItem(
                quantity = cartitem_data['quantity'],
            )
            db.session.add(new_cartitem)
            db.session.commit()

            return make_response(new_cartitem.to_dict(), 200)
        except KeyError as e:
            return {"message": f"Missing required field: {e.args[0]}", "error": str(e)}, 400
        except Exception as e:
            return {"message": "Error creating cartitem", "error": str(e)}, 500
    
    
class CartItemById(Resource):
    def get(self, id):
        cartitem = CartItem.query.filter_by(id=id).first().to_dict()
        if not cartitem:
            return {"message": "cartitem not found"}, 404
        
        return make_response(cartitem, 200)
        
    
    def delete(self, id):
        cartitem=CartItem.query.filter(CartItem.id == id).first()
        
        if not cartitem:
            return {"message": "cartitem not found"}, 404
        
        db.session.delete(cartitem)
        db.session.commit()
        
        return make_response({"message": "cartitem deleted successfully"}, 200)   
    
    