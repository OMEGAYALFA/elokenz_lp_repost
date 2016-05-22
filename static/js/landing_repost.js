function mainFN(priceChoice){
  if(typeof(Storage) !== "undefined") {
      console.log("we have the localstorage");// Code for localStorage/sessionStorage.
      // Save and redirect , Callback based,
      saveFirstChoice(priceChoice, function(){
              window.location = "register.html";
          });
  } else {
      // Sorry! No Web Storage support..
      console.log("No storage found, fallback");
  }
}

// function setFirstPriceRedirect(priceChoice){
//   console.log("we set the first price");
//   if (localStorage.priceFirstChoice) {
//     console.log("Fist choice is " + localStorage.priceFirstChoice)
//       console.log("we redirect");
//   } else {
//       localStorage.priceFirstChoice = priceChoice;
//       console.log("we redirect");
//   }
//   window.location = "register.html";
// }


function saveFirstChoice(priceChoice, callback){
    // Save the first click to localstorage and call callback (allows for redirect)
    if (localStorage.priceFirstChoice) {
        console.log("Fist choice is already set and is : " + localStorage.priceFirstChoice)
        console.log("we redirect");
    } else {
        localStorage.priceFirstChoice = priceChoice;
        console.log("we redirect");
        console.log("We have save the first choice : " + localStorage.priceFirstChoice)
        updateLead();
    }
    callback();
}

function getFirstChoice(){
  // Return the localstorage priceFirstChoice clicked
  if (localStorage.priceFirstChoice) {
    return localStorage.priceFirstChoice
  } else {
    return null;
  }
}

function updateLead(){
  // Update leads to Mautic
  console.log("updating lead");
  var firstChoice = getFirstChoice();
  var mauticUrl = 'http://vvv.elokenz.com';
  var src = mauticUrl + '/mtracking.gif?page_url=' + encodeURIComponent(window.location.href) + '&lp_price_choice=' + encodeURIComponent(firstChoice) + '&lp_repost_flag=' + encodeURIComponent("1");
  var img = document.createElement('img');
  img.style.width  = '1px';
  img.style.height  = '1px';
  img.style.display = 'none';
  img.src = src;
  var body = document.getElementsByTagName('body')[0];
  body.appendChild(img);
}




/********************
/ Page Pricing
*********************/
$('#toggle_event_editing button').click(function(){
  if($(this).hasClass('locked_active') || $(this).hasClass('unlocked_inactive')){
    /* code to do when unlocking */
        $('#switch_status').html('Switched on.');
        $('#basic_price').html('10');
        $('#basic_price_future').html('19');
        $('#startup_price').html('26');
        $('#startup_price_future').html('39');
        $('#pricing_awesomeAccount').attr("href", "https://elokenz.chargebee.com/hosted_pages/plans/basic-monthly");
        $('#pricing_premiumAccount').attr("href", "https://elokenz.chargebee.com/hosted_pages/plans/startup-monthly");
  }else{
    /* code to do when locking */
        $('#switch_status').html('Switched off.');
        $('#basic_price').html('8.50');
        $('#basic_price_future').html('16');
        $('#startup_price').html('22');
        $('#startup_price_future').html('33');
        $('#pricing_awesomeAccount').attr("href", "https://elokenz.chargebee.com/hosted_pages/plans/basic-yearly");
        $('#pricing_premiumAccount').attr("href", "https://elokenz.chargebee.com/hosted_pages/plans/startup-yearly");
  }
  
  /* reverse locking status */
  $('#toggle_event_editing button').eq(0).toggleClass('locked_inactive locked_active btn-secondary btn-success');
  $('#toggle_event_editing button').eq(1).toggleClass('unlocked_inactive unlocked_active  btn-success btn-secondary');
});
