$(document).ready(function() {
  console.log("Check Login!");
  $.get("/api/user_data").then(function(data) {
    function isEmpty(obj) {
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          return false;
        }
      }
      return true;
    }

    if (isEmpty(data)) {
      var loginButton = $(
        "<a href='/login' id='home-login-button' role='button' class='btn btn-outline-secondary btn-block '><i class='far fa-user'></i> Login</a>"
      );
      $("#login-account-nav").empty();
      $("#log-out-holder").empty();
      $("#login-account-nav").append(loginButton);
    } else {
      var accountButton = $(
        "<a href='/profile' id='home-login-button' role='button' class='btn btn-outline-secondary btn-block '><i class='far fa-user'></i> My Account</a>"
      );
      var signOutButton = $(
        "<a href='/logout' id='home-login-button' role='button' class='btn btn-outline-secondary btn-block '><i class='far fa-times-circle'></i></i> Sign Out</a>"
      );;

      var welcomeMsg = " What's Cookin' " + data.name +"!"; 
      $("#login-account-nav").empty();
      $("#login-account-nav").append(accountButton);
      $("#log-out-holder").empty();
      $("#log-out-holder").append(signOutButton);
      $("#welcome-message").append(welcomeMsg);
    }
  });
});
