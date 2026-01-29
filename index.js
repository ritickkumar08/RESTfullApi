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


app.listen(PORT, ()=>{
    console.log(`server listening on the port ${PORT}`);
}) //listening to the port number.