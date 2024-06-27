from sqlalchemy_serializer import SerializerMixin
from dbconfig import db


class CartItem(db.Model, SerializerMixin):
    __tablename__ = 'cart_items'

    id = db.Column(db.Integer, primary_key=True)
    quantity = db.Column(db.Integer, nullable=False, default=1)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    
    
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    service_id = db.Column(db.Integer, db.ForeignKey('services.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'), nullable=False)
    order_id = db.Column(db.Integer, db.ForeignKey('orders.id'), nullable=True)
    
    # Relationships
    user = db.relationship('User', back_populates='cart_items')
    services = db.relationship('Service', back_populates='cart_items')
    orders = db.relationship('Order', back_populates='cart_items')
    products = db.relationship('Product', back_populates='cart_items')

    def __repr__(self):
        return f"CartItem(id={self.id}, user_id={self.user_id}, service_id={self.service_id}, quantity={self.quantity})"