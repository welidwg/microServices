# Microservices E-commerce Platform

This project is an e-commerce platform consisting of three microservices: User, Product, and Cart. The platform is designed to manage users, products, and shopping carts using gRPC, GraphQL, and RESTful APIs.

## Table of Contents

+ ### Overview
+ ### Technologies
+ ### Getting Started
+ ### Prerequisites
+ ### Installation
+ ### Usage
+ ### Contributing
+ ### License
+ ### Contact

## Overview
 The e-commerce platform is composed of the following microservices:
1. User Microservice: Manages user accounts, including CRUD (Create, Read, Update, Delete) operations for user profiles.
2. Product Microservice: Handles product management, including CRUD operations for product listings.
3. Cart Microservice: Manages shopping carts, allowing users to add products to their cart and retrieve cart items.

## Technologies
- gRPC: Used for efficient communication between microservices.
- GraphQL: Implemented for flexible and efficient querying of data.
- REST: RESTful APIs are used for exposing the services to external clients.


## Getting Started
+ Prerequisites :
   - Ensure you have the following software installed on your local machine:
   - Node.js (version 12 or higher)
   - npm (version 6 or higher)
 

## Installation

 1. Clone the repository:
     ```bash
    git clone https://github.com/yourusername/microservices-ecommerce-platform.git
      ```
 
 2. Navigate to the project directory.
 3. Install the required dependencies for each microservice:
     ```bash
     npm install
     ```
 4. Start each microservice:
     ```bash
    nodemon .\gateway.js
    ```
     ```bash
    nodemon .\cartMicroService.js
    ```
    ```bash
    nodemon  .\productMicroService.js
    ```
    ```bash
    nodemon .\userMicroService.js
    ```

 ## Usage

 - Interact with the User, Product, and Cart microservices using their respective gRPC, GraphQL, or RESTful API endpoints.
 - Use the provided API documentation to understand the available endpoints and their usage.


## Contributing

Contributions are welcome! Please read the contributing guidelines before getting started.

## License
This project is licensed under the [MIT](https://choosealicense.com/licenses/mit/) License.

## Contact

If you have any questions or suggestions, feel free to reach out to the project maintainer or open an issue on GitHub.


# Happy coding!
 