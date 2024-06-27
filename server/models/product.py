from dbconfig import db
from sqlalchemy_serializer import SerializerMixin


class Product(db.Model, SerializerMixin):
    __tablename__ = 'products'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(500), nullable=True)
    image_url = db.Column(db.String, nullable=False)
    price = db.Column(db.Float, nullable=False)
    is_in_stock = db.Column(db.Boolean, nullable=False)
    rating = db.Column(db.Float, nullable=True)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'))
    admin_id = db.Column(db.Integer, db.ForeignKey('admins.id'))
    
    # Relationships
    category = db.relationship('Category', back_populates='products')
    admin = db.relationship('Admin', back_populates='products')
    cart_items = db.relationship('CartItem', back_populates='products', cascade='all, delete-orphan')
    orders = db.relationship('Order', back_populates='products', cascade='all, delete-orphan')
    
    def __repr__(self):
        return f"Product(id={self.id}, name='{self.name}', price={self.price}, Is_in_stock={self.is_in_stock}, rating={self.rating})"
