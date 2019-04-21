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

console.log('Hello, world!');
/* Print statements are made with console.log();
 * these will show up in your terminal window. */

/* Test data */
var testEvents = [
  {
    "name": "Maysfest",
    "icon": "people",
    "location": "Wehner",
    "host": "Business Student Council",
    "startDate": "04-10-2019",
    "startDayofWeek": 2,
    "endDate": "04-10-2019",
    "endDayofWeek": 2,
    "startTime": "1000",
    "endTime": "1400",
    "description": "Howdy folks! Maysfest is back and more Texan than ever!  Come on out for a big ole' heaping portion of food, games, and more! We can't predict the weather, but we can predict that fun will be had - the Maysfest way! So grab some friends and head over to Mays because you don't wanna miss the BEST STATE EVER!!! Whoops, we mean THE BEST DAY EVER!!!",
    "going": 53,
    "interested": 12,
    "attributes": [
      "Kid-friendly",
      "Free food"
    ],
    "RSVP": "going"
  },
];

var acceptedCategories = [
  'Academic Support',
  'Academic-Agriculture',
  'Academic-Architecture',
  'Academic-Bush School',
  'Academic-Business',
  'Academic-College of Science',
  'Academic-Education',
  'Academic-Engineering',
  'Academic-Geosciences',
  'Academic-Graduate College',
  'Academic-Health Sciences Center',
  'Academic-Liberal Arts',
  'Arts and Culture',
  'Campus Service',
  'Community/Volunteer Service',
  'Cultural/International',
  'Division of Student Affairs',
  'Enthusiasts',
  'Global Service',
  'Greek Life',
  'Healthy Living',
  'Honor',
  'Memorial Student Center',
  'Military',
  'Professional/Career',
  'Recreation',
  'Religious',
  'Residence Halls',
  'Safety Resources',
  'Social and Political Issues',
  'Special Interests',
  'Spirit and Tradition',
  'Sport Clubs',
  'Student Government',
  'TAMU Law',
  'University Services',
  'Veterinary Medicine',
];

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
   console.log(new Date() + '\n'); // Print the date and time accessed

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
     console.log('POST /postData/\t\t' + 'Bad request!')
     console.log(new Date() + '\n');
   }

   console.log('POST /postData/\t\t' + 'Data request for ' + req.body.name);
   console.log(new Date() + '\n');
   
   // Here is where we would make the database query

   res.send('Data for ' + req.body.name + ' received.');
});
app.get('/kill/', (req, res) => {
  /* Used to test the 'forever' library, this route kills the node server */

  console.log('\nServer killed...');
  console.log(new Date() + '\n');

  process.exit();
});

/* Time for the real code... */
app.post('/getEvents/', (req, res) => {
  if (!req.body || !req.body.type || !req.body.userId){
    res.status(400).send('400 error: bad request!');
    console.log('POST /getEvents/\t\t' + 'Bad request - missing data');
    console.log(new Date() + '\n');
  }

  console.log('POST /getEvents/\t\t' + "Get '" + req.body.type + "' for " + req.body.userId);
  console.log(new Date() + '\n');

  /* Request data format:
   * {
   *  type: all | myUpcoming | allThisWeek | category
   *  query:
   *    if all, null
   *    if myUpcoming, null
   *    if allThisWeek, null
   *    if category, category type
   *  userId: UIN
   * }
   */

    if (req.body.type == 'all'){
      // Send all events in the table, sorted by date
    }
    else if (req.body.type == 'myUpcoming'){
      // Send upcoming events for userId, sorted by date
    }
    else if (req.body.type == 'allThisWeek'){
      // Send all events for this week, sorted by date
    }
    else if (req.body.type == 'category'){
      // Send all events for category, sorted by date

      // Check that query (category) in accepted list of categories
      if (acceptedCategories.includes(req.body.query)){
        // Perform search

      }
      else {
        res.status(400).send('400 error: bad request: category');
        console.log('POST /getEvents/\t\t' + 'Bad request - illegal category');
        console.log(new Date() + '\n');
      }
    }

    res.send(testEvents);
});
app.post('/searchEvents/', (req, res) => {
  if (!req.body || !req.body.query){
    res.status(400).send('400 error: bad request!');
    console.log('POST /searchEvents/\t\t' + 'Bad request!')
    console.log(new Date() + '\n');
  }

  /* Request data format:
   * {
   *  query: search terms
   *  category: can be category or null
   * }
   */
  
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
 * 
 * The Forever library can also be used to prevent the server from crashing.
 * This library restarts the server when it detects a crash. The following
 * command: 'forever -o logfile.txt server.js' keeps the server running and
 * copies all data from STDOUT to the logfile so that we can check later
 * for what may have caused crashes. The 'forever list' command shows any
 * forever processes, and the 'forever stopall' command kills any processes
 * it's running (useful if you have one running in the background and try to
 * open the server again on the same port--you will experience an error).
 */