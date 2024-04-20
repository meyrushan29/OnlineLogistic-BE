const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const ClientModel = require('./models/Client'); 
const SupplierModel =require('./models/Supplier');


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

// Supplier API

app.post('/CreateSupplier', (req, res) => {
    SupplierModel.create(req.body)
    .then(Supplier => res.json(Supplier))
    .catch(err => res.json(err))
});

app.get('/sup',(req,res)=>{
    SupplierModel.find({})
    .then(Supplier => res.json(Supplier))
    .catch(err => res.json(err))
})

app.get('/getSupplier/:id',(req, res) =>{
    const id = req.params.id;
    SupplierModel.findById({_id:id})
    .then(Supplier => res.json(Supplier))
    .catch(err => res.json(err))
})

app.put('/UpdateSupplier/:id',(req,res)=>{
    const id = req.params.id;
    SupplierModel.findByIdAndUpdate({_id:id},{
        SupplierID:req.body.SupplierID,
        Name:req.body.Name,
        Email:req.body.Email,
        PhoneNumber:req.body.PhoneNumber,
        CompanyName:req.body.CompanyName,
        OrderID:req.body.OrderID,
        Country:req.body.Country,
        Status:req.body.Status,
        Category:req.body.Category,
       })
    .then(Supplier => res.json(Supplier))
    .catch(err => res.json(err))
})

app.delete('/Deletesupplier', (req, res) => {
    const ids = req.body.ids;
    SupplierModel.deleteMany({ _id: { $in: ids } })
        .then(() => res.json({ message: 'Suppliers deleted successfully' }))
        .catch(err => res.status(500).json({ error: err.message }));
});



//End Supplier/////////////////////




// Client API//////

app.get('/',(req,res)=>{
    ClientModel.find({})
    .then(Client => res.json(Client))
    .catch(err => res.json(err))
})

app.post('/CreateClient', async (req, res) => {
    try {
        const existingClient = await ClientModel.findOne({ clientId: req.body.clientId });
        
        if (existingClient) {
            return res.status(400).json({ message: 'Client ID already exists' });
        }

        const newClient = await ClientModel.create(req.body);
        res.json(newClient);
    } catch (err) {
        res.status(500).json({ message: 'Error creating client', error: err });
    }
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
        address:req.body.address,
        gender:req.body.gender,
        billingAddress:req.body.billingAddress,
        status:req.body.status
    })
    .then(Client => res.json(Client))
    .catch(err => res.json(err))
})

app.delete('/deleteClient/:id',(req,res)=>{
    const id = req.params.id;
    ClientModel.findByIdAndDelete({_id:id})
    .then(res => res.json(res))
    .catch(err => res.json(err))
})

//////////ENd Client API///////////////





// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
