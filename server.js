const express = require('express')
const app = express()
const cors = require('cors')
const { MongoClient } = require('mongodb'); 
const sanitizeHtml = require('sanitize-html'); //reoves unwanted or malicious html inputs and scripts for security reasons 
const cookieParser = require('cookie-parser');
const csrf = require('csurf')
require('dotenv').config();
const PORT = 8000


// Set EJS as the view engine

app.set('view engine', 'ejs');


//Middleware

app.use(cors())  // cross origin resource sharing , enable security of who you allow to have access to the server 
app.use(express.static('public')) //automatically serves up files that are sent as is and can be accessed by thir direct path
app.use(express.urlencoded({ extended: true })); // Parses form data
app.use(express.json()); //Middleware automatically takes care of parsing income JSON payloads in the request.body
//Any Json coming from the client side will need to be stringify before sent to server then parsed in server side to be able to have access to request.body
app.use(cookieParser()); // Parse cookies before CSRF middleware
const csrfProtection = csrf({ cookie: true }); // Enable CSRF protection using cookies



let db; //use globally to interact with db
const dbConnectionStr = process.env.DB_STRING;
const dbName = 'students';

MongoClient.connect(dbConnectionStr, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((clientConnected) => {
        console.log(`Connected to ${dbName}`); 
        client = clientConnected
        db = client.db(dbName);
        // db.createCollection("studentsData")

    })
    .catch(err => console.error('Failed to connect:', err));


    process.on('SIGINT', async () => { //listens for the node server to close to exit mongoDb gracefully MongoDb recommends using client.close() to exit mongodb 
        console.log('\nClosing MongoDB connection...'); //\n new line console logged
        if (client) await client.close(); // Closes the MongoDB connection
        console.log('MongoDB connection closed.');
        process.exit(0); // Exit the Node.js process
    });


//db using MongoDB to store students info
//Get request

app.get('/', (request,response) => {
    response.render('login.ejs')
})

app.get('/dashboard', csrfProtection, (request, response) => {
    db.collection('studentsdata')
        .find()
        .toArray() // Fetch all documents and convert them into an array
        .then(data => {
            console.log(data);
            response.render('index.ejs', { students: data, csrfToken: request.csrfToken() }); 
        })
        .catch(error => {
            console.error(error);
            if (!response.headersSent) { 
                response.status(500).send('An error occurred while fetching data'); 
            }
        });
});


//Delete request
app.delete('/dashboard/deleteStudent', async (request, response) => {
    try {
        console.log('Delete request received:', request.body);

        const result = await db.collection('studentsdata').deleteOne({
            firstName: request.body.firstName, // Trim to avoid accidental spaces
            lastName: request.body.lastName
        });

        if (result.deletedCount === 0) {
            return response.status(404).json({ success: false, message: 'Student not found' });
        }

        console.log('Student deleted');
        response.json({ success: true, message: 'Student deleted' });

    } catch (error) {
        console.error(error);
        response.status(500).json({ success: false, message: 'Internal server error' });
    }
});


//update request

app.put('/dashboard/addLike', (request, response) => {
    console.log(`Update requested data: firstName = ${request.body.firstNameS}, lastName = ${request.body.lastNameS}`);   
 
    db.collection('studentsdata').updateOne({
        firstName: request.body.firstNameS,
        lastName: request.body.lastNameS
     
    
    }, {
        $inc: {likes: 1} //if error incrementing make sure to check POST route or database to make sure data is saved correctly and Conversions
    }, {
        upsert: false
    }).then(result => {
        console.log('updated likes by 1')
        response.json('like added!')
    }).catch(err => console.log(err))
})


//Post request
//Convert data to necessary strin, number, decimal before server send daata to database, could cause error manipulating data if not store correctly
app.post('/dashboard/addStudent', csrfProtection,(request, response) => {
    
    db.collection('studentsdata').insertOne({firstName: sanitizeHtml(request.body.firstName), lastName: sanitizeHtml(request.body.lastName), age: parseInt(request.body.age) || 0,
        gpa: parseFloat(request.body.gpa) || 0, likes: parseInt(request.body.likes) || 0}) //0 acts as a fallback just in case field is empty or invalid/ Number ensures the likes is stored as a number//ParseFLoat ensures to convery the data to decimal 0.0
        .then(data => {
            console.log('Student added')
            response.status(201).redirect('/') //redirect to the get route which will show the new inserted data
        })
        .catch(error =>{
            console.error(error)
        if (!response.headersSent) { 
            response.status(500).send('Internal server error.'); 
        }
    })
       
    })
    // app.get('/', (request, response) => {
    //     db.collection('studentsdata').find().toArray() //find all documents in the students collection and put them into an array
    //     .then(data => {
    //         console.log(data)
    //         response.render('index.ejs', {students: data}) //we are passing an object to EJS file for rendering, we will use the students variable too plug data in template
    //     })
    //     .catch(error =>{
    //         console.error(error)
    //     response.status(500).send('An error occurred while fetching data') // Error handling
    
    
    //     })
    // })


  
    app.listen(PORT, () =>{
        console.log(`Server running on ${PORT}!`)
    });