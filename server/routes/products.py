from flask import jsonify, make_response, request
from flask_restful import Resource

from dbconfig import db
from models.product import Product


class Products(Resource):
    def get(self):
        try:
            products=[product.to_dict(rules=['-category','-admin', '-orders', '-cart_items']) for product in Product.query.all()]
            return make_response(products, 200)
        except Exception as e:
            return {"message": "Error retrieving products", "error": str(e)}, 500
    
    def post(self):
        try: 
            product_data = request.get_json()
            if not product_data:
                return {"message": "no input data provided"}, 400
            
            new_product= Product(
                name = product_data['name'],
                description = product_data['description'],
                image_url = product_data['image_url'],
                price = product_data['price'],
                is_in_stock = product_data['is_in_stock'],
                rating = product_data['rating']
            )
            db.session.add(new_product)
            db.session.commit()

            return make_response(new_product.to_dict(), 200)
        except KeyError as e:
            return {"message": f"Missing required field: {e.args[0]}", "error": str(e)}, 400
        except Exception as e:
            return {"message": "Error creating product", "error": str(e)}, 500
    
    
class ProductById(Resource):
    def get(self, id):
        product = Product.query.filter_by(id=id).first().to_dict(rules=['-category','-admin', '-orders', '-cart_items'])
        if not product:
            return {"message": "Product not found"}, 404
        
        return make_response(product, 200)
        
    def patch(self, id):
        #parse incoming json data
        data= request.get_json()
        
        #retrieve product from database
        product= Product.query.filter(Product.id==id).first()
        if not product:
            return{"message": "product not found"}, 404
        
        #update product fields
        if 'name' in data:
            product.name = data['name']
        
        if 'price' in data:
            product.price = data['price']
            
        if 'description' in data:
            product.description = data['description']   
            
        if 'image_url' in data:
            product.image_url = data['image_url']         
            
        try:
            db.session.add(product)
            db.session.commit()
            return {"message": "product updated successfully"}, 200 
        
        except Exception as e:
            return{"message": "Error updating product", "error": str(e)}, 500
        
    def delete(self, id):
        product=Product.query.filter(Product.id == id).first()
        
        if not product:
            return {"message": "product not found"}, 404
        
        db.session.delete(product)
        db.session.commit()
        
        
        return make_response({"message": "product deleted successfully"}, 200)   
    