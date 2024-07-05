# GEOCEL ENTERPRISES LIMITED

## About the Project

The Geocel Enterprises web application project aims to develop a comprehensive online platform that will help the company effectively market its goods and reach a wider range of customers. The website is designed to enable customers to interactively explore the various products and services offered, making informed purchasing decisions and comparing costs.

## Key Features

### Navigation Bar
The navigation bar will contain the following links:
- Home: Serves as the main entry point to the website, providing an overview of the company and its offerings.
- Products: Allows users to browse and explore the company's product catalog.
- Services: Showcases the various services provided by Geocel Enterprises and their respective pricing.
- About Us: Offers detailed information about the company, its history, values, and mission.
- Contact Us: Enables users to get in touch with the company through various communication channels, such as telephone, email, and social media.
- Cart: Allows users to manage their shopping cart and proceed to checkout.
- Search: Enables users to search for specific products or services within the website.

### Home Page
The home page will include:
- Company name: Prominently displays the Geocel Enterprises brand.
- Welcome message: Greets visitors and introduces the company's offerings.
- Tagline: Concisely communicates the company's unique value proposition.
- "Shop Now" button: Directs users to the products page, encouraging immediate exploration of the product catalog.
- Video or image: Showcases the company's operations, products, or services in an engaging visual format.

### Products Page
The products page will display product cards with the following information:
- Product image: Visually represents the product to help users make informed decisions.
- Price: Clearly presents the cost of each product.
- Name: Identifies the product for easy reference.
- "Add to Cart" button: Allows users to add the product to their shopping cart.
- Quantity selector: Enables users to select the desired quantity of the product.

Pagination will be implemented to display a manageable number of products at a time, improving the overall user experience and website performance.

### Services Page
The services page will present the various services offered by Geocel Enterprises and their corresponding rates. This will include details such as:
- Service name: Descriptive title of the service.
- Service description: Provides an overview of the service and its benefits.
- Pricing: Clearly displays the cost of the service.
- Availability: Indicates whether the service is currently offered or subject to any restrictions.

### About Us Page
This page will provide a comprehensive overview of the company, including:
- Company history: Outlines the origins and evolution of Geocel Enterprises.
- Core values: Highlights the principles and beliefs that guide the company's operations.
- Leadership team: Introduces the key personnel responsible for the company's management and direction.
- Achievements and milestones: Showcases the company's notable accomplishments and growth over time.

### Contact Us Page
The contact us page will feature the company's contact information and a interactive map, such as:
- Telephone number: Primary point of contact for customers.
- Email address: Alternative communication channel for inquiries and support.
- Social media links: Connects customers to the company's online presence and engagement.
- Physical address: Displays the company's headquarters or primary location on an interactive map.

## Backend Models and Routes

## Models

### CartItem
- `_id`: Unique identifier for the cart item
- `product`: Reference to the `Product` model
- `quantity`: Number of items in the cart
- `user`: Reference to the `User` model
- `createdAt`: Timestamp of when the item was added to the cart
- `updatedAt`: Timestamp of when the item was last updated

### Category
- `_id`: Unique identifier for the category
- `name`: Name of the category
- `description`: Description of the category
- `createdAt`: Timestamp of when the category was created
- `updatedAt`: Timestamp of when the category was last updated

### Image
- `_id`: Unique identifier for the image
- `url`: URL of the image
- `product`: Reference to the `Product` model
- `createdAt`: Timestamp of when the image was uploaded
- `updatedAt`: Timestamp of when the image was last updated

### Order
- `_id`: Unique identifier for the order
- `user`: Reference to the `User` model
- `items`: Array of `CartItem` references
- `totalPrice`: Total price of the order
- `paymentMethod`: Payment method used for the order
- `status`: Status of the order (e.g., pending, shipped, delivered)
- `createdAt`: Timestamp of when the order was placed
- `updatedAt`: Timestamp of when the order status was last updated

### Product
- `_id`: Unique identifier for the product
- `name`: Name of the product
- `description`: Description of the product
- `price`: Price of the product
- `category`: Reference to the `Category` model
- `images`: Array of `Image` references
- `inventory`: Number of items in stock
- `createdAt`: Timestamp of when the product was added
- `updatedAt`: Timestamp of when the product was last updated

### Service
- `_id`: Unique identifier for the service
- `name`: Name of the service
- `description`: Description of the service
- `price`: Price of the service
- `availability`: Availability status of the service
- `createdAt`: Timestamp of when the service was added
- `updatedAt`: Timestamp of when the service was last updated

### User
- `_id`: Unique identifier for the user
- `name`: Full name of the user
- `email`: Email address of the user
- `password`: Hashed password of the user
- `role`: Role of the user (e.g., customer, admin)
- `createdAt`: Timestamp of when the user account was created
- `updatedAt`: Timestamp of when the user account was last updated

## Routes

### Products
- `GET /api/products`: Retrieve a list of all products
- `GET /api/products/:id`: Retrieve details of a specific product
- `POST /api/products`: Create a new product
- `PUT /api/products/:id`: Update an existing product
- `DELETE /api/products/:id`: Delete a product

### Categories
- `GET /api/categories`: Retrieve a list of all categories
- `GET /api/categories/:id`: Retrieve details of a specific category
- `POST /api/categories`: Create a new category
- `PUT /api/categories/:id`: Update an existing category
- `DELETE /api/categories/:id`: Delete a category

### Services
- `GET /api/services`: Retrieve a list of all services
- `GET /api/services/:id`: Retrieve details of a specific service
- `POST /api/services`: Create a new service
- `PUT /api/services/:id`: Update an existing service
- `DELETE /api/services/:id`: Delete a service

### Cart
- `GET /api/cart`: Retrieve the items in the user's cart
- `POST /api/cart`: Add an item to the user's cart
- `PUT /api/cart/:id`: Update the quantity of an item in the user's cart
- `DELETE /api/cart/:id`: Remove an item from the user's cart

### Orders
- `GET /api/orders`: Retrieve a list of all orders (for admin)
- `GET /api/orders/user`: Retrieve a list of the user's orders
- `GET /api/orders/:id`: Retrieve details of a specific order
- `POST /api/orders`: Create a new order
- `PUT /api/orders/:id`: Update the status of an order

### Users
- `GET /api/users`: Retrieve a list of all users (for admin)
- `GET /api/users/:id`: Retrieve details of a specific user
- `POST /api/users`: Create a new user
- `PUT /api/users/:id`: Update an existing user
- `DELETE /api/users/:id`: Delete a user

# RELATIONSHIPS
The provided code demonstrates a set of relationships between the various models in an e-commerce application. Here's a breakdown of the relationships:

1. `CartItem` model:
   - `user`: One-to-many relationship with the `User` model, where a user can have multiple cart items, and each cart item belongs to a single user.
   - `service`: One-to-many relationship with the `Service` model, where a service can be associated with multiple cart items, but each cart item is linked to a single service.
   - `order`: One-to-many relationship with the `Order` model, where a cart item can be associated with a single order, but an order can have multiple cart items.

2. `Category` model:
   - `products`: One-to-many relationship with the `Product` model, where a category can have multiple products, but each product belongs to a single category.

3. `Image` model:
   - `product`: One-to-many relationship with the `Product` model, where a product can have multiple images, but each image is associated with a single product.

4. `Order` model:
   - `user`: One-to-many relationship with the `User` model, where a user can have multiple orders, but each order belongs to a single user.
   - `services`: Many-to-many relationship with the `Service` model, where an order can be associated with multiple services, and a service can be associated with multiple orders.
   - `cart_items`: One-to-many relationship with the `CartItem` model, where an order can have multiple cart items, but each cart item belongs to a single order.

5. `OrderService` model:
   - `order`: Many-to-one relationship with the `Order` model, where an order service is associated with a single order.
   - `service`: Many-to-one relationship with the `Service` model, where an order service is associated with a single service.

6. `Product` model:
   - `images`: One-to-many relationship with the `Image` model, where a product can have multiple images, but each image is associated with a single product.
   - `cart_items`: One-to-many relationship with the `CartItem` model, where a product can be associated with multiple cart items, but each cart item is linked to a single product.

7. `Service` model:
   - `orders`: Many-to-many relationship with the `Order` model, where a service can be associated with multiple orders, and an order can be associated with multiple services.

8. `User` model:
   - `orders`: One-to-many relationship with the `Order` model, where a user can have multiple orders, but each order belongs to a single user.
   - `cart_items`: One-to-many relationship with the `CartItem` model, where a user can have multiple cart items, but each cart item belongs to a single user.

These relationships allow you to navigate and access related data across the different models, enabling you to perform various operations, such as fetching a user's orders, retrieving the products in a cart, or identifying the services associated with a specific order.
