// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

var config = {
  apiKey: "AIzaSyC31Q3P2_jyBiyuxLVx6zKcJqC7Mme-IJQ",
  authDomain: "go-uprm.firebaseapp.com",
  databaseURL: "https://go-uprm.firebaseio.com",
  projectId: "go-uprm",
  storageBucket: "go-uprm.appspot.com",
  messagingSenderId: "612040504909"
};
firebase.initializeApp(config);

// This event is fired each time the user updates the text in the omnibox,
// as long as the extension's keyword mode is still active.
chrome.omnibox.onInputChanged.addListener(
  function(text, suggest) {
    var bkg = chrome.extension.getBackgroundPage();
    bkg.console.log('inputChanged: ' + text);
    suggest([
      {content: text + " one", description: "the first one"},
      {content: text + " number two", description: "the second entry"}
    ]);
  });

// This event is fired with the user accepts the input in the omnibox.
chrome.omnibox.onInputEntered.addListener(
  function(text, current) {
    chrome.storage.local.get([text], function(result) {
      if (result[text] != null) {
        navigate(result[text]);
      } else {
        return firebase.database().ref("go-links/public/"+text).once('value').then(function(snapshot) {
          if (snapshot.val() != null) {
            navigate(snapshot.val());
            chrome.storage.local.set({[text]: snapshot.val()});
          }
        });
      }
    });
  }
);

function navigate(url) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.update(tabs[0].id, {url: url});
    });
}