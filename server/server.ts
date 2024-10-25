// Load environment variables from the .env file, making them accessible throughout the application
import dotenv from "dotenv";
dotenv.config();

// Import the Express app instance and the database connection utility
import { app } from "./app";
import connectDB from "./utils/db";

// Retrieve the port number from environment variables or use a default port (8000) if not specified
const PORT = process.env.PORT || 8000;

// Start the server and listen for incoming requests on the specified port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);

    // Establish connection to the database when the server starts
    connectDB();
});
