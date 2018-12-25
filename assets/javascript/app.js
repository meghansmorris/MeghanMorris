require("dotenv").config(); 
var keyInfo = require("./keys.js");


(function($) {
    "use strict"; // Start of use strict
  
    // Smooth scrolling using jQuery easing
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
      if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
          $('html, body').animate({
            scrollTop: (target.offset().top - 54)
          }, 1000, "easeInOutExpo");
          return false;
        }
      }
    });

  
    // Hide navbar when modals trigger
    $('.portfolio-modal').on('show.bs.modal', function(e) {
      $('.navbar').addClass('d-none');
    })
    $('.portfolio-modal').on('hidden.bs.modal', function(e) {
      $('.navbar').removeClass('d-none');
    })
  
  })(jQuery); // End of use strict


    // Initialize Firebase
    var config = keyInfo.firebase;
  
    firebase.initializeApp(config);

  //Reference messages collection
  var messagesRef = firebase.database().ref("messages");

  //Event listener for form event
  document.getElementById("contactForm").addEventListener("submit", submitForm);

  //Submit form
  function submitForm(e) {
    e.preventDefault();

    var name = getInputVal('name');
    var email = getInputVal('email');
    var phone = getInputVal('phone');
    var message = getInputVal('message');

    //Save message
    saveMessage(name, email, phone, message);

    //Show confirmation alert
    document.querySelector(".alert").style.display = "block";
    //Hide alert after 5 seconds
    setTimeout(function() {
      document.querySelector(".alert").style.display = "none";
    },5000);
    //Clear form
    document.getElementById("contactForm").reset(); 
  };

  function getInputVal(id) {
    return document.getElementById(id).value;
  };

  //Save messages to firebase
  function saveMessage(name, email, phone, message) {
    var newMessageRef = messagesRef.push();

    newMessageRef.set({
      name: name,
      email: email,
      phone: phone,
      message: message
    });
  };