import $ from "jquery";

$(window).on("load", function () {
  var $salesForm = $("#sales-question");
  var $careers = $("#Careers");
  var $technical = $("#Technical");
  var $inputWcoID = $("input[name='WcoFormId']");
  var $email = $("#Email");

  var $contactAction =
    "https://snippet.omm.crownpeak.com/p/23b06424-6086-46c6-9e7a-9bc94fa1f626";
  var $careersAction =
    "https://snippet.omm.crownpeak.com/p/5d44dd2c-5691-41eb-9b32-e1f01c46a581";
  var $technicalAction =
    "https://snippet.omm.crownpeak.com/p/02301dd3-d7df-4b26-aa11-9fbfba118195";
  var $combinedCaAction =
    "https://snippet.omm.crownpeak.com/p/3304583c-b2d4-4420-8002-cc0f0086b75d";

  var $HRcontactAction =
    "https://snippet.omm.crownpeak.com/p/09c98092-5b74-418e-af4e-553ff5d181c9";
  var $HRcareersAction =
    "https://snippet.omm.crownpeak.com/p/ebac2e4d-9542-48a8-b07f-d0dede54a3d3";
  var $HRtechnicalAction =
    "https://snippet.omm.crownpeak.com/p/acf8dd0b-e117-4767-8fbf-ab395dfee57b";
  var $HRcombinedCaAction =
    "https://snippet.omm.crownpeak.com/p/730e9364-2d2b-49ff-acf4-a9f45bc49cb7";

  var $contactID = "810067d6-7562-4f74-a41b-1bdf18a84059";
  var $careersID = "e3c468a0-e34d-465e-b537-0b8bb06ed97b";
  var $technicalID = "84f671f5-4533-4faf-b31e-e00754bec6bc";
  var $combinedCaID = "0d92a25f-19b1-4397-a081-ee9cbc5ac309";

  var $HRcontactID = "4f32c879-56b9-422d-ab87-35058ba6f43d";
  var $HRcareersID = "1141bf1d-9853-4e26-967d-54e1b466cbdf";
  var $HRtechnicalID = "68bc5d8d-cd8a-47b5-9146-8af796f9aa3c";
  var $HRcombinedCaID = "87b58928-bcbe-482e-a6ca-374185079843";

  function checkBoxFunction(box) {
    box.change(function () {
      console.log("checked!");

      if ($email.val().indexOf("@nthrive.com") != -1) {
        if ($careers.is(":checked") && $technical.is(":checked")) {
          console.log("Technical is checked!");
          $salesForm.attr("action", $HRcombinedCaAction);
          $inputWcoID.attr("value", $HRcombinedCaID);
        } else if ($careers.is(":checked") && !$technical.is(":checked")) {
          console.log("Careers is checked!");
          $salesForm.attr("action", $HRcareersAction);
          $inputWcoID.attr("value", $HRcareersID);
        } else if (!$careers.is(":checked") && $technical.is(":checked")) {
          console.log("Technical is checked!");
          $salesForm.attr("action", $HRtechnicalAction);
          $inputWcoID.attr("value", $HRtechnicalID);
        } else {
          console.log("nothing is checked!");
          $salesForm.attr("action", $HRcontactAction);
          $inputWcoID.attr("value", $HRcontactID);
        }
      } else {
        if ($careers.is(":checked") && $technical.is(":checked")) {
          console.log("Technical is checked!");
          $salesForm.attr("action", $combinedCaAction);
          $inputWcoID.attr("value", $combinedCaID);
        } else if ($careers.is(":checked") && !$technical.is(":checked")) {
          console.log("Careers is checked!");
          $salesForm.attr("action", $careersAction);
          $inputWcoID.attr("value", $careersID);
        } else if (!$careers.is(":checked") && $technical.is(":checked")) {
          console.log("Technical is checked!");
          $salesForm.attr("action", $technicalAction);
          $inputWcoID.attr("value", $technicalID);
        } else {
          console.log("nothing is checked!");
          $salesForm.attr("action", $contactAction);
          $inputWcoID.attr("value", $contactID);
        }
      }
    });
  }

  checkBoxFunction($email);
  checkBoxFunction($careers);
  checkBoxFunction($technical);
});

/*
const $salesForm = document.getElementById("sales-question");

const $careersChecked = document.getElementById("Careers");
const $technicalChecked = document.getElementById("Technical");

function checkBoxFunction(box) {
  box.addEventListener("change", function () {
    if (box.checked) {
      console.log("checked!");
      if (box.attr("id") == "Careers") {
        console.log("Careers is checked!");
        $salesForm.setAttribute(
          "action",
          "https://snippet.omm.crownpeak.com/p/06d1b6c3-6408-4586-b2fa-d70c7df471f8"
        );
      } else if (box.attr("id") == "Technical") {
        console.log("Technical is checked!");
        $salesForm.setAttribute(
          "action",
          "https://snippet.omm.crownpeak.com/p/37948f5b-7f7d-4af1-bd2a-318e8d160def"
        );
      } else if (box.attr("id") == "Careers" && box.attr("id") == "Technical") {
        console.log("Technical is checked!");
        $salesForm.setAttribute(
          "action",
          "https://snippet.omm.crownpeak.com/p/37948f5b-7f7d-4af1-bd2a-318e8d160def"
        );
      } else {
        console.log("nothing is checked!");
        $salesForm.setAttribute(
          "action",
          "https://snippet.omm.crownpeak.com/p/9b30b4a2-eedb-4df8-9be1-b662ce5768c0"
        );
      }
    }
  });
}

checkBoxFunction($careersChecked);
checkBoxFunction($technicalChecked);
*/
