/* This is the backend Node.js server which also uses the
 * Express.js library, among a few other libraries
 *
 * The goal of this server is to provide data to the frontend
 * and act as a middleman between the frontend and database, 
 * processing and sorting the data before sending it to the
 * frontend.
 * 
 * To test this server out for yourself, navigate to the 'server'
 * directory and run 'node server.js' (or just 'node server').
 * This will run this node file, which will start the server on a
 * port specified below on your local machine.
 * 
 * To test that the server works, you can download the 'Postman'
 * Chrome extension to try sending HTTP requests to the server.
 * Your browser can already send HTTP GET requests (which occur
 * when you type an IP into the URL field), but Postman will also
 * allow you to send POST requests to send and receive JSON data.
 * 
 * The following are the HTTP requests you can make on the frontend,
 * which can be handled in this file:
 * 
 * GET - ask for information, usually no request beyond the URL itself
 * POST - send information (JSON data), expects a response (either
 * return the sent information to confirm that it was received, or
 * return new information if the user was asking for data)
 * UPDATE - update some stored data, we probably won't use this
 * DELETE - delete some stored data, we probably won't use this
 * 
 * Of these four, we'll mostly use POST requests as they are more secure
 * and allow the frontend to send JSON data (while GET requests can send
 * data, it's very limited and is contained in the URL, such as when
 * accessing http://mywebsite.com/api/getUserData:myUserName).
 */

/* Imports */
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

/* Initialize our Express server */
var app = express();

/* Include our dependencies */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

console.log('Hello, world!\n');
/* Print statements are made with console.log();
 * these will show up in your terminal window. */

/* HTTP request handlers */
app.get('/', (req, res) => {
  /* Node.js uses arrow functions (like () => {...}) very often
   * to handle callbacks. These are called once the server gets
   * a request to a certain route. In this case, accessing 
   * http://localhost:port/ (with the port number filled in) will
   * trigger this function. 'req' is the request, which may contain
   * request data, and 'res' is the response, which is what is sent
   * back to the requesting machine.
   */

   console.log('GET /\t\t\t' + 'User accessed our server!');

   /* Our response goes here. If we know a web browser will be
    * accessing this route, we can send back HTML */
   res.send(`
    <head>
      <title>Aggie Events Backend</title>
    </head>
    <body style="textAlign:center,margin:0,">
      <h1><center>Aggie Events Backend</center></h1>
    </body>
   `);
});
app.post('/postData/', (req, res) => {
  /* Here's an example of handling a POST request. Now, the 'req'
   * variable will actually contain data that we need to check.
   * 
   * For this example, we can expect (JSON) data of this format:
   * {
   *  "name": "Albert",
   *  "major": "CEEN",
   *  "classification": "U4"
   * }
   */

   // Making sure the data was sent correctly
   if (!req.body || !req.body.name || !req.body.major || !req.body.classification){
     res.status(400).send('400 error: bad request!');
   }

   console.log('POST /postData/\t\t' + 'Data request for ' + req.body.name);

   // Here is where we would make the database query

   res.send('Data for ' + req.body.name + ' received.');
});

/* Start the server on a port on our machine */
var port = 8080;
app.listen(port, () => {
  console.log('Server started on port ' + port + '\n\n');
  console.log('----- Usage log -----');
});

/* Additional notes:
 * 
 * I installed Nodemon (https://github.com/remy/nodemon) to enable
 * live-reloading for this server (meaning every time you save, the
 * server will restart). You can download it with
 * 'npm install --save-dev nodemon'. This library is a wrapper for the
 * 'node' command, so you can use it in the same way: 'nodemon server'.
 */