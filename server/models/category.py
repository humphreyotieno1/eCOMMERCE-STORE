from dbconfig import db
from sqlalchemy_serializer import SerializerMixin


class Order(db.Model, SerializerMixin):
    __tablename__ = 'orders'

    id = db.Column(db.Integer, primary_key=True)
    total_amount = db.Column(db.Numeric(10, 2), nullable=False)
    status = db.Column(db.String(50), nullable=False, default='pending')
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'), nullable=False)
    service_id = db.Column(db.Integer, db.ForeignKey('services.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    # Relationships
    user = db.relationship('User', back_populates='orders')
    products = db.relationship('Product', back_populates='orders')
    services = db.relationship('Service', back_populates='orders')
    cart_items = db.relationship('CartItem', back_populates='orders')