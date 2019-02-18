$(document).ready(function() {
  // $("#preview").resizable({
  //   alsoResize: "#resizable-editor",
  //   handles: "w",
  // });
  editor = ace.edit('editor');
  $( "#resizable-editor" ).resizable({
    minWidth:100,
    resize: function( event, ui ) {
      editor.resize();
      console.log("resize resizable editor")
    },
    handles:"e"
  });
  $("#mirador-viewer").resizable({
    alsoResize: "#xml-wrapper",
    minWidth:100,
    resize: function(event,ui){
      $(".workspace-container .layout-slot").height("100%");
      console.log("resize");
    },
  })
});
