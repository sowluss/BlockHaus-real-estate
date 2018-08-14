// toggle bar
$(document).ready(function() {
    $('.toggle').click(function() {
        $('ul').toggleClass('active');
    })
})

// search form animation
$('.input').focus(function() {
    $(this).parent().addClass('focus');
}).blur(function() {
    if($(this).val() === '') {
        $(this).parent().removeClass('focus');
    }
})
      

// CONTACT FORM WITH GOOGLE FIREBASE

// Initialize Firebase
var config = {
    apiKey: "AIzaSyCe_ujPmjJENrZDRnyg6OIDA6aatBAgjCo",
    authDomain: "blochaus-contact-form.firebaseapp.com",
    databaseURL: "https://blochaus-contact-form.firebaseio.com",
    projectId: "blochaus-contact-form",
    storageBucket: "blochaus-contact-form.appspot.com",
    messagingSenderId: "109199806415"
  };
  firebase.initializeApp(config);

//   Reference messages collection
var messagesRef =  firebase.database().ref('messages');   

// listen for form submit
document.getElementById('contactForm').addEventListener('submit', submitForm);

// Submit form
function submitForm(e) {
    e.preventDefault();

    // get values
    var firstName = getInputVal('firstName');
    var lastName = getInputVal('lastName');
    var email = getInputVal('email');
    var mobile = getInputVal('mobile');
    var message = getInputVal('message');
    
    // save message
    saveMessage(firstName, lastName, email, mobile, message);

    // show alert
    document.querySelector('.alert').style.display = 'block';

    // hide alert after 3 secs
     setTimeout(function() {
        document.querySelector('.alert').style.display = 'none';
     }, 3000);

    //   clear form
     document.getElementById('contactForm').reset();
}

//  function to get form values

function getInputVal(id) {
    return document.getElementById(id).value;
}

// Save message to Firebase 
function saveMessage(firstName, lastName, email, mobile, message) {
    var newMessageRef = messagesRef.push();
    newMessageRef.set({
        firstName: firstName,
        lastName: lastName,
        email: email,
        mobile: mobile,
        message: message
    });
}