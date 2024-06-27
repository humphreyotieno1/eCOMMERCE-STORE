from dbconfig import db
from sqlalchemy_serializer import SerializerMixin

class Product(db.Model, SerializerMixin):
    __tablename__ = 'products'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(500), nullable=True)
    imageUrl = db.Column(db.String(255), nullable=False)
    imageAlt = db.Column(db.String(100), nullable=False)
    category = db.Column(db.String(100), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Float, nullable=False)
    formattedPrice = db.Column(db.String(50), nullable=False)
    rating = db.Column(db.Float, nullable=False)
    numReviews = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'imageUrl': self.imageUrl,
            'imageAlt': self.imageAlt,
            'category': self.category,
            'quantity': self.quantity,
            'price': self.price,
            'formattedPrice': self.formattedPrice,
            'rating': self.rating,
            'numReviews': self.numReviews,
        }
