const mongoose = require('mongoose');

const DB_URL =
  process.env.DB_URL ||
  'mongodb+srv://fahim:620yDjlFkLSczWkP@cluster0.h6nk14b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const connectDatabase = () => {
  if (!DB_URL) {
    throw new Error(
      'MongoDB connection URL not found. Please set DB_URL environment variable.'
    );
  }

  mongoose
    .connect(DB_URL)
    .then((data) => {
      console.log(`mongodb connected with server: ${data.connection.host}`);
    })
    .catch((error) => {
      console.error('Error connecting to MongoDB:', error);
      // Exit process with failure
      process.exit(1);
    });
};

module.exports = connectDatabase;
