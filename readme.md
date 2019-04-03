# Setup Instructions

### Git setup
* Make sure you have downloaded Git (on Windows: you can either use the Windows Command Prompt or Git Bash for a Linux terminal)
* Create a new folder for this project on your hard drive
* cd into the folder and enter the following commands:
  * `git clone https://github.com/aschwenn/AggieEvents.git`
  * Edit a line in test.txt
  * `git add .`
  * `git commit -m 'Your commit message here'`
  * `git push`
  * If the previous line doesn't work, try git push origin master
* Verify that your commit has successfully been pushed to GitHub

### Software
* Download NPM (Node Package Manager)
* `npm install` - this installs all of the packages used in our project; any time a new package is added by one of us, everyone else will have to run `npm install` to ensure that all packages are up to date
* `cd AggieEvents`
* `npm start` - this will open a development server on your local machine to allow you to view the app
  * You will need an emulator to view the application
  * The iOS emulator is only available on macOS

### React Native
* "Getting started" - https://www.youtube.com/watch?v=6ZnfsJ6mM5c
* React Native - JavaScript framework that creates a true native iOS or Android app
  * https://facebook.github.io/react-native/docs/getting-started
* React Native Elements - Library that provides basic UI app elements
  * https://react-native-training.github.io/react-native-elements/docs/getting_started.html
  
### Testing
* Download the "Expo Client" app to your phone from the App Store
* Run `npm start` to open a development server on your laptop
* Scan the QR code that appears in your browser page to open the app in the Expo Client
* If the default doesn't work, try to change the connection format and rescan (LAN to Tunnel)
