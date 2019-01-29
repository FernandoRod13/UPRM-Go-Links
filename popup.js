'use strict';
const url = chrome.runtime.getURL('data.json');
var config = {
    apiKey: "[insert api key]",
    authDomain: "[insert auth domain]",
    databaseURL: "[insert database url]",
    projectId: "[insert project id]",
    storageBucket: "[insert storage bucket]",
    messagingSenderId: "[insert message sender id]"
  };
const app = firebase.initializeApp(config);

function addLink() {
    var urlInpt = document.getElementById("long-url");
    var keyInpt = document.getElementById("keyword");
    var url = urlInpt.value;
    var key = keyInpt.value;
    chrome.storage.local.set({[key]: url}, function() {
        urlInpt.value = "";
        keyInpt.value = "";
        console.log(key + ': ' + url);
    });
    var publicLink = true;
    if (publicLink) {
        firebase.database().ref("go-links/public").update({[key]:url});
    }
    
}


document.getElementById("submit").addEventListener('click', addLink);