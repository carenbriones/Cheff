$(document).ready(function() {
  // Gets references to our form and input
  var signUpForm = $("form.form-signup");
  var emailInput = $("input#inputEmail");
  var nameInput = $("input#chefName");
  var passwordInput = $("input#inputPassword");
  var pictureURLInput = $("input#imgURL");

  // Submits form to create a Chef
  signUpForm.on("submit", function(event) {
    event.preventDefault();

    var chefData = {
      email: emailInput.val().trim(),
      name: nameInput.val().trim(),
      password: passwordInput.val().trim(),
      pictureURL: pictureURLInput.val().trim()
    };

    if (!chefData.email || !chefData.password || !chefData.name) {
      return;
    }

    // Run signUpChef function if there's an email
    signUpChef(
      chefData.email,
      chefData.name,
      chefData.password,
      chefData.pictureURL
    );

    // Empties fields
    passwordInput.val("");
    pictureURLInput.val("");
    emailInput.val("");
    passwordInput.val("");
  });

  // Creates a Chef in the database
  function signUpChef(email, name, password, pictureURL) {
    $.post("/api/signup", {
      email: email,
      name: name,
      password: password,
      pictureURL: pictureURL
    })
      .then(function() {
        window.location.replace("/login");
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
