global.jQuery = require('jquery');
var $ = global.jQuery;

import Util from "./Util.js";
import Recent from "./Recent.js";
import Open from "./Open.js";

var Compare = {
  GitHubDocs: {},
  addStacked: function(doc){
    var docUrl = Util.apiBaseUrl + doc.url;
    Util.retrieveAPIData(docUrl).done(function(data){
      if(data !== undefined){
        console.log(data);
        Compare.GitHubDocs[data.name] = data;
        console.log(Compare.GitHubDocs);
        var ghtext = $(Util.parseXMLContent(data)).text();
        ghtext = ghtext.replace(/(\r\n|\n|\r)/gm," ");
        ghtext = ghtext.replace(/  +/g, ' ');
        var content = [
          '<div id="' + data.name + '_textarea' + '" class="ms-textarea-wrapper">\n',
          '<div id="' + data.name + '_textarea_title' + '" class="ms-textarea-title">' + data.name + '\n',
          //'<a href="#" id="' + data.name + '_toggle' + '" class="toggle-ms-display-type">TEI</a></div>\n',
          '<textarea class="ms-textarea">',
          //$(Util.parseXMLContent(data)).text(),
          ghtext,
          '</textarea>'].join('');
        var compareWrapper = $('#compare-wrapper');
        compareWrapper.append(content);
      }
    });
  },
  createStack: function(docs){
    console.log("createStack called");
    console.log(docs);
    var sPath= window.location.pathname;
    var sPage = sPath.substring(sPath.lastIndexOf('/') + 1);
    if(sPage == "compare.html"){
      for(var i = 0; i < docs.length; i++){
        Compare.addStacked(docs[i]);
      }
    }
  },
  resetCompareDocs: function(){
    Util.setCompareDocs(customSettings.compareDefaultDoc);
    //wipe stack
    //create stack
  },
  toggleMsDisplayType: function(){
    //$(Util.parseXMLContent(data).text());
    console.log("clicked");
    console.log(e);
  }
};

export default Compare;
// import Compare from "./Compare.js";
// $(document).ready(function() {
//   console.log(Util.compareDocs);
//   //alert(_this.compareDocs);
//   var sPath= window.location.pathname;
//   var sPage = sPath.substring(sPath.lastIndexOf('/') + 1);
//   if(sPage == "compare.html"){
//     Compare.createStack(Util.compareDocs);
//   }
// });
