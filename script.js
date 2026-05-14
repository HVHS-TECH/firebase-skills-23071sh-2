/**************************************************************
 **************************************************************
 **                                                          **
 ** script.js is where you will write most of your code.     **
 **                                                          **
 **************************************************************
 **************************************************************/

const HTML_OUTPUT = document.getElementById("databaseOutput");

/**************************************************************/
// helloWorld()
// Demonstrate a minimal write to firebase
// This function replaces the entire database with the message "Hello World"
// 
// This uses the set() operation to write the key:value pair "message":"Hello World"
// The ref('/') part tells the operation to write to the base level of the database "/"
// This means it replaces the whole database with message:Hello World
/**************************************************************/
function helloWorld() {
  console.log("Running helloWorld()")
  firebase.database().ref('/').set(
    {
      message: 'kia ora'
    }
  )
}

function goodbyeWorld() {
  console.log("Running goodbyeWorld()")
  firebase.database().ref('/').set(
    {
      message: 'Goodbye'
    }
  )
}

function simpleRead() {
  console.log("Reading message");
  firebase.database().ref('/').child('message').once('value', displayRead, fb_readError);
  console.log("Leaving simpleRead");
}

function displayRead(snapshot) {
  console.log("Running displayRead(), the message is:" + snapshot.val())
  HTML_OUTPUT.innerHTML = snapshot.val();
}

function display(snapshot) {
  var dbData = snapshot.val();
  if (dbData == null) { // If there is no data, dbData will be null. 
    console.log('there was no record when trying to read the message');
  }
  else {
    console.log("The message is:" + dbData)
  }
}

function fb_readError(error){
  console.log("There was an error reading the message");
  console.error(error);
}

function fb_readListener(){
  console.log("Read Listener");
  firebase.database().ref('/message').on('value', displayRead,  fb_readError)
}


function createHighScores() {
  console.log("Creating high score table"); 
  highscoreTable = {
    game1: {
      users: {
        Mishall: 40,
        Paige: 80,
        Amira: 70,
        Raya: 100,
        Iqra: 130, 
      }
    },
    game2: {
      users: {
        Mishall: 10, 
        Paige: 20,
        Amira: 30,
        Raya: 40,
        Iqra: 50,
      }
    }
  }
  firebase.database().ref('/').set(highscoreTable)
  }

//Adding scores 
function addScore(){
  console.log("adding scores");
  firebase.database().ref('/game1/users/Sonia').set(80);
}

//Adding all the scores 
function fb_readAllScores(){
  console.log("Reading all scores");
  firebase.database().ref('/game1').once('value', fb_displayAllScores, fb_readError)
}

//Display all the scores
function fb_displayAllScores(snapshot){
  let highScores = snapshot.val().users;
  let names = Object.keys(highScores);
  console.log(names);
  HTML_OUTPUT.innerHTML = "";
  for(i = 0; i < names.length; i++){
    let key = names[i];
    console.log("Score "+i+" is for "+ highScores[key] + " points");
    HTML_OUTPUT.innerHTML += "Score " + i + " is for " + highScores[key] + " points<br>";
  }
}

//Sorting the highscore data
function fb_sortScores(){
  firebase.database().ref('/game1/users') .orderByChild("score") .once('value', fb_sortHighScores, fb_readError)
}

function fb_sortHighScores(snapshot){
  HTML_OUTPUT.innerHTML = "";
  snapshot.forEach(function(child){
    console.log(child.key + " got " + child.val() + " points");
    HTML_OUTPUT.innerHTML +=
    "<p>" + child.key + " : " + child.val() + " points</p>";
  });
}
function fb_showOnceScore(child){
  console.log(child.key+" got "+ child.val()+" points");
}

var GLOBAL_user; //Google's user object

//Set up a listener for the login state of the user
function fb_login(){
   authenticationListener = firebase.auth().onAuthStateChanged(fb_handleLogin);
}
// Run when the login state of the user changes. 
function fb_handleLogin(_user){
    if (_user){
        console.log("User is logged in")
        GLOBAL_user = _user; //Save the user details object to a global variable
 }  else {
    console.log("user is Not logged in - Starting the popup process")
    fb_popupLogin();
 }
}

//Run the google login popup
function fb_popupLogin(){
    var provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider).then((result) => {
        GLOBAL_user = result.user; //Save the user object to a global variable
        console.log("User has logged in")
    });
}

