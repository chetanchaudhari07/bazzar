# Bulk Vegetable/Fruit Order Web Application

This web application facilitates bulk vegetable and fruit orders. Buyers can browse available products, place bulk orders, and track the status of their orders. Admins can efficiently manage orders and inventory.

## Table of Contents
- [Features](#features)
  - [For Buyers](#for-buyers)
  - [For Admin](#for-admin)
- [Database](#database)
- [Frontend](#frontend)
- [Backend](#backend)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

### For Buyers

1. **Browse Vegetables/Fruits**:
   - Buyers can view a catalogue of available vegetables and fruits with basic details such as the name and price per unit.
   
2. **Place Orders**:
   - Buyers can request bulk orders by specifying the vegetable/fruit, quantity, and delivery details (name, contact information, and delivery address).
   - Each order is saved with a unique identifier in the database.

3. **Order Tracking**:
   - Buyers can check the status of their placed orders. The order status can be:
     - **Pending**: Order has been received.
     - **In Progress**: Order is being processed for delivery.
     - **Delivered**: Order has been delivered successfully.

### For Admin

1. **Order Management**:
   - Admins can view all placed orders along with buyer details, delivery address, and the list of requested items.
   - Admins can update the order status (Pending → In Progress → Delivered).

2. **Inventory Management**:
   - Admins can add, edit, or remove vegetables/fruits from the product catalogue.
   - Note: No stock tracking is required. All items are considered available.

## Database

- The application uses PostgreSQL as the database.
- It is hosted on **Neon.tech**, or you can use **Docker** to run the PostgreSQL database locally.

## Frontend

- The frontend is built with **Next.js** (or **React.js**) to provide a clean, responsive, and user-friendly interface.
- Basic pages implemented include:
  - **Product Catalogue**: Displays a list of available vegetables/fruits.
  - **Order Placement Form**: Allows buyers to place bulk orders.
  - **Order Tracking View**: Allows buyers to check the status of their orders.
  - **Admin Dashboard**: Provides a view for admins to manage orders and inventory.

## Backend

- The backend is implemented using **Next.js API Routes** (or **Express.js / Flask**).
- API Endpoints:
  - **GET /api/products**: Fetch the product catalogue.
  - **POST /api/orders**: Place a new order.
  - **GET /api/orders/{orderId}**: View the status of an order.
  - **PUT /api/orders/{orderId}**: Update the status of an order (admin-only).
  - **POST /api/products**: Add a new product to the catalogue (admin-only).
  - **PUT /api/products/{productId}**: Edit an existing product (admin-only).
  - **DELETE /api/products/{productId}**: Remove a product from the catalogue (admin-only).

## Installation

To set up the application locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/bulk-veg-fruit-order.git

