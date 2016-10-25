(function(){
  'use strict';
  var geoCodeApiCall;
  var streetAddressRaw;
  var cityRaw;
  var stateRaw;
  var zip;
  var state;
  var streetAddress;
  var city;
  var repName;
  var repTwitterId;
  var repChamber;
  var repDistrict;
  var repsInfo;
  var repContactForm;
  var issue;
  var thisThing = "54 99 52 53 50 57 101 49 57 51 98 48 101 53 57 98 57 54 50 52 102 99 97 55 52 50 53 101 97 98 55 57";
  var thatThing = "48 54 101 97 100 57 53 51 51 97 99 50 56 55 53 97 55 100 54 52 101 53 52 100 57 55 57 99 53 99 53 97";
  var xyz = "61 121 101 107 105 112 97";
  var displayRound = 0;
  var displayRoundFut = 0;
  
  
  $(document).ready(function(){
    intiApp();
    });
  
 function tweetAgainst(ia,ai) {
     $("#against"+ia).click(function(){
       var question = ai;
       issue = question.substring(0,60);
       window.open('http://twitter.com/share?url=https://codepen.io/cooksp53/full/vXvOYR/&text=@'+repTwitterId+' I want you to vote No on '+issue+'&', 'twitterwindow', 'height=450, width=550, top='+($(window).height()/2 - 225) +', left='+$(window).width()/2 +', toolbar=0, location=0, menubar=0, directories=0, scrollbars=0');
     }); 
 }

  function tweetFor(ib,bi) {
   $("#for"+ib).click(function(){
     var question = bi;
      issue = question.substring(0,60);
     window.open('http://twitter.com/share?url=https://codepen.io/cooksp53/full/vXvOYR/&text=@'+repTwitterId+' I want you you to Yes '+issue+'&', 'twitterwindow', 'height=450, width=550, top='+($(window).height()/2 - 225) +', left='+$(window).width()/2 +', toolbar=0, location=0, menubar=0, directories=0, scrollbars=0');
   });   
 }
  
  function voteSchedDisplay(az){
    $("#vote_rec_list"+displayRound).hide();
    $("#vote_sched_list"+displayRoundFut).show();
    
     if (az.results.length === 0) {
       $("#vote_sched_list"+displayRoundFut).prepend("<li>No votes scheduled.</li>");
     }       
     for (var i in az.results){
       var dateRaw = az.results[i].legislative_day;
       var newArr = dateRaw.split("-");
       var formattedDate = [newArr[1],newArr[2],newArr[0]];
       var dateOfVote =  formattedDate.join("/");
       $("#vote_sched_list"+displayRoundFut).prepend("<li class='list-group-item' id='vote_sched_entry'>"+dateOfVote+" <a href='https://google.com/#q="+az.results[i].context+"' id='get_more_info' target='_blank'>"+az.results[i].context+"</a> <a href='#' id='for"+i+"' ><span class='glyphicon glyphicon-thumbs-up'></span></a> <a href='#' id='against"+i+"'><span class='glyphicon glyphicon-thumbs-down'></span></a></li></br>");
       tweetFor(i,az.results[i].context);
        tweetAgainst(i,az.results[i].context);
     }  
  }
  
  
  function upcomingVotes(rc){  
    $("#upcoming_votes").on("click", function(){
      displayRoundFut++;
      $("#vote_rec_list"+displayRound).hide();
      $("#vote_rec").hide();
      $("#vote_sched").show();
      $("#upcoming_votes").hide();
      var callChamber = rc;
     var upcomingVotesApi = "https://congress.api.sunlightfoundation.com/upcoming_bills?chamber="+callChamber+"&order=scheduled_at&"+xyz+thatThing;
      $("#vote_sched").prepend("<div class='row'><h1 style='text-align: center;' id='headingfut"+displayRoundFut+"'>"+repName+" and the "+callChamber+" will vote</h1><ul class='col-xs-8 col-xs-offset-2 list-group' style='border-style: inset;border-width: 1em; height:20em; width:75%; overflow:hidden; overflow-y:scroll;' id='vote_sched_list"+displayRoundFut+"'></ul></div>");
      $.getJSON(upcomingVotesApi, function(xd){
          voteSchedDisplay(xd);
      });
   
    });
  }
  
  function backToReps(){
    $("#return_to_reps").on("click", function(){
      $("#vote_rec,#upcoming_votes,#contact,#return_to_reps").hide();  
      $("#vote_rec_list"+displayRound).hide();
      $("#vote_sched_list"+displayRoundFut).hide();
      $("#heading"+displayRound).hide();
      $("#headingfut"+displayRoundFut).hide();
      $("#launch_page").show();
      console.log("list", displayRound, displayRoundFut);
    });
  }
  
  function contactRep(){
    $("#contact").on("click", function(){
      window.open(repContactForm);
    })  
  }
  
  function tweetDislike(wa,wb) {
     $("#dislike"+wa).click(function(){
       var question = wb;
       issue = question.substring(0,60);
       window.open('http://twitter.com/share?url=https://codepen.io/cooksp53/full/vXvOYR/&text=@'+repTwitterId+' I disagree with you on '+issue+'&', 'twitterwindow', 'height=450, width=550, top='+($(window).height()/2 - 225) +', left='+$(window).width()/2 +', toolbar=0, location=0, menubar=0, directories=0, scrollbars=0');
     }); 
 }

  function tweetLike(qa,qb) {
   $("#like"+qa).click(function(){
     var question = qb;
      issue = question.substring(0,60);
     window.open('http://twitter.com/share?url=https://codepen.io/cooksp53/full/vXvOYR/&text=@'+repTwitterId+' I aggree with you on '+issue+'&', 'twitterwindow', 'height=450, width=550, top='+($(window).height()/2 - 225) +', left='+$(window).width()/2 +', toolbar=0, location=0, menubar=0, directories=0, scrollbars=0');
   });   
 }
  
 function voteRecDisplay(a){
    for (var i in a.objects){
      var dateRaw = a.objects[i].created;
      var dateChop = dateRaw.split("T");
      var dateString = dateChop[0].toString();
      var newArr = dateString.split("-");
      var formattedDate = [newArr[1],newArr[2],newArr[0]];
      var dateOfVote =  formattedDate.join("/");
      
      $("#vote_rec_list"+displayRound).append("<li class='list-group-item' id='vote_rec_entry'>"+dateOfVote+" "+a.objects[i].option.value+" on "+a.objects[i].vote.category +" of <a href='https://google.com/#q="+a.objects[i].vote.question+"' id='get_more_info' target='_blank'>"+ a.objects[i].vote.question+"</a> <a href='#' id='like"+i+"'><span class='glyphicon glyphicon-thumbs-up'></span></a> <a href='#' id='dislike"+i+"'><span class='glyphicon glyphicon-thumbs-down'></span></a></li></br>");
    tweetLike(i,a.objects[i].vote.question);
    tweetDislike(i,a.objects[i].vote.question);
    }
   
    upcomingVotes(repChamber);
    backToReps();
   contactRep();
    
  }
  
  function getRec(fn,ln,prt,id) {
    $("#launch_page").hide();
    $("#vote_rec").show();
    
    $("#main-display").prepend("<div class='col-xs-12 text-center'><button type='button' class='btn btn-default' id='upcoming_votes'>Upcoming Votes/Events</button></div>");
    
    $("#vote_rec").prepend("<div class='row'><h1 style='text-align: center;' id='heading"+displayRound+"'>"+fn+" "+ln+" ("+prt+") voted</h1><ul class='col-xs-8 col-xs-offset-2 list-group' style='border-style: inset;border-width: 1em; height:20em; width:75%; overflow:hidden; overflow-y:scroll;' id='vote_rec_list"+displayRound+"'></ul></div>");
    
    $("#vote_sched").after("<div class='col-xs-6 text-center'><button type='button' class='btn btn-default' id='return_to_reps'>back to reps list</button></div><div class='col-xs-6 text-center'><button type='button' class='btn btn-default' id='contact'>contact rep</button></div>");
    
    var getRecApi = "https://www.govtrack.us/api/v2/vote_voter/?person="+id+"&limit=1000&order_by=-created&format=json&fields=vote__id,created,option__value,vote__category,vote__chamber,vote__question,vote__number";// increase limit once display is set
    
    $.getJSON(getRecApi, function(data){
      voteRecDisplay(data);
      
    });//closing getJson 

  }
  
  function launchPage(x) {
    $("#setup_page").hide();
    $("#lanuch_page").show();
    var govTrackId;
    var role;
    var district;
    for (var i in x.results) {
      if (x.results[i].chamber == 'house'){
        district = x.results[i].district;
      }
    }
    $("#launch_page").prepend("<div class='col-xs-12 col-md-offset-2 col-md-8 text-center'><h1>you live in congressional district "+district+" for your state.</br>your house representative and senators are</h1></div>")
     $("#launch_page").append("<button type='button' class='btn btn-default' id="+x.results[0].govtrack_id+">"+"("+x.results[0].chamber+") "+x.results[0].first_name+" "+x.results[0].last_name+" "+x.results[0].party+"</button></br>"); 
      $("#"+x.results[0].govtrack_id).on("click",function(){
        displayRound++;
        repName = x.results[0].first_name+" "+x.results[0].last_name+" ("+x.results[0].party+")";
        repChamber = x.results[0].chamber;
        repTwitterId = x.results[0].twitter_id;
        govTrackId = x.results[0].govtrack_id;
        repContactForm = x.results[0].contact_form;
        getRec(x.results[0].first_name,x.results[0].last_name,x.results[0].party,govTrackId);
        $("#vote_rec_list"+displayRound-1).hide();
      });
    $("#launch_page").append("<button type='button' class='btn btn-default' id="+x.results[1].govtrack_id+">"+"("+x.results[1].chamber+") "+x.results[1].first_name+" "+x.results[1].last_name+" "+x.results[1].party+"</button></br>"); 
      $("#"+x.results[1].govtrack_id).on("click",function(){
        displayRound++;
        repName = x.results[1].first_name+" "+x.results[1].last_name+" ("+x.results[1].party+")";
        repChamber = x.results[1].chamber;
        repTwitterId = x.results[1].twitter_id;
        govTrackId = x.results[1].govtrack_id;
        repContactForm = x.results[1].contact_form;
        getRec(x.results[1].first_name,x.results[1].last_name,x.results[1].party,govTrackId);
        $("#vote_rec_list"+displayRound-1).hide();
      });
    $("#launch_page").append("<button type='button' class='btn btn-default' id="+x.results[2].govtrack_id+">"+"("+x.results[2].chamber+") "+x.results[2].first_name+" "+x.results[2].last_name+" "+x.results[2].party+"</button></br>"); 
      $("#"+x.results[2].govtrack_id).on("click",function(){
        displayRound++;
        repName = x.results[2].first_name+" "+x.results[2].last_name+" ("+x.results[2].party+")";
        repChamber = x.results[2].chamber;
        repTwitterId = x.results[2].twitter_id;
        govTrackId = x.results[2].govtrack_id;
        repContactForm = x.results[2].contact_form;
        getRec(x.results[2].first_name,x.results[2].last_name,x.results[2].party,govTrackId);
        $("#vote_rec_list"+displayRound-1).hide();
        $("#vote_sched_list"+displayRoundFut-1).hide();
      });
   
  }
  
  function getReps(xa,xb){
    thatThing = atari(thatThing);
    var repApiCall = "https://congress.api.sunlightfoundation.com/legislators/locate?latitude="+xa+"&longitude="+xb+"&"+xyz+thatThing;
    console.log(repApiCall);
    $.getJSON(repApiCall, function(list){
      repsInfo = list;
      launchPage(repsInfo); 
    }); 
  }
  
  
   function getGeoCode() {
   $("#submit").on("click",function (event) {
     
     streetAddressRaw = $('#street_address').val();
     cityRaw = $('#city').val();
     stateRaw = $('#state').val();
     zip = $('#zip').val();
     state = stateRaw.toLowerCase();
     streetAddress = streetAddressRaw.split(" ").join("%").toLowerCase();
     city = cityRaw.split(" ").join("%").toLowerCase();
     event.preventDefault();
      xyz = atari(xyz);
      thisThing = atari(thisThing);
      var geoCodeApiCall = "https://geoservices.tamu.edu/Services/Geocode/WebService/GeocoderWebServiceHttpNonParsed_V04_01.aspx?streetAddress="+streetAddress+"&city="+city+"&state="+state+"&zip="+zip+"&"+xyz+thisThing+"&format=json&allowTies=true&notStore=false&version=4.01";
     $.getJSON(geoCodeApiCall, function(d){
        getReps(d.OutputGeocodes[0].OutputGeocode.Latitude,d.OutputGeocodes[0].OutputGeocode.Longitude); 
      });//closing getJson  
     
    });
 }
  
  function atari(str){
  var arr = str.split(" ");
  var newArr = arr.reverse();
  var modArr = [];
    for (var i in newArr) {
      var x = parseInt(newArr[i]);
      modArr.push(String.fromCharCode(x));
    }
  var newStr = modArr.join("");
  return newStr;
}
  
function intiApp() {
  $("#main-display").append('<div class="col-xs-12 center-block" id="setup_page"><h1 style="text-align: center;">enter your voting address</br> to see your </br>representatives in congress</h1><form class="col-xs-12  col-md-offset-2 col-md-8"><div class="form-group col-xs-8"><label for="street_address">Street address</label> <input type="text" class="form-control" id="street_address" placeholder="123 Place Street"></div><div class="form-group col-xs-4"><label for="apt_num">Apt</label><input type="text" class="form-control" id="apt_num" placeholder="Apt number"> </div><div class="form-group col-xs-4"><label for="city">City</label><input type="text" class="form-control" id="city" placeholder="City"></div><div class="form-group col-xs-4"><label for="state">State</label><input type="text" class="form-control" id="state" placeholder="State"></div><div class="form-group col-xs-4"><label for="zip">Zip</label><input type="text" class="form-control" id="zip" placeholder="54321"></div><div class="text-center"><button type="submit" class="btn btn-default" id="submit">Submit</button></div></form></div>');  
  $("#main-display").append("<div class='col-xs-12 center-block text-center' id='launch_page'></div>");
  $("#main-display").append("<div class='col-xs-12 center-block' id='vote_rec'></div>");
  $("#main-display").append("<div class='col-xs-12 center-block' id='vote_sched'></div>");
  getGeoCode();
}
  
})();

