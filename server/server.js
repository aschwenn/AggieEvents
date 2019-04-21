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
  { 
    "name": "Aprilsfest", 
    "icon":"people", 
    "location": "Wehner Building", 
    "host":"Student Council", 
    "startDate":"04-12-2019",
    "startDayofWeek":3,
    "endDate":"04-10-2019",
    "endDayofWeek": 2,
    "startTime":"1000",
    "endTime": "1500",
    "description": "Howdy folks! Junesfest is back and more Texan than ever!  Come on out for a big ole' heaping portion of food, games, and more! We can't predict the weather, but we can predict that fun will be had - the Maysfest way! So grab some friends and head over to Mays because you don't wanna miss the BEST STATE EVER!!! Whoops, we mean THE BEST DAY EVER!!!",
    "going":513,
    "interested":15 ,
    "attributes": [ 
      "Kid-friendly", 
      "Free food" 
    ],
    "RSVP":"going"
  },
{ "name": "Junesfest", "icon":"people", "location": "Wehner Appt", "host":"Business Council", "startDate":"04-11-2019","startDayofWeek":4,"endDate":"04-10-2019","endDayofWeek": 2,"startTime":"1300","endTime": "1500","description": "Howdy folks! Junesfest is back and more Texan than ever!  Come on out for a big ole' heaping portion of food, games, and more! We can't predict the weather, but we can predict that fun will be had - the Maysfest way! So grab some friends and head over to Mays because you don't wanna miss the BEST STATE EVER!!! Whoops, we mean THE BEST DAY EVER!!!","going":23,"interested":14 ,  "attributes": [ "Kid-friendly", "Free food" ],"RSVP":"going" },
{ "name": "2019 Senior Dining Out", "icon":"flag", "location": “MSC Ballroom", "host":"Texas A&M Corps of Cadets", "startDate":"05-03-2019", "startDayofWeek":6, "endDate":"05-03-2019","endDayofWeek": 6,"startTime":"1730","endTime": "2100","description": "Everyone needs to RSVP. If you are not able to attend, please fill in all the information and note in the 'Comments' section the reason why you will not be able to join us.","going":458,"interested":0 ,  "attributes": [ "Senior Cadets Required", "Guests allowed" ],"RSVP":null },
{ "name": "Aggie Muster", "icon":"home", "location": “Reed Arena", "host":"Association of Former Students", "startDate":"04-22-2019", "startDayofWeek":2, "endDate":"04-22-2019","endDayofWeek": 1,"startTime":"1700","endTime": "2200","description": "Attend annual Aggie Muster as an organization to remember the fallen Aggies of the past year.","going":7863,"interested":1284 , "attributes": [ "Softly Call Muster", "Here" ],"RSVP":null },
{ "name": "Zero Waste Earth Day Fundraiser", "icon":"ios-planet", "location": “Rudder Plaza", "host":"Texas A&M Earth Sciences", "startDate":"04-22-2019", "startDayofWeek":1, "endDate":"04-24-2019","endDayofWeek": 3,"startTime":"2200","endTime": "1500","description": "Aggie Riveters First ever Earth Day Fundraising Event! Educational and practical knowledge to be shared on living a more zero waste lifestyle with Zero Waste starter kits available. There will be household items that are brand new from sustainable companies and a thrift store to encourage recycling of clothes.","going":53,"interested":14 , "attributes": [ "Fundraiser", "Planet Earth" ],"RSVP":null },
{ "name": "2019 Senior Dining Out", "icon":"flag", "location": “MSC Ballroom", "host":"Texas A&M Corps of Cadets", "startDate":"05-03-2019", "startDayofWeek":6, "endDate":"05-03-2019","endDayofWeek": 6,"startTime":"1730","endTime": "2100","description": "Everyone needs to RSVP. If you are not able to attend, please fill in all the information and note in the 'Comments' section the reason why you will not be able to join us.","going":458,"interested":0 ,  "attributes": [ "Senior Cadets Required", "Guests allowed" ],"RSVP":null }
{ "name": "Aggie Muster", "icon":"home", "location": “Reed Arena", "host":"Association of Former Students", "startDate":"04-22-2019", "startDayofWeek":2, "endDate":"04-22-2019","endDayofWeek": 1,"startTime":"1700","endTime": "2200","description": "Attend annual Aggie Muster as an organization to remember the fallen Aggies of the past year.","going":7863,"interested":1284 , "attributes": [ "Softly Call Muster", "Here" ],"RSVP":null },
{ "name": "Zero Waste Earth Day Fundraiser", "icon":"ios-planet", "location": “Rudder Plaza", "host":"Texas A&M Earth Sciences", "startDate":"04-22-2019", "startDayofWeek":1, "endDate":"04-24-2019","endDayofWeek": 3,"startTime":"2200","endTime": "1500","description": "Aggie Riveters First ever Earth Day Fundraising Event! Educational and practical knowledge to be shared on living a more zero waste lifestyle with Zero Waste starter kits available. There will be household items that are brand new from sustainable companies and a thrift store to encourage recycling of clothes.","going":53,"interested":14 , "attributes": [ "Fundraiser", "Planet Earth" ],"RSVP":null },
{ "name": "AMSA Blood Drive", "icon":"ios-heart", "location": “MSC Room 1303", "host":"American Medical Students Association", "startDate":"04-24-2019", "startDayofWeek":3, "endDate":"04-24-2019","endDayofWeek": 3,"startTime":"1200","endTime": "1630","description": "We're holding a blood drive in Rudder Plaza. All blood will help people in the Brazos County. This event is hosted by American Medical Students Association (AMSA). Members of AMSA will be serving as volunteers at this event and will assist in controlling traffic, keeping record of attendees, and giving those who've donated snacks. All those who are able to donate are welcome to attend.","going":37,"interested":3 ,  "attributes": [ "Free Food", "Maroon Blood" ],"RSVP":null },
{ "name": "Black Male Think Tank - Distinguished Gentlemen’s Club", "icon":"power", "location": “MSC Room 2404", "host":"Distinguished Gentlemen’s Club", "startDate":"04-25-2019", "startDayofWeek":4, "endDate":"04-24-2019","endDayofWeek": 4,"startTime":"1900","endTime": "2015","description": "Annual program to discuss the concept of leadership and the dynamics of the Black male image in what we deemed the search of the Black gentlemen","going":37,"interested":3 ,  "attributes": [ "Free Food", "Maroon Blood" ],"RSVP":null },
{ "name": "Cooking for Hope", "icon":"local-pizza", "location": “Architecture Quad", "host":"Camp Hope", "startDate":"04-27-2019", "startDayofWeek":6, "endDate":"04-27-2019","endDayofWeek": 6,"startTime":"1100","endTime": "1800","description": "Cooking for hope is a barbeque cook-off charity event benefitting Camp Hope. Camp Hope provides interim housing for our wounded warriors, veterans and their families suffering from combat-related PTSD in a caring and positive environment. We plan to have lots of barbeques prepared by competition teams, inflatable attractions, games, and live music.","going":23,"interested":7 ,  "attributes": [ "Ticketed", "Fundraiser" ],"RSVP":null },
{ "name": "Sophomore Retreat 2019", "icon":"card-travel", "location": “Camp Cho Yeh, Livingston , Texas", "host":"Camp Cho Yeh", "startDate":"08-15-2019", "startDayofWeek":4, "endDate":"08-18-2019","endDayofWeek": 0,"startTime":"0800","endTime": "1400","description": "Sophomore Retreat is a 4-day leadership camp aimed at incoming sophomores to the department. We invite industry-leading companies to join us and give presentations as well as participate in activities with the students. We include events such as team building exercises, personal development, design challenges and ropes courses.","going":87,"interested":27 ,  "attributes": [ "Free Food", "Free Stuff" ],"RSVP":null },
{ "name": "MSC Open House", "icon":"ios-home", "location": “Memorial Student Center", "host":"Texas A&M University", "startDate":"09-01-2019", "startDayofWeek":0, "endDate":"09-01-2019","endDayofWeek": 0,"startTime":"1300","endTime": "1700","description": "MSC Open House is a student organization fair hosting more than 400 student clubs and organizations where students can recruit members from within the Texas A&M community. MSC Open House aims to provide an atmosphere in which any organization can recruit new members and learn about new opportunities.","going":4879,"interested":3848 ,  "attributes": [ "Aggies", "Free Stuff" ],"RSVP":null },
{ "name": "Tiny Meat Gang", "icon":"settings-power", "location": “Rudder Theatre", "host":"Texas A&M University", "startDate":"10-24-2019", "startDayofWeek":4, "endDate":"10-24-2019","endDayofWeek": 4,"startTime":"0700","endTime": "1000","description": "The event would be a live comedy show in Rudder Theatre performed by Tiny Meat Gang, a group made up of Cody Ko and Noel Miller. Tiny Meat Gang is a nationally famous and touring comedy duo that originated on YouTube.","going":131,"interested":33 ,  "attributes": [ "Ticketed", "Comedy" ],"RSVP":null },
{ "name": "L.T. Jordan Fellows Program ", "icon":"school", “location”: “Varies", "host":"MSC L.T. Jordan Institute", "startDate":"08-27-2018", "startDayofWeek":1, "endDate":"05-11-2019","endDayofWeek": 6,"startTime":"1200","endTime": "1300","description": "The purpose of the L.T. Jordan Fellows Program is to provide highly qualified Texas A&M University students the opportunity for personal enrichment and education through an international research experience. This is achieved by designing a specific independent international research project that will enhance the participant's educational or career goals.","going":455,"interested":848 ,  "attributes": [ "Aggies", "Free Stuff" ],"RSVP":null },
{ "name": "Senior Appreciation Dinner", "icon":"party-mode", "location": “Texas A&M University", "host":"Texas A&M University", "startDate":"05-01-2019", "startDayofWeek":3, "endDate":"05-01-2019","endDayofWeek": 3,"startTime":"1830","endTime": "2030","description": "Thank you for everything you have done for this university! You have come a long way, seniors!","going":382,"interested":342 ,  "attributes": [ "Dinner", "Seniors" ],"RSVP":null },
{ "name": "Mind Unwind 5K", "icon":"ios-baseball", "location": “Wolf Pen Creek Park", "host":"Society of Petroleum Engineers (SPE)", "startDate":"04-27-2019", "startDayofWeek":6, "endDate":"04-27-2019","endDayofWeek": 6,"startTime":"0930","endTime": "1230","description": "On behalf of the Society of Petroleum Engineers (SPE), the American Association of Drilling Engineers (AADE), Pi Epsilon Tau (Petroleum Engineering Honor Society), and the International Association of Drilling Contractors (IADC), or collectively PETE Orgs, it is with great excitement that we announce the first annual Mind Unwind 5K Festival! This initiative combines the philanthropy committees of PETE Orgs in a fundraiser for the sole benefit of United Way of the Brazos Valley. Unwind your mind and join us for a fun walk/run with food, games, and prizes!","going":24,"interested":14 ,  "attributes": [ "Fun run", "Sports" ],"RSVP":null },
{ "name": "Kyle Field Day", "icon":"donut-small", "location": “Kyle Field", "host":"MSC Freshmen in Service and Hosting", "startDate":"4-27-2019", "startDayofWeek":6, "endDate":"04-27-2019","endDayofWeek": 6,"startTime":"1100","endTime": "1500","description": "Kyle Field Day is a one day service event held outside of and in the concourse of Kyle Field. The mission of Kyle Field Day is to connect Texas A&M students and the Bryan/College Station community with service organizations from on and off campus and to complete impactful, hands-on service projects for the missions of the organizations. With thousands of participants and 40-plus service booths, Kyle Field Day has a widespread impact. In addition to this, Kyle Field Day serves as a tool to develop our freshmen members of MSC FISH professionally through planning the many facets of the event and hosting it. We hope to inspire our members as well as the community to serve, not only at Kyle Field Day, but throughout the year.","going":32,"interested":42 ,  "attributes": [ "Free-Stuff", "Open-Event" ],"RSVP":null },
{ "name": "Noche De Gala", "icon":"ios-cloudy-night", "location": “Alquimia Night Club", "host":"Phi Lota Alpha", "startDate":"04-25-2019", "startDayofWeek":4, "endDate":"04-26-2019","endDayofWeek": 5,"startTime":"1030","endTime": "1200","description": "Noche De Gala will be a cultural/Fundraiser event hosted by Phi Iota Alpha at Alquimia Night club. A percentage of proceeds from ticket sales will go to our "Leones Scholarship" and to our philanthropy National Hispanic Institution.","going":33,"interested":8 ,  "attributes": [ "Spanish", "Night" ],"RSVP":null }
 
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
