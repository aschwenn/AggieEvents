/* Controls global settings appwide */

export default {
  WireframeMode: true, // use local data (true) or make calls to backend (false)
  HideHeaders: true, // hide 'Aggie Events' title header on Events and Orgs pages
  ServerURL: 'http://localhost:8080/', // base URL for our AWS backend Node.js server
  DefaultListShow: 3, // default number of items to show in a list
  AcceptedCategories: [
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
  ],
}