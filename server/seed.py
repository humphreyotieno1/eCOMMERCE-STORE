from app import db
from models.product import Product

db.create_all()

products = [
    Product(
        name='Bamburi Fundi Cement',
        description='Bamburi Fundi Cement is a hydraulic cement designed for use in mortars for masonry construction. Plastering, rendering, stucco, brick laying, screeding and others.',
        image_url='https://res.cloudinary.com/drdradtyj/image/upload/v1718628397/GEOCEL/Bamburi_Fundi.jpg',
        image_alt='Bamburi Fundi Cement',
        category='Construction',
        quantity=10,
        price=760.0,
        formatted_price='kshs 760.00',
        rating=4,
        num_reviews=10
    ),
    # Add more products here
]

db.session.bulk_save_objects(products)
db.session.commit()
print("Database seeded!")
