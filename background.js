var files = [];
var  module_name = "Module";
function getFileUrl(url){
  $().ready(function () {
    $.ajax(
      {
        url: url + "&redirect=1",
        type: 'GET',
        complete: function(e, xhr, settings){
          if(e.status != 200){
            alert(e.responseText);
          }else{
            alert(e.responseText);
          }
        }
      });
 });
}
function download_all(){
  files.forEach(function(file){
    //determine file name
    $.ajax({
      type: "POST",
      url: file.url,
      success: function(html)
      {
        //alert(module_name+"/"+$(html).find(".resourceworkaround").find("a").text());
         chrome.downloads.download({url: file.url + "&redirect=1", filename:module_name+"/"+$(html).find(".resourceworkaround").find("a").text()});
      }
    });
  });
}
function download_url(url_){
  chrome.downloads.download({url: url_ + "&redirect=1"});
}
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "on_keats_page" ) {
      chrome.browserAction.setBadgeText({text: '...'});
      files = [];
    }
    if( request.message === "files_found" ) {
      chrome.browserAction.setBadgeText({text: request.data});
      files.push(request.file);
    }
    if( request.message === "module_name" ) {
      //alert(request.data);
      module_name = request.data.replace(/[^\w\s]/gi, '')
    }
  }
);
//Off events, these are for when user might have left keats
chrome.tabs.onUpdated.addListener(function
  (tabId, changeInfo, tab) {
    // read changeInfo data and do something with it (like read the url)
    if (changeInfo.url) {
      chrome.browserAction.setBadgeText({text: ''});
    }
  }
);
chrome.tabs.onActivated.addListener(function(activeInfo) {
    chrome.browserAction.setBadgeText({text: ''});
});
chrome.extension.onConnect.addListener(function(port) {
     console.log("Connected .....");
     port.onMessage.addListener(function(msg) {
       if(msg.message=="req_files"){
         port.postMessage({ "message" : "files", "data" : files});
       }
       if(msg.message=="download_url"){
         download_url(msg.url)
       }
       if(msg.message=="download_all"){
         download_all();
       }
     });
})
