// Grab search field
var port = chrome.extension.connect({
     name: "Com"
});
var input = document.getElementById('input');
function req_download(event){
  port.postMessage({"message":"download_url", "url": event.data.url});
}
// Listen for text input event
input.addEventListener("keyup", filterNames);
// filterNames function
function filterNames() {
    // Grab input value
    var inputValue = document.getElementById('input').value.toUpperCase();
    // Grab names UL
    var ul = document.getElementById('names');
    // Grab name items
    var li = document.querySelectorAll('li.nameItem');
    for(var i = 0; i < li.length; i++) {
        // Grab each 'a' element
        var a = li[i].getElementsByTagName('a')[0];
        if (a.innerHTML.toUpperCase().indexOf(inputValue) > -1) {
            li[i].style.display = '';
        } else {
            li[i].style.display = 'none';
        }
    }
}
port.onMessage.addListener(function(msg) {
  if(msg.message == "files"){
    msg.data.forEach(function(file){
      var newFileli = $('<li class="nameItem"><a href="#">'+file.name+'</a></li>').click({url: file.url}, req_download );;
      $('ul').append(newFileli);
    });
  }
});
$('#download_all').on( "click", function() {
  $("#download_all").text("Downloading...DO NOT TOUCH");
  port.postMessage({"message":"download_all"});
});
port.postMessage({"message":"req_files"});
