
# Animal Crossing Shop

Welcome to the Animal Crossing Drip Shop! This is an e-commerce website where you can buy various Animal Crossing-themed merchandise, including apparel, and accessories. This app is built using Node.js and the Express framework with a mysql database.

## Run Locally

If you do not have a remote MySQL server that can import the database, I recommend installing [XAMPP](https://www.apachefriends.org/) and running APACHE and MySQL to run phpmyadmin locally. You will have to initialize the empty database, a user for the database.

Clone the project (If using XAMPP, be sure to clone this in the htdocs folder within the xampp directory)

```bash
  git clone https://github.com/iperalta7/animalcrossing-dripshop.git
```

Go to the project directory

```bash
  cd animalcrossing-dripshop
```

Install dependencies

```bash
  npm install
```
### Environment Variables

To run comepletely this project, you will need to add the values to the following environment variables to your empty Process.env file. (do not put the values in strings)

`DB_HOST=`

`DB_USER=`

`DB_PASSWORD=`

`DB_DATABASE=`


Start the server

```bash
  npm run start
```


## Tech Stack

**Client:** HTML, Handlebars.js, Bootstrap 4

**Server:** Node, Express

**Databse:** MySQL

## Features

The Animal Crossing Drip Shop includes the following features:

- User authentication and authorization
- Shopping cart functionality
- Order processing
- Product search and filtering

## License

[MIT](https://choosealicense.com/licenses/mit/#)

## Credits

This app was created by [Isaiah Peralta](iperalta@uri.edu), [Daniel Diaz](danieldiazp@uri.edu), [Cameron Castillo](ccastillo0318@uri.edu). If you have any questions or feedback, please contact us at [TBD](). 

