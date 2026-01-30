# RESTfullApi

first - create a server using express and to do so:
    as we are using ES module so we will import it and then make the app and then listen to the port.
    and we will also have to change type to module from commonjs.

now we will start to design the API for different purpose :-
    1:- GET /users – Fetch the list of all users. 
        an API with GET method to retrieve the users data.
        res- to send a response when the API is hit by a user  
            it sends a status - which is for machines so it must be accurate.
            and message is for human which are secondary.
    2:- // 2.GET /users/:id – Fetch details of a specific user by ID.
        an API that takes id in url and returns the user with same id.