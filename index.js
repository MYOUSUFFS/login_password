const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://0.0.0.0:27017/mydata', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log('Error connecting to MongoDB', err);
},
);

// Define schema and model for the data
const dataSchema = new mongoose.Schema({
    data: String,
});
const Data = mongoose.model('data', dataSchema);

// Parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Add data to MongoDB
app.post('/addData', async (req, res) => {
    const { data } = req.body;
    const newData = new Data({ data });
    try {
        await newData.save();
        res.send('Data added to MongoDB');
    } catch (err) {
        console.log('Error adding data to MongoDB', err);
        res.status(500).send('Error adding data to MongoDB');
    }
});

const myDataSchema = new mongoose.Schema({
    text: String,
    date: { type: Date, default: Date.now }
  });

  const MyData = mongoose.model('MyData', myDataSchema);

// Define the /getData endpoint
app.get('/getData', async (req, res) => {
    try {
      const data = await MyData.find().sort({ date: -1 }).lean();
      res.json(data);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  });
// Start server
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
