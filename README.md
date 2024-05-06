<h1 align ="center">Pet Palace</h1>

Our project, a comprehensive Pet Adoption Platform, is designed to seamlessly connect pets in need of homes with potential adopters and to facilitate community engagement and support for animal shelters. This web application leverages modern technologies and industry best practices to deliver a user-friendly, interactive, and responsive experience.

The goal of this initiative is to deliver a seamless and engaging experience for users interested in pet adoption or supporting animal shelters, with a focus on ease of use, security, and positive community impact.

## Table of Contents

- [User Story](#user-story)
- [Acceptance Criteria](#acceptance-criteria)
- [Technologies Used](#technologies-used)
- [Development Dependencies Used](#development-dependencies-used)
- [API's Used](#apis-used)
- [Installation Instruction](#installation-instruction)
- [Test Instruction](#test-instruction)
- [Screenshots](#screenshots)
- [Overview](#overview)
- [Contributors](#contributors)
- [Deployed Application](#deployed-application)
- [License](#license)

## User Story

```
As A pet lover looking to adopt a pet or support animal shelters,
I WANT to be able to access and interact with a comprehensive pet adoption website,
SO THAT I can search for pets based on specific criteria, manage my profile, list pets for adoption, save favourite pets, and donate to animal shelters efficiently.
```

## Acceptance Criteria

```
GIVEN a pet adoption website,
WHEN I access the homepage,
THEN I am presented with pet listings, a search and filter option, user authentication options, and an animal shelter section.

WHEN I use the search and filter option,
THEN I can search for pets based on breed, age and location.

WHEN I choose to register or log in,
THEN I am directed to a user registration or login page where I can create a new account or enter my credentials to access my dashboard.

GIVEN I am logged in,
WHEN I access my user dashboard,
THEN I can view and manage my profile, my pet adoption listings, my favourite pets, and my donations to animal shelters.

WHEN I view or manage pet adoption listings,
THEN I have the option to create, edit, or delete listings for pets I am offering for adoption.

WHEN I save pets as favourites,
THEN I can view these pets in a dedicated section of my dashboard later.

WHEN I visit the Donation Page,
THEN I am presented with a list of animal shelters, including descriptions, histories, and locations.

WHEN I choose to donate to an animal shelter,
THEN I am provided with a donation form that integrates Stripe for payment processing.

GIVEN I am viewing a specific pet’s adoption listing,
WHEN I access the details page,
THEN  I am presented with detailed information including photos, a description, the adoption fee, location, and contact information.

WHEN I want to contact the pet owner, adoption agency, or animal shelter,
THEN I can use a contact form provided on the pet’s details page

WHEN I visit an animal shelter’s profile page,
THEN I see an option to donate directly to that shelter via a dedicated donation button.

WHEN I fill out the contact form,
THEN I receive confirmation that my message has been sent, and I must fill in all required fields before submission.

WHEN I make a donation,
THEN I am required to enter valid payment information, and I receive confirmation of my donation upon successful transaction.
```

## Technologies Used

- JavaScript
- Node.js
- MongoDB
- Express
- Mongoose
- Vite
- CORS
- dotenv
- bcrypt
- graphQL
- jsonwebtoken
- stripe
- @apollo/server
- apollo-server-express
- update later

## Development Dependencies Used

## APIs Used

- [emailJs](https://www.emailjs.com/docs/rest-api/send/)
- [Stripe](https://dashboard.stripe.com/test/apikeys)

## Installation Instruction

- [Install nodeJs and npm](https://nodejs.org/en/download)
- [Install MongoDB](https://www.mongodb.com/docs/manual/installation/)

## Test Instruction

To use this project:

- Get a copy of this repo to your local machine.
- Install the `Node Module`

```
npm install
```

- Copy the contents of the .env.copy file to a new file named .env in both the client and server directories.

```
cp client/.env.copy client/.env
```

```
cp server/.env.copy server/.env
```

- Open these .env files and fill in your Stripe and EmailJS API keys where indicated.

<br>

- Type in the following to run the database:

```
npm run seed
```

- Type in the following to run the project:

```
npm run dev
```

## Screenshots

## Overview

## Contributors

- [Jodie Lee](https://github.com/jodielee062788)
- [Suyash Maharjan](https://github.com/simplesuyash)
- [Yukitoshi Imaizumi-Zhou](https://github.com/yukitoshi12345)

## Deployed Application

The project was uploaded to [GitHub](https://github.com/) at the following repository:
[https://github.com/yukitoshi12345/Pet-Palace/](https://github.com/yukitoshi12345/Pet-Palace)

You can access the deployed application here: []()

## License

This project is licensed under the [MIT License](https://github.com/Yukitoshi12345/Pet-Palace/blob/main/LICENSE).
