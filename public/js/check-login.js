$(document).ready(function() {
    console.log("Check Login!")
  $.get("/api/user_data", function(req, res){
    console.log(req.user);
  });
});