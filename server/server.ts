// MODULE IMPORTS
require("dotenv").config();

import { app } from "./app";
import connectDB from "./utils/db";

// CREATE SERVER
app.listen(process.env.PORT || 8000, () => {
    console.log(`Server is connected with port ${process.env.PORT || 8000}`);
    connectDB();
});
