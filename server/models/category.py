from sqlalchemy_serializer import SerializerMixin
from dbconfig import db


class Category(db.Model, SerializerMixin):
    __tablename__ = 'categories'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False, unique=True)
    description = db.Column(db.String(500), nullable=True)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    
    # Relationships
    products = db.relationship('Product', back_populates='category', lazy='dynamic')

    def __repr__(self):
        return f"Category(id={self.id}, name='{self.name}', description='{self.description}')"