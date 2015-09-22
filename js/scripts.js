  var geocoder;
  var map;


  function initialize() {
    geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(-34.397, 150.644);
    var mapOptions = {
      zoom: 3,
      center: latlng
    }
    map = new google.maps.Map(document.getElementById("map"), mapOptions);
  }

  function codeAddress() {
  // Get address from form
  var address = $("input#new-location-name").val();
  geocoder.geocode( { 'address': address}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      map.setCenter(results[0].geometry.location);

      // Add marker
      var marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location
      });
    } else {
      alert("Geocode was not successful for the following reason: " + status);
    }
  });
}

$(document).ready(function() {

  $("form#new-spot").submit(function(event) {
  event.preventDefault();

  // Grab input fields
  var inputtedNewCountry = $("input#new-country").val();
  var inputtedNewCity = $("input#new-city").val();

  // Clear input fields after pinning marker on map
  $("input#new-country").val("");
  $("input#new-city").val("");
 });

/* Form to add additional details to a location */
  $("#add-activity").click(function() {
      $(".new-detail").append(    '<div class="form-group">' +
                                  '<label for="new-activity">Activity</label>'+
                                  '<input type="text" class="form-control new-activity">' +
                                  '</div>'
                                );
  });

/* Form to add a location */
  $("form#new-location").submit(function(event) {
    event.preventDefault();

    var inputtedCity = $("input#new-city").val();
    var inputtedCountry = $("input#new-country").val();
    var inputtedRating = $("input#new-rating").val();
    var inputtedStart = $("input#new-start").val();
    var inputtedEnd = $("input#new-end").val();
    var inputtedCompanions = $("input#new-companions").val();
    var inputtedFood = $("input#new-food").val();
    var newLocation = { city: inputtedCity, country: inputtedCountry, rating: inputtedRating, start: inputtedStart, end: inputtedEnd, companions: inputtedCompanions, food: inputtedFood, activities: [] };

      /* Add another activity for your location */
    $(".new-detail").each(function() {
      var inputtedActivity = $(this).find("input.new-activity").val();
      var newActivity = { activity: inputtedActivity };

      newLocation.activities.push(newActivity);
    });

    /* Hidden form to add a second activity or update information */
    $("#second-activity").each(function() {
      var inputtedActivity = $(this).find("input.new-activity").val();
      var secondActivity = { activity: inputtedActivity };

    newLocation.activites.push(secondActivity);
    });

    /*Routing new location information to web site*/
    $("ul#locations").append("<li><span class='location'>" + newLocation.city + ", " + newLocation.country + "</span></li>");

    /* Show information for the location that is clicked */
    $(".location").last().click(function() {
      $("#show-location").show();
      $(".city").text(newLocation.city);
      $(".country").text(newLocation.country);
      $(".rating").text(newLocation.rating);
      $(".start").text(newLocation.start);
      $(".end").text(newLocation.end);
      $(".companions").text(newLocation.companions);
      $(".food").text(newLocation.food);

      $("ul#details").text("");
      newLocation.activities.forEach(function(detail) {
        $("ul#details").append("<li>" + detail.activity + "</li>");
      });
    });

    /* Clears the form after the location is added */
    $("input#new-city").val("");
    $("input#new-country").val("");
    $("input.new-rating").val("");
    $("input.new-start").val("");
    $("input.new-end").val("");
    $("input.new-companions").val("");
    $("input.new-food").val("");
    $("input.new-activity").val("");

  });//closes form new-location
});
