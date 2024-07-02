from flask import make_response, jsonify, request
from flask_restful import Resource

from dbconfig import db
from models.category import Category


class Categories(Resource):
    def get(self):
        try:
            categories= [category.to_dict(rules=['-products']) for category in Category.query.all()]
            
            return make_response(jsonify(categories), 200)
        
        except Exception as e:
            return {"message": "Error retrieving categories", "error": str(e)}, 500
        
    def post(self):
        try: 
            category_data = request.get_json()
            if not category_data:
                return {"message": "no input data provided"}, 400
            
            new_category= Category(
                name = category_data['name'],
                description = category_data['description'],
            )
            db.session.add(new_category)
            db.session.commit()

            return make_response(new_category.to_dict(), 200)
        except KeyError as e:
            return {"message": f"Missing required field: {e.args[0]}", "error": str(e)}, 400
        except Exception as e:
            return {"message": "Error creating category", "error": str(e)}, 500
        
        
        
class CategoryById(Resource):
    def get(self, id):
        category = Category.query.filter_by(id=id).first().to_dict(rules='-products')
        if not category:
            return {"message": "Category not found"}, 404
        
        return make_response(category, 200)
    
    def patch(self, id):
        data= request.get_json()
        
        category= Category.query.filter(Category.id==id).first()
        if not category:
            return{"message": "category not found"}, 404
        
        #update fields
        if 'name' in data:
            category.name = data['name']
            
        if 'description' in data:
            category.description = data['description']   
            
        try:
            db.session.add(category)
            db.session.commit()
            return {"message": "category updated successfully"}, 200 
        
        except Exception as e:
            return{"message": "Error updating category", "error": str(e)}, 500
        
    def delete(self, id):
        category=Category.query.filter(Category.id == id).first()
        
        if not category:
            return {"message": "category not found"}, 404
        
        db.session.delete(category)
        db.session.commit()
        
        
        return make_response({"message": "category deleted successfully"}, 200)   
