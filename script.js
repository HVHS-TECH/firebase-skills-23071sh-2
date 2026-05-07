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
        Dhruv: 10,
        Jack: 80,
        Michael: 32,
        Sasha: 0.5,
        Yug: 99, 
      }
    },
    game2: {
      users: {
        Dhruv: 13, 
        Jack: 14,
        Michael: 7,
        Sasha: 3,
        Yug: 12,
      }
    }
  }
  firebase.database().ref('/').set(highscoreTable)
  }

function addScore(){
  console.log("adding scores");
  firebase.database().ref('/game1/users/Jenna').set(88);
}

function fb_readHighScore(){
  console.log("Reading High score");
  firebase.database().ref('/game1').once('value', fb_displayHighScores, fb_readError)
}

function fb_displayHighScores(snapshot){
  let highScore = snapshot.val()
  console.log( "Dhruv got" + highScore.users ["Dhruv"] +" points")
}

function fb_readAllScores(){
  console.log("Reading all scores");
  firebase.database().ref('/game1').once('value', fb_displayAllScores, fb_readError)
}

function fb_outputAllScores(){
  console.log("Reading scores")
  firebase.database().ref('/message').once('value',display); 
  console.log("leaving fb_outputAllScores ")
}

function fb_displayAllScores(snapshot){
  let highScores = snapshot.val().users;

  let names = Object.keys(highScores);
  console.log(names);

  for(let i = 0; i < names.length; i++){
    let key = names[i];
    console.log("Score "+i+" is for "+ key +" . "+highScores[key] + " points")
  }

   HTML_OUTPUT.innerHTML = snapshot.val().users;
}
