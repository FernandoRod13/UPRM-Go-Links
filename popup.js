'use strict';
const url = chrome.runtime.getURL('data.json');

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