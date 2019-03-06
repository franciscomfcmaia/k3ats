chrome.runtime.sendMessage({"message": "on_keats_page"});
var files = [];
$( document ).ready(function() {
  var links = 0;
  $('[itemprop="url"]').each(function(i,obj){
    if(typeof $(obj).attr('title') !== "undefined" && typeof $(obj).attr('title') === "string"){
      chrome.runtime.sendMessage({"message": "module_name", data: $(obj).attr('title')});
    }
  })
  $('a').each(function(i, obj) {
      //test
      if(typeof $(obj).attr('href') !== "undefined"){
        if($(obj).attr('href').includes("resource")){
          links = links + 1;
          chrome.runtime.sendMessage({"message": "files_found", "data" : links.toString(), "file": {"name": $(obj).text(), "url" : $(obj).attr('href')} });
          //getFileUrl($(obj).attr('href'));
          files.push({"name": $(obj).text(), "url" : $(obj).attr('href')});
          //console.log(files);
        }
      }
  });
});
