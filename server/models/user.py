from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from datetime import datetime

from dbconfig import db


class User(db.Model, SerializerMixin):
    __tablename__ = "users"
    
    id = db.Column(db.Integer,  primary_key=True)
    user_name = db.Column(db.String(100), unique=True, nullable=False )
    email = db.Column(db.String(255), unique=True, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    #relationships
    orders = db.relationship('Order', back_populates='user', cascade='all, delete-orphan')
    cart_items = db.relationship('CartItem', back_populates='user', cascade='all, delete-orphan')
    services = db.relationship('Service', back_populates='user', cascade='all, delete-orphan')

    
    #serialization
    
    def __repr__(self):
        return f"<username: {self.user_name}>"
    
    @validates("email")
    def validate_email(self, key, email):
        if "@" not in email:
            raise ValueError("emailmust contain @")
        return email
    