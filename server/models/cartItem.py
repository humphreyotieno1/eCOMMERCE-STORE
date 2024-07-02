from sqlalchemy.orm import relationship
from .dbconfig import db
from datetime import datetime
from .service import Service
from .order import Order
from .user import User

class CartItem(db.Model):
    __tablename__ = 'cart_items'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    service_id = db.Column(db.Integer, db.ForeignKey('services.id'), nullable=False)
    order_id = db.Column(db.Integer, db.ForeignKey('orders.id'), nullable=False)
    quantity = db.Column(db.Integer, nullable=False, default=1)
    order_id = db.Column(db.Integer, db.ForeignKey('orders.id'), nullable=True)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.now)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now, onupdate=datetime.now)

    # Relationships
    user = relationship('User', backref='cart_items')
    service = relationship('Service', backref='cart_items')
    order = relationship('Order', backref='cart_items')

    def __repr__(self):
        return f"CartItem(id={self.id}, user_id={self.user_id}, service_id={self.service_id}, quantity={self.quantity})"