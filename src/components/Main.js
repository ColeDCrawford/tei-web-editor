//vendor imports
import Octokat from "octokat";
var base64 = require('base-64');
var ace = require('brace');
require('brace/mode/xml');
require('brace/theme/kuroir');
global.jQuery = require('jQuery');
var $ = global.jQuery;
require('bootstrap-loader');

//component imports
import Renderer from "./Renderer.js";
import Doc from "./Doc.js";
import Recent from "./Recent.js";
import Util from "./Util.js";
import Repo from "./Repo.js";
import SaveAs from "./SaveAs.js";
import Open from "./Open.js";
import Pr from "./Pr.js";


var access_token = window.location.hash.substring(7);
var aceEditor;


var Main = {
  init: function(){
  console.log(access_token)
  aceEditor = ace.edit("editor");
  aceEditor.setTheme("ace/theme/kuroir");
  aceEditor.session.setMode("ace/mode/xml");
  aceEditor.session.setOptions({
    tabSize: 2,
    useSoftTabs: true
  });
  aceEditor.setShowInvisibles(true);
  this.bindEventHandlers();
  Util.loadTemplateText();
},
bindEventHandlers: function(){
  var _this = this;
  //This events need to be organized somehow perhaps just with better commenting.

  // load empty template onload


  aceEditor.on('change', function() {
    var newText = Renderer.tei_conversion(aceEditor.getValue(), function(data){
    });
    //console.log(newText);
    $("#preview").html(newText);
  });

  //load empty template
  $(document).on("click","#file-new", function(){
    Util.undarken();
    $('.file-window').removeClass("visible")
    Util.loadTemplateText();
  });

  $(document).on("click", "#toggle-mirador", function(){
    $('#mirador-viewer').slideToggle();
  });
  $(document).on("click", "#toggle-preview", function(){
    if ($('#preview').is(':visible')){
      $("#editor").animate({"width": "100%"})
      $('#preview').slideToggle();
      if (!$('#editor').is(':visible')){
        //mirador toggle is buggy because the styling doesn't adjust until the window is adjusted
        $("#mirador-viewer").animate({"height": "100%"})
      }
    }
    else{
      $("#editor").animate({"width": "50%"})
      //mirador toggle is buggy because the styling doesn't adjust until the window is adjusted
      $("#mirador-viewer").animate({"height": "40%"})
      $('#preview').slideToggle();
    }
  });
  $(document).on("click", "#toggle-editor", function(){
    if ($('#editor').is(':visible')){
      $("#preview").animate({"width": "100%"})
      $('#editor').slideToggle();
      if (!$('#preview').is(':visible')){
        //mirador toggle is buggy because the styling doesn't adjust until the window is adjusted
        $("#mirador-viewer").animate({"height": "100%"})
      }
    }
    else{
      $("#preview").animate({"width": "50%"})
      //mirador toggle is buggy because the styling doesn't adjust until the window is adjusted
      $("#mirador-viewer").animate({"height": "40%"})
      $('#editor').slideToggle();
    }
  });
  // open pr review dialogue box
  $(document).on("click", "#file-pr", function(){
    Util.darken();
    $('.file-window').removeClass("visible")
    $('#pull-request-viewer').addClass("visible")
    Pr.displayPullRequestInfo();
  });
  $(document).on("click", "#submit-pull-request", function(){
    var currentRepo = $("#current").attr("data-repo");
    var currentBranch = $("#current").attr("data-branch");
    var targetRepo = $("#target").attr("data-repo");
    var targetBranch = $("#target").attr("data-branch");
    Pr.submitPullRequest(currentRepo, currentBranch, targetRepo, targetBranch);
  });
//open repository list
  $(document).on("click",".file-open-dir", function(){
    Util.darken();
    $('.file-window').removeClass("visible")
    $('#breadcrumbs').empty();
    $("#repositories").empty();
    $('#dir').addClass("visible");
    var url = "https://api.github.com/user/repos"
    console.log(access_token);
    Open.displayOpenRepoList(url, access_token);
  });
//open save dialogue box
  $(document).on("click","#file-open-save", function(){
    $('.file-window').removeClass("visible");
    var url = "https://api.github.com/user/repos";
    SaveAs.displaySaveAsRepoList(url, access_token);
    Util.darken();
    $('#save').addClass("visible");

  });
  //opens list of branches in save as window
  $(document).on("click", ".file-open-save-as-repo", function(){
    var url = $(this).attr("data-url");
    var repo = url.split("https://api.github.com/repos/")[1];
    Util.clearSaveParameters();
    $("#repo").val(repo);
    var path = $("#path").val().length > 0 ? $("#path").val() + "/" : "";
    $("#save-url").html("https://api.github.com/repos/" + $("#repo").val() + "/contents/" + path + $("#file-name").val() + "?ref=" + $("#branch").val());
    SaveAs.displaySaveAsRepoBranchList(url, access_token);
  });
  //opens top level tree in saveAs window for a given repo branch
  $(document).on("click", ".file-open-save-as-branch", function(){
    var url = $(this).attr("data-url");
    var branch = $(this).attr("data-branch");
    var branchSha = $(this).attr("data-branch-sha");
    $("#branch").val(branch);
    $("#sha").val(branchSha);
    var path = $("#path").val().length > 0 ? $("#path").val() + "/" : "";
    $("#save-url").html("https://api.github.com/repos/" + $("#repo").val() + "/contents/" + path + $("#file-name").val() + "?ref=" + $("#branch").val());
    //retrieveDirectoryCommits(url, access_token)
    //retrieveRepoTree(url, access_token, branch, branchSha);
    SaveAs.displaySaveAsTree(url, branch, branchSha, access_token);
  });
  $(document).on("click", ".file-open-save-as-path", function(){
    var url = $(this).attr("data-url");
    var branch = $(this).attr("data-branch");
    var branchSha = $(this).attr("data-branch-sha");
    var path = $(this).attr("data-path");
    var path = $("#path").val().length > 0 ? $("#path").val() + "/" : "";
    $("#save-url").html("https://api.github.com/repos/" + $("#repo").val() + "/contents/" + path + $("#file-name").val() + "?ref=" + $("#branch").val());

    //retrieveDirectoryCommits(url, access_token)
    //retrieveRepoTree(url, access_token, branch, branchSha);
    SaveAs.displaySaveAsTree(url, branch, branchSha, access_token);
  });
  $(document).on("input", "#repo", function(e){
    var path = $("#path").val().length > 0 ? $("#path").val() + "/" : "";
    $("#save-url").html("https://api.github.com/repos/" + $("#repo").val() + "/contents/" + path + $("#file-name").val() + "?ref=" + $("#branch").val());
  });
  $(document).on("input", "#path", function(e){
    var path = $("#path").val().length > 0 ? $("#path").val() + "/" : "";
    $("#save-url").html("https://api.github.com/repos/" + $("#repo").val() + "/contents/" + path + $("#file-name").val() + "?ref=" + $("#branch").val());
  });
  $(document).on("input", "#file-name", function(e){
    var path = $("#path").val().length > 0 ? $("#path").val() + "/" : "";
    $("#save-url").html("https://api.github.com/repos/" + $("#repo").val() + "/contents/" + path + $("#file-name").val() + "?ref=" + $("#branch").val());
  });
  $(document).on("input", "#branch", function(e){
    var path = $("#path").val().length > 0 ? $("#path").val() + "/" : "";
    $("#save-url").html("https://api.github.com/repos/" + $("#repo").val() + "/contents/" + path + $("#file-name").val() + "?ref=" + $("#branch").val());
  });
  // open file events
  //open file from direct url list
  $(document).on("click",".file-open-file", function(){
    var url = $(this).attr("data-url");
    $('.file-window').removeClass("visible");
    Util.undarken();
    Util.loadText(url, access_token)
  });
// open file from input url
  $("#file-manual").submit(function(e){
    e.preventDefault();
    $('.file-window').removeClass("visible");
    Util.undarken();
    var url = $(this).find("#manual-url").val();
    Util.loadText(url, access_token)
  });
  //open file from directory list
  $(document).on("click",".file-open-file-list", function(){
    var path = $(this).attr("data-path");
    var branch = $(this).attr("data-branch");
    var branchSha = $(this).attr("data-branch");
    var repo = $(this).attr("data-repo");
    var url = "https://api.github.com/repos/" + repo + "/contents" + path + "?ref=" + branch;
    $('.file-window').removeClass("visible");
    Util.undarken();
    Recent.set(url);
    Util.loadText(url, access_token)
  });
  //directory or repo opening events
  //open respository from branch and display top level tree contents
  $(document).on("click", ".file-open-branch", function(){
    var url = $(this).attr("data-url");
    var branch = $(this).attr("data-branch");
    var branchSha = $(this).attr("data-branch-sha");
    var repo = url.split("https://api.github.com/repos/")[1];
    //retrieveDirectoryCommits(url, access_token)
    Open.displayOpenTree(url, access_token, branch, branchSha, "", repo);
  // select repo and liste available branches
  });
  $(document).on("click", ".file-open-repo", function(){
    var url = $(this).attr("data-url");
    var branch = $(this).attr("data-branch");
    Open.displayOpenRepoBranchList(url, access_token);

  });
  $(document).on("click", ".create-fork", function(){
    var url = $(this).attr("data-url");
    var repo = url.split("https://api.github.com/repos/")[1];
    Open.createOpenFork(repo, access_token);
  });
  //display contents of a git tree
  $(document).on("click",".file-open-tree", function(){
    var url = $(this).attr("data-url");
    var path = $(this).attr("data-path");
    var branch = $(this).attr("data-branch");
    var branchSha = $(this).attr("data-branch-sha");
    var repo = $(this).attr("data-repo");
    Open.displayOpenTree(url, access_token, branch, branchSha, path, repo);
  });
  $(document).on("submit", "#create-new-branch", function(e){
    e.preventDefault();
    var branchName = $(e.target).find("#branch").val();
    var repo = $(e.target).find("#repo").val();
    var branchSourceSha = $(e.target).find("#branch-source-sha").val();
    Open.createNewOpenBranch(repo, branchName, branchSourceSha, access_token);
  });
  $(document).on("submit", "#create-new-save-as-branch", function(e){
    e.preventDefault();
    var branchName = $(e.target).find("#branch").val();
    var repo = $(e.target).find("#repo").val();
    var branchSourceSha = $(e.target).find("#branch-source-sha").val();
    //displaySaveAsTree(url, branch, branchSha, access_token);
    SaveAs.createNewSaveAsBranch(repo, branchName, branchSourceSha, access_token);
  });
  $(document).on("submit", "#create-new-repo", function(e){
    e.preventDefault();
    var name = $(e.target).find("#new-repo-name").val();
    SaveAs.createNewRepo(name);
  });

  $("#editor-wrapper").on("click", function(){
    $(".file-window").removeClass("visible");
    Util.undarken();
  });

  $("#save-form").submit(function(e){
    e.preventDefault();
    var textContent = aceEditor.getValue();
    var content = base64.encode(textContent);

    var url = $(this).find("#save-url").text();
    var branch = $(this).find("#branch").val();
    var sha = $(this).find("#sha").val();
    var message = $(this).find("#message").val();

    var commit_data = {
      "path": url,
      "message": message,
      "content": content,
      "sha": sha,
      "branch": branch
    }
    SaveAs.saveFile(url, commit_data, access_token);
  });
  }
  //end of event handling functions
}
export default Main;
