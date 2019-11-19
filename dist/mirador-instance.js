
$(document).ready(function(){
var mir = Mirador({
          "id": "mirador-viewer",
          "layout": "1x1",
          'mainMenuSettings': {
            'show': false
          },
          'preserveManifestOrder' : true,
          'openManifestsPage' : true,
          //"buildPath": "mirador-2.4/",
          'buildPath': 'mirador-2.7/',
	  "data" : [
	      {"manifestUri": "https://digital-editing.fas.harvard.edu/manifests/Latin-A"},
              {"manifestUri": "https://digital-editing.fas.harvard.edu/manifests/Latin-B"},
              {"manifestUri": "https://digital-editing.fas.harvard.edu/manifests/Latin-C"},
              {"manifestUri": "https://digital-editing.fas.harvard.edu/manifests/B1"},
              {"manifestUri": "https://digital-editing.fas.harvard.edu/manifests/B2"},
              {"manifestUri": "https://digital-editing.fas.harvard.edu/manifests/D"},
              {"manifestUri": "https://digital-editing.fas.harvard.edu/manifests/G"},
              {"manifestUri": "https://digital-editing.fas.harvard.edu/manifests/K1"},
              {"manifestUri": "https://digital-editing.fas.harvard.edu/manifests/K2"},
              {"manifestUri": "https://digital-editing.fas.harvard.edu/manifests/N"},
	      {"manifestUri": "https://digital-editing.fas.harvard.edu/manifests/S"}
          ],
    'windowSettings' : {
	"availableViews" : ['ThumbnailsView', 'ImageView'],
	"sidePanel" : false,
	"bottomPanelVisible" : false,
	"canvasControls": { // The types of controls available to be displayed on a canvas
	    "annotations" : {
		"annotationLayer" : false
	    }
	},
	"fullScreen" : false, 
	"displayLayout" : true, 
	"layoutOptions" : {
	    "newObject" : true,
	    "close" : true,
	    "slotRight" : false,
	    "slotLeft" : false,
	    "slotAbove" : false,
	    "slotBelow" : false,
	}
	
    },
        });
});
