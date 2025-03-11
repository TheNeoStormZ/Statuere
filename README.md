# Statuere: A ToDo App

Statuere is a ToDo application that allows you to add tasks with a name and description, mark them as completed (which visually differentiates them from the rest), and delete them. This tutorial will guide you through the process of setting up and running Statuere in both production and development environments.

**Important:** Statuere now requires a MongoDB database and environment variables to function correctly. Please ensure you have MongoDB set up and have configured the `.env` file before running the application.

# Tutorial: Running Statuere

This tutorial will guide you through the process of setting up and running Statuere in both production and development environments.

## Prerequisites

Before you begin, ensure you have the following installed and configured on your machine:

- **Node.js:** (version 22.9 or higher) - Download from [https://nodejs.org/](https://nodejs.org/)
- **npm:** (Node Package Manager, comes with Node.js) - Verify installation with `npm -v` in your terminal.
- **MongoDB:**  You need a running MongoDB server instance. You can:
    - **Install MongoDB locally:** Follow the installation instructions for your operating system from the official MongoDB documentation: [https://docs.mongodb.com/manual/installation/](https://docs.mongodb.com/manual/installation/)
    - **Use a cloud-based MongoDB service:** Services like MongoDB Atlas ([https://www.mongodb.com/atlas/database](https://www.mongodb.com/atlas/database)) offer free tiers to get started.

## Configuration: Environment Variables (`.env` file)

Statuere relies on environment variables for sensitive information and configuration. You need to create a `.env` file in the root directory of your project and populate it with the necessary variables.

1. **Create `.env` file:** In the root directory of your Statuere project, create a new file named `.env`.

2. **Populate `.env`:**  Copy and paste the following content into your `.env` file and **replace the `<>` placeholders** with your actual values:

   ```env
   BETTER_AUTH_SECRET = <Your Better Auth Secret>
   BETTER_AUTH_URL=http://localhost:3000

   MONGODB_CLUSTER_ADDRESS=<Your MongoDB Cluster Address>.mongodb.net
   MONGODB_DATABASE=<Your Database Name>
   MONGODB_OPTIONS=?retryWrites=true&w=majority&appName=<Your App Name (Optional)>
   MONGODB_PASSWORD=<Your MongoDB User Password>
   MONGODB_USERNAME=<Your MongoDB Username>

   PASSKEY_RPID=localhost
   ```

   **Explanation of Environment Variables:**

   * **`BETTER_AUTH_SECRET`**:  Secret key used for authentication in Better Auth.  **You must generate a strong, unique secret for this.**
   * **`BETTER_AUTH_URL`**:  The base URL for your application. In development, this is usually `http://localhost:3000`. Adjust if your development server runs on a different port.
   * **`MONGODB_CLUSTER_ADDRESS`**: The address of your MongoDB cluster. You can find this in your MongoDB Atlas dashboard or your local MongoDB server configuration.
   * **`MONGODB_DATABASE`**: The name of the MongoDB database you want to use for Statuere. This database will be created if it doesn't already exist when the application starts.
   * **`MONGODB_OPTIONS`**:  Connection options for MongoDB.  The provided options `?retryWrites=true&w=majority&appName=<Your App Name (Optional)>` are recommended for production and ensure reliable writes. You can customize these further if needed.  Replace `<Your App Name (Optional)>` with a name for your application to identify it in MongoDB logs or monitoring.
   * **`MONGODB_PASSWORD`**: The password for your MongoDB user.
   * **`MONGODB_USERNAME`**: The username for your MongoDB user. Ensure this user has read and write permissions to the database specified in `MONGODB_DATABASE`.
   * **`PASSKEY_RPID`**:  Relying Party ID for Passkey authentication.  For local development, `localhost` is typically used.  For production, this will be your domain name.

**Important:**

* **Security:**  Never commit your `.env` file to version control (like Git). It contains sensitive information. Ensure `.env` is added to your `.gitignore` file.
* **Placeholders:**  Remember to replace all `<>` placeholders with your actual values. The application will not function correctly without proper configuration.
* **MongoDB Connection:** Make sure your MongoDB server is running and accessible from where you are running the Statuere application.

## Production Build

Follow these steps to build and run Statuere in a production environment:

1. **Navigate to the Project Directory:**
   Open your terminal and navigate to the root directory of the web app.

2. **Configure Environment Variables:**
   Ensure you have created and correctly configured the `.env` file as described in the "Configuration: Environment Variables" section above. **This step is crucial for the application to connect to MongoDB and function correctly.**

3. **Install Dependencies:**
   Run the following command to install all the necessary dependencies listed in the `package.json` file.

   ```bash
   npm install
   ```

4. **Build the Application:**
   Build the application for production using:

   ```bash
   npm run build
   ```
   This command typically creates an optimized production build in a `dist` or `build` folder (depending on your project configuration).

5. **Start the Application:**
   Finally, start the production server using the following command:

   ```bash
   npm run start
   ```

   Statuere should now be running in production mode. You can access it by navigating to `http://localhost:3000` in your browser (or the `BETTER_AUTH_URL` you configured in your `.env` file if different).

## Development Build

Follow these steps to run Statuere in a development environment:

1. **Navigate to the Project Directory:**
   Open your terminal and navigate to the root directory of the web app.

2. **Configure Environment Variables:**
   Ensure you have created and correctly configured the `.env` file as described in the "Configuration: Environment Variables" section above. **This step is crucial for the application to connect to MongoDB and function correctly.**

3. **Install Dependencies:**
   Run the following command to install all the necessary dependencies listed in the `package.json` file.

   ```bash
   npm install
   ```

4. **Start the Development Server:**
   Execute the following command to start the development server. This will typically watch for changes in your code and automatically reload the application, providing a faster development experience.

   ```bash
   npm run dev
   ```

   Statuere should now be running in development mode. You can access it by navigating to the URL specified in your terminal output (usually `http://localhost:3000` or the `BETTER_AUTH_URL` if configured differently). The development server often provides hot-reloading and other development-friendly features.