//style import
import './styles/style.scss';

global.jQuery = require('jquery'), require("jquery-ui");
//var resizable = require("jquery-resizable");
var $ = global.jQuery;

import App from "./components/Main.js";


var customSettings = {
  recommendedRepos: [
    {
      name: "Simple TEI Edition",
      description: "A simple repository with a template index.xml file connected CETEI.js to allow for an easy web rendering. Using a 'gh-pages' branch to immediately publish your index.xml file on the web at http://[yourusername>].github.io/simple-tei-edition",
      url: "https://api.github.com/repos/scta/simple-tei-edition"
    },
    {
      name: "Mary Magdalene",
      description: "The goal of this project is of a twofold nature: in terms of research results, it will create an interactive online edition of a medieval Mary Magdalene legend transmitted in the Lower Rhine area; in terms of teaching practice, it will train graduate and undergraduate students in palaeography, editing, and coding.",
      url: "https://code.harvard.edu/rak772/MaryMagdalene"
    }
  ],
  previewStyles:[
    {
      description: "default preview styling",
      name: "default"
    },
    {
      name: "lbp-1.0.0-critical",
      description: "A customized styling for xml docs created to comply with the LombardPress-1.0.0-Critical customized TEI Schema"
    }
  ],
  apiBaseUrl : "https://code.harvard.edu/api/v3/",
  baseUrl: "https://code.harvard.edu/",
  helpUrls:[
    {
      name: "Test Help File",
      description:"",
      url: "repos/rak772/MaryMagdalene/contents/help.md",
      display: "md"
    },
    {
      name: "The LombardPress Schema",
      description: "",
      url: "http://lombardpress.org/schema/docs/",
      display: "iframe"
    }
  ],
  hidePreviewStyles: true,
  hideSuggestedRepos: false,
  hideForkAnotherRepo: true,
  hidePR: true,
  //options: vertical-stack, side
  compareDefaultStyle: "vertical-stack",
  compareDefaultDocs: [
    {
      url: "repos/rak772/MaryMagdalene/contents/manuscript_B1_JennyKoerber.xml?ref=manuscript_B1_JennyKoerber"
    },
    {
      url: "repos/rak772/MaryMagdalene/contents/manuscript_B2_HansPech.xml?ref=manuscript_B2_HansPech"
    },
    {
      url: "repos/rak772/MaryMagdalene/contents/manuscript_D_AnnaKelner.xml?ref=manuscript_D_AnnaKelner"
    },
    {
      url: "repos/rak772/MaryMagdalene/contents/manuscript_G_EleanorGoerss.xml?ref=manuscript_G_EleanorGoerss"
    },
    {
      url: "repos/rak772/MaryMagdalene/contents/manuscript_K1_ZacharyHayworth.xml?ref=manuscript_K1_ZacharyHayworth"
    },
    {
      url: "repos/rak772/MaryMagdalene/contents/manuscript_K2_EleanorGoerss.xml?ref=manuscript_K2_EleanorGoerss"
    },
    {
      url: "repos/rak772/MaryMagdalene/contents/ manuscript_N_RobertRoessler.xml?ref=manuscript_N_RobertRoessler"
    },
    {
      url: "repos/rak772/MaryMagdalene/contents/ manuscript_N_SusanneZwierlein.xml?ref=manuscript_N_SusanneZwierlein"
    },
    {
      url: "repos/rak772/MaryMagdalene/contents/manuscript_S_RachaKirakosian.xml?ref=manuscript_S_RachaKirakosian"
    }
  ]
}

//preview styles currently have to select from supported options of which there are currently tei-keywords
// default and lbp-1.0.0-critical
// supported styles can be added by adding a css style sheet in dist/xmlstyles where the file named after the style name.
// and corresponding <link> element needs to be added to the index.html file
// required js event bindings for a given style currently need to be added to the Preview.js file.




$(document).ready(function(){
  var appInstance = App.init(customSettings);
});
