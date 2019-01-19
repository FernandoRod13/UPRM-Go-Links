function addLink(data) {
    var url = data['url'].value;
    var key = data['key-word'].value;
    var message = "url: " + url + " key: " + key;
    alert(message);
    return false;
}