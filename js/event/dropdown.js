///* When the user clicks on the button,
//toggle between hiding and showing the dropdown content */
//function myFunction() {
//    document.getElementById("myDropdown ").classList.toggle("show ");
//}
//
//// Close the dropdown if the user clicks outside of it
//window.onclick = function(event) {
//  if (!event.target.matches('.dropbtn')) {
//
//    var dropdowns = document.getElementsByClassName("dropdown-content ");
//    var i;
//    for (i = 0; i < dropdowns.length; i++) {
//      var openDropdown = dropdowns[i];
//      if (openDropdown.classList.contains('show')) {
//        openDropdown.classList.remove('show');
//      }
//    }
//  }
//};
$(function () {
  'use strict';
  $('.ba-dropbtn').on('click', function (e) {
    $('#'+e.target.id+'.ba-dropdown-content').toggleClass("ba-show");
  });
});
window.onclick = function (event) {
  if (!event.target.matches('.ba-dropbtn')) {
    var dropdowns = document.getElementsByClassName("ba-dropdown-content ");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('ba-show')) {
        openDropdown.classList.remove('ba-show');
      }
    }
  }
};
