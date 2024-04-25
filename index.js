const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const ClientModel = require('./models/Client'); 
const SupplierModel = require('./models/Supplier');
const CustomersupportModel = require('./models/Customersupport');
const { cookie } = require('express-validator');
const UserModel = require('./models/Users')
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')


const app = express();
app.use(cors({
    origin:["http://localhost:3000"],
    methods:["GET","POST"],
    credentials:true
}));
app.use(express.json());
//app.use(cookieParser());

// MongoDB connection URI
const dbURI = "mongodb+srv://meyrushan29:Bookmari20.M@olms.motagl0.mongodb.net/OLMS";

// Connect to MongoDB
// Connect to MongoDB
mongoose.connect(dbURI)
    .then(() => console.log('Connected to MongoDB database'))
    .catch(err => console.error('Connection error:', err));


// Register

app.post('/register',(req,res)=>{
    const {name ,email , password} = req.body;
    bcrypt.hash(password,10)
    .then(hash =>{
        UserModel.create({name,email,password:hash})
        .then(user => res.json({status:"Success"}))
        .catch(err => res.json(err))
    }).catch(err => res.json(err))
})


//Login


app.post('/login', (req,res)=>{
    const {email,password} = req.body;
    UserModel.findOne({email:email})
    .then(user => {
        if(user){
            bcrypt.compare(password,user.password,(err,response)=>{
                if(response){
                    const token = jwt.sign({email: user.email}, 'your-secret-key', { expiresIn: '1h' });
                    res.cookie('token',token)
                    return res.json({Status:"Sucess"}
                    )
                }else {
                    return res.json("The password is Incorrect");
                }
            })

        } else {
            return res.json("No records Existed")
        }
    })
})


//CustomerSupport

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
app.get('/cus', async (req, res) => {
    try {
        const Customersupport = await CustomersupportModel.find({});
        res.json(Customersupport);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching suppliers', error: err.message });
    }
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
        .catch(err => res.json(err)); // Add a closing parenthesis here
});

// Supplier API

app.post('/CreateSupplier', async (req, res) => {
    try {
        const existingSupplier = await SupplierModel.findOne({ SupplierID: req.body.SupplierID });
        
        if (existingSupplier) {
            return res.status(400).json({ message: 'Supplier ID already exists' });
        }

        const newSupplier = await SupplierModel.create(req.body);
        res.json(newSupplier);
    } catch (err) {
        res.status(500).json({ message: 'Error creating supplier', error: err.message });
    }
});

app.get('/sup', async (req, res) => {
    try {
        const suppliers = await SupplierModel.find({});
        res.json(suppliers);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching suppliers', error: err.message });
    }
});

app.get('/getSupplier/:id', async (req, res) => {
    try {
        const supplier = await SupplierModel.findById(req.params.id);
        res.json(supplier);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching supplier', error: err.message });
    }
});

app.put('/UpdateSupplier/:id', async (req, res) => {
    try {
        const updatedSupplier = await SupplierModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedSupplier);
    } catch (err) {
        res.status(500).json({ message: 'Error updating supplier', error: err.message });
    }
});

app.delete('/Deletesupplier', async (req, res) => {
    try {
        const { ids } = req.body;
        await SupplierModel.deleteMany({ _id: { $in: ids } });
        res.json({ message: 'Suppliers deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting suppliers', error: err.message });
    }
});

// Client API

app.get('/', async (req, res) => {
    try {
        const clients = await ClientModel.find({});
        res.json(clients);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching clients', error: err.message });
    }
});

app.post('/CreateClient', async (req, res) => {
    try {
        const existingClient = await ClientModel.findOne({ clientId: req.body.clientId });
        
        if (existingClient) {
            return res.status(400).json({ message: 'Client ID already exists' });
        }

        const newClient = await ClientModel.create(req.body);
        res.json(newClient);
    } catch (err) {
        res.status(500).json({ message: 'Error creating client', error: err.message });
    }
});

app.get('/getClient/:id', async (req, res) => {
    try {
        const client = await ClientModel.findById(req.params.id);
        res.json(client);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching client', error: err.message });
    }
});

app.put('/UpdateClient/:id', async (req, res) => {
    try {
        const updatedClient = await ClientModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedClient);
    } catch (err) {
        res.status(500).json({ message: 'Error updating client', error: err.message });
    }
});

app.delete('/deleteClient/:id', async (req, res) => {
    try {
        await ClientModel.findByIdAndDelete(req.params.id);
        res.json({ message: 'Client deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting client', error: err.message });
    }
});

// Dashboard API

app.get('/api/admindashboard/clientcount', async (req, res) => {
    try {
        const clientCount = await ClientModel.countDocuments();
        res.json({ count: clientCount });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching client count', error: error.message });
    }
});

app.get('/api/admindashboard/suppliercount', async (req, res) => {
    try {
        const supplierCount = await SupplierModel.countDocuments();
        res.json({ count: supplierCount });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching supplier count', error: error.message });
    }
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
