$(document).ready(function() {
  // $("#preview").resizable({
  //   alsoResize: "#resizable-editor",
  //   handles: "w",
  // });
  editor = ace.edit('editor');

  var maxWidth = $("#xml-wrapper").width() - 100;
  $( "#resizable-editor" ).resizable({
    minWidth:100,
    maxWidth: maxWidth,
    resize: function( event, ui ) {
      editor.resize();
    },
    handles:"e",
    //alsoResize: "#preview"
  });
  $("#mirador-viewer").resizable({
    alsoResize: "#xml-wrapper",
    minWidth:100,
    resize: function(event,ui){
      $(".workspace-container .layout-slot").height("100%");
    },
  })
});
