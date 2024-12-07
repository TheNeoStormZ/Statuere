 # Statuere: A ToDo App

Statuere is a ToDo application that allows you to add tasks with a name and description, mark them as completed (which visually differentiates them from the rest), and delete them. This tutorial will guide you through the process of setting up and running Statuere in both production and development environments.

# Tutorial: Running Statuere

This tutorial will guide you through the process of setting up and running Statuere in both production and development environments.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- Node.js (version 22.9 or higher)
- npm (Node Package Manager, comes with Node.js)

## Production Build

Follow these steps to build and run Statuere in a production environment:

1. **Navigate to the Project Directory:**
   Open your terminal and navigate to the root directory of the web app.

2. **Install Dependencies:**
Run the following command to install all the necessary dependencies listed in the package.json file.

```
npm install
```

3. **Start the Application:**
Finally, start the application using the following command.

```
npm run start
```
Statuere should now be running in production mode. You can access it by navigating to ``localhost:3000`` in your browser.


## Development Build
Follow these steps to run Statuere in a development environment:

1. **Navigate to the Project Directory:**
   Open your terminal and navigate to the root directory of the web app.

2. **Install Dependencies:**
Run the following command to install all the necessary dependencies listed in the package.json file.

```
npm install
```
3. **Install Dependencies:**

Execute the following command to start the development server. This will also watch for changes in the code and automatically reload the application.

```
npm run dev
```


Statuere should now be running in development mode. You can access it by navigating to the specified URL in your browser.