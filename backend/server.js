import express from "express";
import dotenv from "dotenv";
import Connection from "./database/db.js";
import router from "./routes/route.js";
import cors from "cors";
import bodyParser from "body-parser";
import axios from 'axios';
import cookieParser from "cookie-parser";

// Initialize Express app
const app = express();

dotenv.config();

// Port configuration
const PORT = 8000;

// Middleware setup
// app.options('*', cors()); // Enable pre-flight for all routes
// app.use(cors({ origin : 'https://finvest-2.vercel.app', credentials: true })); //In production localhost has to be changed to the frontend url
// app.use(cors({ origin : 'http://localhost:5173', credentials: true })); //In production localhost has to be changed to the frontend url
app.use(cors())
app.use(cookieParser())
app.use(bodyParser.json({ extended: true }));
app.use('/', router);

// Database connection
Connection();

// Ping service URL
const SERVICE_URL = 'https://finvest-backend.onrender.com';

// Function to ping the service
const pingService = () => {
    axios.get(SERVICE_URL)
        .then(response => console.log('Service pinged successfully:', response.status))
        .catch(response => console.log('Service pinged successfully'));
};

// // Function to set a random interval between min and max
// const setRandomInterval = (func, min, max) => {
//     const randomDelay = Math.floor(Math.random() * (max - min + 1) + min);
//     setTimeout(() => {
//         func();
//         setRandomInterval(func, min, max); // Recursively set the next random interval
//     }, randomDelay);
// };

// // Start pinging the service at random intervals between 1 and 5 minutes
// setRandomInterval(pingService, 1 * 60 * 1000, 5 * 60 * 1000);

// Constants for the ping intervals and restricted time period
const MIN_INTERVAL = 3 * 60 * 1000; // 3 minutes in milliseconds
const MAX_INTERVAL = 5 * 60 * 1000; // 5 minutes in milliseconds
const RESTRICTED_START_HOUR = 1;
const RESTRICTED_START_MINUTE = 30;
const RESTRICTED_END_HOUR = 8;
const RESTRICTED_END_MINUTE = 0;

// Function to check if the current time is within the restricted period
const isWithinRestrictedPeriod = () => {
    const now = new Date();
    const istOffset = 5.5 * 60 * 60 * 1000; // IST offset from UTC in milliseconds
    const istNow = new Date(now.getTime() + istOffset);

    const start = new Date(istNow);
    start.setHours(RESTRICTED_START_HOUR, RESTRICTED_START_MINUTE, 0, 0);

    const end = new Date(istNow);
    end.setHours(RESTRICTED_END_HOUR, RESTRICTED_END_MINUTE, 0, 0);

    return istNow >= start && istNow <= end;
};

// Function to set a random interval between min and max, considering the restricted period
const setRandomInterval = (func, min, max) => {
    if (isWithinRestrictedPeriod()) {
        // Skip execution during the restricted period and wait until the end of the period
        const now = new Date();
        const istOffset = 5.5 * 60 * 60 * 1000; // IST offset from UTC in milliseconds
        const istNow = new Date(now.getTime() + istOffset);

        const nextAllowedTime = new Date(istNow);
        nextAllowedTime.setHours(RESTRICTED_END_HOUR, RESTRICTED_END_MINUTE, 0, 0);

        const delay = nextAllowedTime - istNow;

        setTimeout(() => {
            setRandomInterval(func, min, max); // Recalculate the interval after the restricted period
        }, delay);
    } else {
        // Execute at a random interval between the given range
        const delay = Math.floor(Math.random() * (max - min + 1)) + min;

        setTimeout(() => {
            func();
            setRandomInterval(func, min, max); // Recursively set the next random interval
        }, delay);
    }
};

// Start pinging the service at random intervals between 3 and 8 minutes, with a restricted period from 1:30 AM to 8:00 AM IST
setRandomInterval(pingService, MIN_INTERVAL, MAX_INTERVAL);


// Start the server
app.listen(PORT, () => console.log(`Server is running at PORT ${PORT}`));
