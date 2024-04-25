const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const ClientModel = require('./models/Client');
const CustomersupportModel = require('./models/Customersupport');

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

app.get('/', (req, res) => {
    ClientModel.find({})
        .then(Client => res.json(Client))
        .catch(err => res.json(err))
});

app.post('/CreateClient', (req, res) => {
    ClientModel.create(req.body)
        .then(Client => res.json(Client))
        .catch(err => res.json(err))
});

app.get('/getClient/:id', (req, res) => {
    const id = req.params.id;
    ClientModel.findById({_id: id})
        .then(Client => res.json(Client))
        .catch(err => res.json(err))
});

app.put('/UpdateClient/:id', (req, res) => {
    const id = req.params.id;
    ClientModel.findByIdAndUpdate({_id: id}, {
        clientId: req.body.clientid,
        clientName: req.body.clientName,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address
    })
        .then(Client => res.json(Client))
        .catch(err => res.json(err))
});

app.delete('/deleteClient/:id', (req, res) => {
    const id = req.params.id;
    ClientModel.findByIdAndDelete({_id: id})
        .then(result => res.json(result))
        .catch(err => res.json(err))
});

app.get('/cus', (req, res) => {
    CustomersupportModel.find({})
        .then(Customersupport => res.json(Customersupport))
        .catch(err => res.json(err))
});


app.post("/CreateTicket", (req, res) => {
    CustomersupportModel.create(req.body)
        .then(Customersupport => res.json(Customersupport))
        .catch(err => res.json(err))
});

app.get('/getTicket/:id', (req, res) => {
    const id = req.params.id;
    CustomersupportModel.findById({_id: id})
        .then(Customersupport => res.json(Customersupport))
        .catch(err => res.json(err))
});

app.put('/UpdateTicket/:id', (req, res) => {
    const id = req.params.id;
    CustomersupportModel.findByIdAndUpdate({_id: id}, {
        ticketId: req.body.ticketId,
        email:req.body.email,
        title: req.body.title,
        description: req.body.description,
        status: req.body.status
    })
        .then(Customersupport => res.json(Customersupport))
        .catch(err => res.json(err))
});

app.delete('/deleteTicket/:id', (req, res) => {
    const id = req.params.id;
    CustomersupportModel.findByIdAndDelete({_id: id})
        .then(result => res.json(result))
        .catch(err => res.json(err))
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
