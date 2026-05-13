/**************************************************************
 **************************************************************
 **                                                          **
 ** fb_io.js is where you will put common firebase functions **
 ** used throughout your code.                               **
 **                                                          **
 **************************************************************
 **************************************************************/
function fb_popupLogin(){
    var provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider).then((result) => {
    GLOBAL_user = result.user; // Save the user details object to a global variable 
    console.log("User has logged in")
    });
}

function fb_login(){
    firebase.auth().onAuthStateChanged(LOGIN_CALLBACK);
}