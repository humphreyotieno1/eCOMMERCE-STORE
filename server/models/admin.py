from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from datetime import datetime

from dbconfig import db


class Admin(db.Model, SerializerMixin):
    __tablename__ = "admins"
    
    id = db.Column(db.Integer,  primary_key=True)
    user_name = db.Column(db.String(100), unique=True, nullable=False )
    email = db.Column(db.String(255), unique=True, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    #relationships
    products = db.relationship('Product', back_populates='admin')
    
    
    #serialization
    
    def __repr__(self):
        return f"<Admin: {self.user_name}>"
    
    @validates("email")
    def validate_email(self, key, email):
        if "@" not in email:
            raise ValueError("emailmust contain @")
        return email
    