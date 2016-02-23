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
      console.log("Fist choice is " + localStorage.priceFirstChoice)
        console.log("we redirect");
    } else {
        localStorage.priceFirstChoice = priceChoice;
        console.log("we redirect");
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
