const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const ClientModel = require('./models/Client'); // Adjust the path as per your project structure

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection URI
const dbURI = "mongodb+srv://meyrushan29:Bookmari20.M@olms.motagl0.mongodb.net/OLMS";

// Connect to MongoDB
mongoose.connect(dbURI);

// Event handlers for MongoDB connection
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB database');
});


app.get('/',(req,res)=>{
    ClientModel.find({})
    .then(Client => res.json(Client))
    .catch(err => res.json(err))
})

// Example route
app.post('/CreateClient', (req, res) => {
    ClientModel.create(req.body)
    .then(Client => res.json(Client))
    .catch(err => res.json(err))
});

app.get('/getClient/:id',(req,res)=>{
    const id = req.params.id;
    ClientModel.findById({_id:id})
    .then(Client => res.json(Client))
    .catch(err => res.json(err))
})


app.put('/UpdateClient/:id',(req,res)=>{
    const id = req.params.id;
    ClientModel.findByIdAndUpdate({_id:id},{
        clientId:req.body.clientid,
        clientName:req.body.clientName,
        email:req.body.email,
        phone:req.body.phone,
        address:req.body.address})
    .then(Client => res.json(Client))
    .catch(err => res.json(err))
})

app.delete('/deleteClient/:id',(req,res)=>{
    const id = req.params.id;
    ClientModel.findByIdAndDelete({_id:id})
    .then(res => res.json(res))
    .catch(err => res.json(err))
})

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
