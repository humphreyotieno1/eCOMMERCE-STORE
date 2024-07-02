from flask import Flask
from flask_bcrypt import Bcrypt
from flask_migrate import Migrate
from flask_restful import Api
from flask_cors import CORS

#local imports
from dbconfig import db

from routes.home import Home
from routes.admins import Admins, AdminById
from routes.users import Users,UserById
from routes.categories import Categories, CategoryById
from routes.cartItems import CartItems, CartItemById
from routes.services import Services, ServiceById
from routes.products import Products, ProductById
from routes.orders import Orders, OrderById

app = Flask(__name__)


app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///app.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.json.compact = False


migrate = Migrate(app, db)
db.init_app(app)


api = Api(app)
bcrypt = Bcrypt(app)

CORS(app)

api.add_resource(Home, '/')
api.add_resource(Products, '/products')
api.add_resource(ProductById, '/products/<int:id>')
api.add_resource(Orders, '/orders')
api.add_resource(OrderById, '/orders/<int:id>')
api.add_resource(Services, '/services')
api.add_resource(ServiceById, '/services/<int:id>')
api.add_resource(Admins, '/admins')
api.add_resource(AdminById, '/admins/<int:id>')
api.add_resource(Users, '/users')
api.add_resource(UserById, '/users/<int:id>')
api.add_resource(Categories, '/categories')
api.add_resource(CategoryById, '/categories/<int:id>')
api.add_resource(CartItems, '/cartitems')
api.add_resource(CartItemById, '/cartitems/<int:id>')


if __name__ == "__main__":
    app.run(debug=True)
