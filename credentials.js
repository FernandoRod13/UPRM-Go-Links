var config = {
    apiKey: "AIzaSyC31Q3P2_jyBiyuxLVx6zKcJqC7Mme-IJQ",
    authDomain: "go-uprm.firebaseapp.com",
    databaseURL: "https://go-uprm.firebaseio.com",
    projectId: "go-uprm",
    storageBucket: "go-uprm.appspot.com",
    messagingSenderId: "612040504909"
  };
firebase.initializeApp(config);

function initApp() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            document.getElementById("add-link").hidden = false;
            document.getElementById("email-signin").hidden = true;
        } else {
            document.getElementById("add-link").hidden = true;
            document.getElementById("email-signin").hidden = false;
        }
    });
}

function signin() {
    var emailField = document.getElementById("email");
    var passwordField = document.getElementById("password");
    var email = emailField.value;
    var password = passwordField.value;
    if(email.includes("@upr.edu")) {
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
            console.log(errorMessage);
        });
    }else {

    }
}

document.getElementById("email-signin").addEventListener('click', signin);


window.onload = function() {
    initApp();
};