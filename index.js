import express from 'express' //importing express form express
const app = express() //creating the app 
const PORT = 8080 //selecting a port number to listen to for the responses.

/* -------------------- In-memory data store -------------------- */
let users = [
  {
    id: "1",
    firstName: "Anshika",
    lastName: "Agarwal",
    hobby: "Teaching",
  },
];

/* -------------------- Built-in middleware -------------------- */
app.use(express.json());  //to change the coming data into json format so that when the values are accessed we don't get undefined.

/* -------------------- Logging middleware -------------------- */
//runs for every incoming requests and logs the details about an API 
// HTTP method
// URL
// Status code
// Time taken
app.use((req,res,next) =>{ //app.use registers global middleware
    const start = Date.now.  //gives current time in milliseconds

    res.on('finish', ()=>{
        const duration = Date.now() - start;
        console.log(`${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`);
    })//finish fires when the response is fully sent

    next() //Next middleware
})

/* -------------------- Validation Middleware (15 marks) -------------------- */
function validateUser(req, res, next){
    const {id, firstName, lastName, hobby} = rq.body;

    if(!firstName || !lastName || !hobby){
        return res.status(400).json({message: "All fields (firstName, lastName, hobby) are required"})
    }

    next() //Next middleware, if any or tho the control
}

// 1.GET /users – Fetch the list of all users.
app.get('/users', (req,res) =>{
    res.status(200).json(users)
})

// 2.GET /users/:id – Fetch details of a specific user by ID.
app.get('/users/:id', (req,res)=>{
    const userInfo = users.find((user) => user.id == req.params.id) //here we try finding the user that has the same id as searched in the URL.

    if(!userInfo){ //if the user doesn't exists we return with a negative response
        return res.status(404).json({message: "user doesn't exists in the System"})
    }

    res.status(200).json(userInfo)// if the user exists we return its information.
})


//3. POST /user – Add a new user.
app.post('/user', validateUser, (req,res) =>{
    const existingUser = users.find((user) => user.id === req.body.id)

    if(existingUser){
        return res.status(400).json({message: "user already exists"})
    }
    const newUser = {
        id: (users.length + 1).toString(),
        firstName,
        lastName,
        hobby
    }

    users.push(newUser)
    res.status(201).json({message : "New user registered"})
})

//4. PUT /user/:id – Update details of an existing user.
app.put('/user/:id', validateUser, (req,res) =>{
    const index = users.findIndex((user) => user.id === req.params.id)
    console.log(index);
    

    if(index === -1){
        return res.status(404).json({message: "user doesn't exists in the System"})
    }

    users[index] = {...users[index],
                    firstName,
                    lastName,
                    hobby,
                }

    res.status(200).json({message: `the user ${users[index].firstName} is updated, successfully!`})
})

//5. DELETE /user/:id – Delete a user by ID.
app.delete('/user/:id', (req, res) => {
    const index = users.findIndex((user) => user.id === req.params.id)

    if(index === -1){
        return res.status(404).json({message: "user doesn't exists in the System"})
    }

    users.splice(index, 1)
    res.status(200).json({ message: `User deleted successfully` })
})

/* -------------------- Global Error Handler (10 marks) -------------------- */
//This middleware handles errors. that are not because of the users but something broke internally
app.use((err,req,res,next)=>{
    console.error(err.stack);
    res.status(500).json({ error: "Internal Server Error" });
})

app.listen(PORT, ()=>{
    console.log(`server listening on the port ${PORT}`);
}) //listening to the port number.