import $ from "jquery";

var chatNow = document.querySelector(".chat-us-now");
if (chatNow) {
  document.addEventListener("click", function () {
    chatNow.href = "#chat-us-now";
  });
}
var chatNow2 = document.querySelector(".chat-us-now2");
if (chatNow2) {
  document.addEventListener("click", function () {
    chatNow2.href = "#chat-us-now2";
  });
}
var chatNow3 = document.querySelector(".chat-us-now3");
if (chatNow3) {
  document.addEventListener("click", function () {
    chatNow3.href = "#chat-us-now3";
  });
}
var chatNow4 = document.querySelector(".chat-us-now4");
if (chatNow4) {
  document.addEventListener("click", function () {
    chatNow4.href = "#chat-us-now4";
  });
}
(function () {
  if (location.href.toLowerCase().indexOf("/careers") != -1) {
    $(".comment-link").attr("href", "#popup-careers");
    $("footer").after(
      '<div class="popup popup-option popup-option-content l-clearfix" data-popup-id="popup-careers" role="dialog" aria-labelledby="popup3Title" aria-describedby="popup3Desc" > <img src="/_assets/images/icon/logo-gray.png" alt="nThrive Logo" class="popup-logo block"> <button data-popup-action="close" class="popup-close popup-option-btn-close l-align-right" aria-label="Close"></button><div class="popup-option-window-wrap" role="dialog" id="popup-option-window-wrap-1"><div class="form-full"><h2>Career Opportunity Questions</h2><p>To learn more about a career at nThrive, please visit the <a href="//www.nthrive.com/careers" class="text-7b214c" target="_parent">careers page</a>. For current nThrive career opportunities, please <a href="//careers-nthrive.icims.com/jobs/intro?hashed=-435713663&amp;mobile=false&amp;width=940&amp;height=500&amp;bga=true&amp;needsRedirect=false&amp;jan1offset=-300&amp;jun1offset=-240" class="text-7b214c" target="_blank" >search here</a>. For other general questions about career opportunites please contact us by email or phone here:</p><p><strong>Email</strong><br> <a href="mailto:careers@nthrive.com" class="text-7b214c" target="_blank" >careers@nthrive.com</a></p><p><strong>Telephone</strong><br> (866) 773-2973 x2</p></div></div></div>'
    );
  } else if (
    location.href.toLowerCase().indexOf("/solutions") != -1 ||
    location.href.toLowerCase().indexOf("/partners") != -1 ||
    location.href.toLowerCase().indexOf("/analytics/") != -1 ||
    location.href.toLowerCase().indexOf("/covid19") != -1 ||
    location.href.toLowerCase().indexOf("/education/") != -1
  ) {
    var askQuestion = document.querySelector(".ask-a-question");
    if (askQuestion) {
      askQuestion.href = "#contact-form";
    }
    $("body").append(
      '<a href="#contact-form" class="contact-btn block"><picture><source type="image/svg+xml" srcset="/_assets/images/icon/contact.svg"><img src="/_assets/images/icon/contact.png" alt="Click to fill out contact form"></picture></a>'
    );
  } else {
    var askQuestion = document.querySelector(".ask-a-question");
    if (askQuestion) {
      document.addEventListener("click", function () {
        askQuestion.href = "#popup-product";
      });
      $("footer").after(
        '<div class="popup popup-option popup-option-content l-clearfix" data-popup-id="popup-product" role="dialog" aria-labelledby="popup4Title" aria-describedby="popup4Desc"> <img src="/_assets/images/icon/logo-gray.png" alt="nThrive Logo" class="popup-logo block"> <button data-popup-action="close" class="popup-close popup-option-btn-close l-align-right" aria-label="Close"></button><div class="popup-option-window-wrap" role="dialog" id="popup-option-window-wrap-2"><div class="form-full"><h2>Contact Client Support</h2><p class="text-00515B">Communication channels</p><p><strong>Online portal</strong><br> <a href="http://communities.medassets.com" class="text-7b214c" target="_blank" >https://communities.nThrive.com</a></p><p>Most efficient method for alerting nThrive to a non-critical issue or request.</p><p><strong>Telephone</strong><br> (800) 390-7459</p><p>Recommended method for alerting nThrive to critical or high severity issues that require rapid response and action.</p><p><strong>Working hours</strong><br> Standard support Monday to Friday, 6 a.m. - 6 p.m. CT</p><p><strong>Critical support</strong><br> Monday to Friday, 6 p.m. - 10 p.m. CT<br> Saturday, Sunday and holidays, 6 a.m. - 6 p.m. CT</p><p>These hours are applicable to clients located in the continental United States. For standard support hours outside the continental United States, please consult your maintenance or other support agreement with nThrive.</p></div></div></div>'
      );
    }
  }
})();
function ommFormValidate(theForm) {
  var i;
  var anySelected;
  if (theForm.first_name.value == null || theForm.first_name.value == "") {
    alert("First Name is a required field, please fill it in");
    return !1;
  }
  if (theForm.last_name.value == null || theForm.last_name.value == "") {
    alert("Last Name is a required field, please fill it in");
    return !1;
  }
  if (theForm.email.value == null || theForm.email.value == "") {
    alert("Email is a required field, please fill it in");
    return !1;
  }
  return !0;
}
$(document).ready(function () {
  $("#ask-a-question").validate({
    rules: {
      first_name: {
        required: !0,
        minlength: 2,
        alphabetFormat: !0,
        hasLowercase: !0,
        notEqual: [".std-input3"],
      },
      last_name: {
        required: !0,
        minlength: 2,
        alphabetFormat: !0,
        hasLowercase: !0,
        notEqual: [".std-input3"],
      },
      email: { required: !0, email: !0 },
      permission_received: { required: !0 },
    },
    messages: {
      first_name: {
        required: "Please enter your first name",
        minlength: "Your first name must consist of at least 2 characters",
        alphabetFormat: "No special characters.",
        hasLowercase: "Please do not use all caps. (i.e. John).",
        notEqual: "First Name cannot be the same as Last Name",
      },
      last_name: {
        required: "Please enter your last name",
        minlength: "Your last name must consist of at least 2 characters",
        alphabetFormat: "No special characters.",
        hasLowercase: "Please do not use all caps. (i.e. Doe).",
        notEqual: "First Name cannot be the same as Last Name",
      },
      email: "Please enter a valid email address",
      permission_received: "This checkbox is required.",
    },
  });
  var $askAQuestion = $("#ask-a-question :input");
  $askAQuestion.focus(function () {
    $(this)
      .parent()
      .addClass("valid-group")
      .children("label.label-focus")
      .removeClass("label-focus")
      .addClass("label-blur");
  });
  $askAQuestion.blur(function () {
    $(this)
      .next("label.label-blur")
      .removeClass("label-blur")
      .addClass("label-focus");
  });
});
