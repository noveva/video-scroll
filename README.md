Video-scroll experiment
============
And here comes the link to a [live demo](http://plugin.nataliasoloveva.com "Bouncing ball madness")
> Because a live demo is worth more than a thousand lines of explanation.

# Overview
This project was supposed to be a jQuery plugin allowing to control video playback by scroll. Thus, there are two consequences: 
- no jQuery link in the head tag - no fun with scrolling video playback.
- no converted video in .ogv , .mp4 and .webm  formats (yes, this means three video files, you got that correct) - no fun with scrolling video playback in some browsers.

# Features
The plugin has three main features:
- link video playback to scroll movement;
- show progress of video playback with a progress bar on top of the screen;
- displays text or other elements at certain moments of video playback.

# Structure
There are two files you need to make it work:
- video.js: responsible for all the functionality, don't forget to link your video to that file.
- video.css: created to enable you choose one of the two modes how to display the video: as a background-video
or a the user might choose to customize it himself.
