# Animal Crossing Drip Shop

Welcome to the Animal Crossing Drip Shop! This is an e-commerce website where you can buy various Animal Crossing-themed merchandise, including apparel, and accessories. This app is built using Node.js and the Express framework with a mysql database.

## Installation

To install and test this app, you will need to have Apache installed on your system. You can install Apache using the following command:
(For Windows: You can just install XAMPP and run apache: https://www.apachefriends.org/)

```
sudo apt-get install apache2
```

Once Apache is installed (either throguh sudo or XAMPP), you can clone this repository into the `htdocs` directory (this will be under a XAMPP dir in windows):

```
cd /var/www/html
git clone https://github.com/your-username/animal-crossing-drip-shop.git
```

After cloning the repository, you can install the required dependencies by running the following command in the root directory of the project:

```
npm install
```

## Usage

To start the server, run the following command in the root directory of the project:

```
npm start
```

This will start the server on port 8081. You can access the website by navigating to `http://localhost:8081` in your web browser.

## Features

The Animal Crossing Drip Shop includes the following features:

- User authentication and authorization
- Shopping cart functionality
- Order processing
- Product search and filtering

## Contributing

If you would like to contribute to this project, please fork the repository and submit a pull request. We welcome contributions of all kinds, including bug fixes, new features, and documentation improvements.

## Credits

This app was created by [Isaiah Peralta], [Daniel Diaz], [Cameron Castillo]. If you have any questions or feedback, please contact us at [tbd]. 

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
