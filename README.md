# Tix Event MVP Application

Using AdonisJS (a NodeJS MVC framework),I buillt a basic MVP of an events
application, using only traditional CRUD methods.


##  Features

- Authentication support for users to **Signin** and **Signup**

- Dashboard for Event Analytics (active, upcoming and past events)

- CRUD for Events

	- Create a new Event

	- View a Single Event

	- Edit and Update an Existing Event

	- Delete an Existing Event

- Authentication Guard Implementation

- Dashing UI


# AdonisJS

![](https://avatars.githubusercontent.com/u/13810373?s=100&v=4)

AdonisJS is a Node.js framework and hence it requires Node.js to be installed on your computer. To be precise, we require Node.js >= 14.15.4, along with npm >= 6.0.0.You can check the Node.js and npm versions by running the following commands.

		node -v
		OR
		npm -v

## Setup Locally

- Clone the Application

		git clone https://github.com/TonyCookey/tix-event-app.git
- cd into the application

		 cd tix-event-app
- Install Dependencies

		npm install
- Create a Database

- Create an ***env*** file. Copy the values from **.env.example** and paste into **.env**

- Run Migrations

		node ace migration:run
- Start Development Server

		node ace serve --watch

