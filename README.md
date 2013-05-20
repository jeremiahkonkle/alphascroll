AlphaScroll
=======================
see [Original Git](https://github.com/kregwallace/alphascroll) for more information.
An indexed scrollbar plugin for jQuery Mobile
___

AlphaScroll adds an alphabetized scrolling widget to jQuery Mobile listviews that contain autodividers. The widget addresses the difficulty of quickly scrolling large lists on small mobile device screens.

A [working demo](http://www.designkode.com/demos/alphascroll/) is available and you can read a bit more about this project [here](http://www.designkode.com/blog/alphascroll-jquery-mobile).

##Uses

AlphaScroll is for use on jQuery Mobile listviews that are alphabetically sorted and include autodividers: `data-autodividers="true"`.

AlphaScroll responds to orientation change events to display a shortened list of letters when in landscape mode or when the screen has a height of less than 320 pixels.

##Setup

First, include the AlphaScroll CSS and JavaScript files in your HTML:

```html
<link rel="stylesheet" type="text/css" href="css/jquery.mobile.alphascroll.css" />
<script type="text/javascript" src="js/jquery.mobile.alphascroll.js"></script>
```

Create your listview as you normally would. In the demo, I take an array of names, sort it and then after looping through the array to build a set of `<li>` list items, append the list items to an unordered list that has its data-autodividers and data-alphascroll attributes set to true:

```html
<ul id="mylistview" data-role="listview" data-autodividers="true" data-alphascroll="true"></ul>
