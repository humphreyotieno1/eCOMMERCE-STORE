from dbconfig import api,app

from routes.home import Home
from routes.admins import Admins, AdminById
from routes.users import Users,UserById
from routes.categories import Categories, CategoryById
from routes.cart_items import CartItems, CartItemById
from routes.services import Services, ServiceById
from routes.products import Products, ProductById
from routes.orders import Orders, OrderById
from routes.sign_up import SignUp
from routes.login import Login
from routes.mpesa import SimulateC2B, Callback



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
api.add_resource(SignUp, '/signup')
api.add_resource(Login, '/login')
api.add_resource(SimulateC2B, '/simulatec2b')
api.add_resource(Callback, '/callback')


if __name__ == "__main__":
    app.run(debug=True)