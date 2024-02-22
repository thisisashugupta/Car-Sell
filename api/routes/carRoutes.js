import express from 'express';
import { MongoClient } from 'mongodb';

const router = express.Router();

// MongoDB connection URL
const url = 'mongodb+srv://cars:K1rJ8piRkt6UVLqh@cluster0.57lvsy8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Database name
const dbName = 'user';

// Route to fetch all cars
router.get('/all', async (req, res) => {
  try {
    // Connect to MongoDB
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);

    // Get the cars collection
    const carsCollection = db.collection('cars');

    // Fetch all cars
    const cars = await carsCollection.find().toArray();

    console.log('all cars', cars);

    // Close the MongoDB connection
    client.close();

    // Send the cars as the response
    res.json(cars);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


// Route to fetch all cars in a certain dealership
router.get('/dealership/:name', async (req, res) => {
  try {
    // Connect to MongoDB
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);

    // Get the cars collection
    const carsCollection = db.collection('cars');

    // Fetch all cars in the specified dealership
    const cars = await carsCollection.find({ dealership: req.params.name }).toArray();

    console.log('cars in dealership', cars);

    // Close the MongoDB connection
    client.close();

    // Send the cars as the response
    res.json(cars);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


// Route to add a new vehicle
router.post('/add', async (req, res) => {
  try {
    // Connect to MongoDB
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);

    // Get the cars collection
    const carsCollection = db.collection('cars');

    // Extract the vehicle details from the request body
    const { make, model, year, dealership } = req.body;

    // Create a new vehicle object
    const newVehicle = {
      make,
      model,
      year,
      dealership,
    };

    // Insert the new vehicle into the collection
    const result = await carsCollection.insertOne(newVehicle);

    console.log('new vehicle added', result);

    // Close the MongoDB connection
    client.close();

    // Send a success response
    res.status(201).json({ message: 'Vehicle added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});



export default router;
