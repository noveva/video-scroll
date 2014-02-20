$( document ).ready(function() {

/*
STEP 1: put the id of your video element here 
*/
var video = $("#demo");


/*
STEP 2: displaying elements at certain time of video playback  
*/

var info = [];
// fill your data in the left side
// the format [elementID,secondToDisplay, secondToHide]
info[0] = [info1, 1,4];
info[1] = [info2, 5,8];
//to add more elements just uncommen
// info[2] = [elementID,secondToDisplay, secondToHide];
// info[3] = [elementID,secondToDisplay, secondToHide];
// info[4] = [elementID,secondToDisplay, secondToHide];


/*
STEP 3: start and end messages setup,
to remove this functionality delete the function displayStartEnd() and references to it
*/
$(video).after("<p id='start' class='message'>Scroll to play the video <br/> &#8744;&#8744;&#8744;</p>");
$(video).after("<p id='end' class='message'>&#8743;	&#8743;	&#8743;<br/>Video ended, scroll backwards</p>");

/*
do not change!! css properties, needed for the plugin to work
*/

// inserts scroll elements needed for the plugin to work
$("<div></div>").addClass("innerElement").insertAfter(video);
$(".innerElement").wrap("<section class='outerElement'></section>");
var contents = $(".innerElement");
var scrollObj =$(".outerElement");
// this line hides all text you want to display with the video
for (var i = 0; i < info.length; i++) {
	$(info[i][0]).hide();
}//for loop

$(info).hide();
// video setup
video[0].volume = 0;
var videoHeight = video.height();
//outer object setup
scrollObj.css("height", videoHeight);


/*
the actual plugin starts here
*/
//we need to make sure metadata (including video duration) is loaded
video[0].addEventListener('loadedmetadata', startScroll , false);

//displays start and end messages
function displayStartEnd(full){
	if ( full < 1 && full >= 0 ){
		$("#start").fadeIn('fast');
		$('#end').hide();
	}
	else if (full >= Math.ceil(video[0].duration - 1) || 
		full == Math.ceil(video[0].duration)){
		$("#end").fadeIn('fast');
	}else{$("#start, #end").fadeOut('slow');}

}

// defines when to display what information
function displayInfo(full){
	for (var i = 0; i < info.length; i++) {
		if ( full > info[i][1] && full < info[i][2] ) {
			$(info[i][0]).fadeIn("slow");
		}else {$(info[i][0]).fadeOut("slow");	}//else
	}//for loop
}// displayInfo

function displayProgress(){
	var progress = $("#progress");
	var percent = (video[0].currentTime*100)/video[0].duration;
	progress.css('width', percent + "%");
	if (video[0].duration - video[0].currentTime < 0.5){progress.css('width', 100 + "%");}
}

//links video playback to scroll
function startScroll(){
	// retrieve video duration and parse it into a round number
	var duration = parseInt(video[0].duration,10);
	//inner object setup
	contents.css("height", videoHeight*(duration*0.3));
	var contentsHeight = contents.height();
	// setup array obj to store scrollbar positions
	var scrollPos = [];
	//store current time used to trigger other elements
	var full = Math.ceil(video[0].currentTime); 	
	displayStartEnd(full);
	displayInfo(full);
	//create a progress bar
	$(video).after("<div id='progress'></div>");

	// links scroll movement to video playback
	$( scrollObj ).scroll(function() {
		clearTimeout(myVar);
		// fills the array with data on scrollbar posision
	  	var current = scrollObj.scrollTop();
	  	var length = scrollPos.push(current);
	  	//start the playback
	  		// limits playbackRate to 8 (higher values cause troubles)
	  		var difference = scrollPos[length-1] - scrollPos[length-2];
	  		var full = Math.ceil(video[0].currentTime);
	  		//call the info to be displayed
			displayInfo(full);
			displayStartEnd(full);
			//displays the progress bar
	  		displayProgress();
	  		var support = video[0].canPlayType('video/ogg; codecs="theora, vorbis"');
	  		//play video foreward
	  		if (0 <= difference){
	  			var speedPos = (duration<10)?Math.min(difference,2):Math.min(difference,8);
	  			if (support == "probably"){
	  				video[0].playbackRate = speedPos ;
  					video[0].play();
	  			}else{
	  				video[0].currentTime += 0.01*speedPos;
	  			}
  				// puts the scrollbar up to allow further scrolling
  				if (current >= contentsHeight-videoHeight && video[0].duration - video[0].currentTime > 1 ){
  					scrollObj.scrollTop(10);
  				}
  				if (video[0].duration - video[0].currentTime < 0.5){
  					scrollObj.scrollTop(contentsHeight-videoHeight);
  					full = 1;
  				} // end check if video ended
	  		} //end if
	  		//play video backward
	  		else {
	  			//the speed is a negative value, so frames are playing bkw
	  			var speedNeg=(duration<10)?Math.max(difference,-3):Math.max(difference,-8);
	 			video[0].currentTime += 0.01*speedNeg;
	 			// puts the scrollbar down to allow further scrolling
	  			if (current < 10 && video[0].currentTime > 0.5){
  					scrollObj.scrollTop(contentsHeight-videoHeight-32);
  				} 
  				// returns the scrollbar to top once there's no video to play
  				else if ( video[0].currentTime === 0.0 ) {
  					scrollObj.scrollTop(0);
  					//video[0].currentTime == 0.0;
  				}
	  		}// end else if	  	
	  	
	  	//stops playback if no scroll
	  	var myVar = setTimeout(
	  		function(){ video[0].pause();},300);
	});// end scroll event function
}//end startScroll


}); //end document ready