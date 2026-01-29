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



app.listen(PORT, ()=>{
    console.log(`server listening on the port ${PORT}`);
}) //listening to the port number.