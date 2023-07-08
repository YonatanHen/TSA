# TSA
Tutor-Student App (TSA), graduation project of the B.Sc in SW Engineering degree.

### [E2E video](https://youtu.be/90cHtHl8_iM)

### Description
The project suggests a platform as a mobile app that matches tutors and students from the same academic institute. The project leans on social media concepts which allow users from the same academic institute to interact with each other, and schedule and manage lessons on various platforms. Application developed in Client-Server architecture.

## Installation Steps:

### Developers:
please make sure that you have defined the following environment variables:

##### Client folder:
- FIREBASE_API_KEY - Click [here](https://firebase.google.com/docs/projects/api-keys) for more infomration.
- GEOPIFY_API - [Geopify](https://www.geoapify.com/) API key
- Server_URL - server URL or IP that could be self-hosted, or https://tsa-server.onrender.com
- DEVELOPMENT_TEAM_EMAIL - The email address used by the development team email (usage example can be seen in the E2E video attached).
- DATABASE_URL - The Firebase [real-time database](https://firebase.google.com/docs/database?hl=en) URL.

##### Server folder:  
- CLOUDINARY_NAME - Unique identifier for the [Cloudinary](https://cloudinary.com/documentation) environment.
- CLOUDINARY_API_KEY - [Cloudinary](https://cloudinary.com/documentation) API key.
- CLOUDINARY_API_SECRET - [Cloudinary](https://cloudinary.com/documentation) API secret key.
- MAIL_USER - The email address used by the development team email.
- MAIL_PASSWORD - The email password used by the development team email.
- DATABASE_URL - The Firebase [real-time database](https://firebase.google.com/docs/database?hl=en) URL.

### TSA users:
Feel free to download the code from the 'main' branch and build the app for Android/iOS with [expo build tool](https://docs.expo.dev/classic/building-standalone-apps/)

## Tech Stack
- Expo
- Node.js
- NPM
- React Native
- Redux
- REST API
- Firebase
- Cloudinary API
- Node mailer
- Firebase Cloud Messaging

## Screenshots:

#### Log-in/Sign-up:
![WhatsApp Image 2022-01-25 at 13 52 23 (3)](https://user-images.githubusercontent.com/57364867/158021702-9848fde1-8f45-4e47-be96-78a6a02ec6ea.jpeg) ![WhatsApp Image 2022-01-25 at 13 52 23 (2)](https://user-images.githubusercontent.com/57364867/158021707-a1501eff-3107-4989-b8b6-2c7de8edbfb4.jpeg)

#### Edit user page:
![WhatsApp Image 2022-01-29 at 13 11 48](https://user-images.githubusercontent.com/57364867/158021773-7991b73f-6a1a-4b6f-b586-16b9e139078c.jpeg)

#### Student Homepage Screen:

![WhatsApp Image 2022-01-29 at 16 05 56](https://user-images.githubusercontent.com/57364867/158022239-2f672787-4d8e-4d47-80e2-7d8de47cd7de.jpeg)

#### Read Only User Profile:

![WhatsApp Image 2022-01-29 at 16 05 56 (1)](https://user-images.githubusercontent.com/57364867/158022283-5da1a4eb-bb85-4284-9336-b333f5872535.jpeg)

There are a lot more screens and options of course :)
