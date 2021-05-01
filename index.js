/** @format */

$("form").submit(function (e) {
  e.preventDefault();
  $(".Location").empty().fadeIn();
  $(".lat").empty();
  $(".lng").empty();
  $(".time").empty();
  $(".alert").empty();
  $("#map").load(location.href + " #map");
  const userIp = $(".user-ip").val();
  ValidateIPaddress(userIp);
  const api = "at_AZU2PA5LhJ8ywZyPwvQfcigb5n6Kg";
  const url =
    "https://geo.ipify.org/api/v1?apiKey=" + api + "&ipAddress=" + userIp + "";
  fetch(url, {
    method: "GET",
  })
    .then(function (data) {
      return data.json();
    })
    .then(function (data) {
      const location = data.location;

      console.log(location);
      const locationLat = data.location.lat;
      const locationLng = data.location.lng;
      const time = data.location.timezone;
      $(".Location").html(location.country);
      $(".lat").html(locationLat);
      $(".lng").html(locationLng);
      $(".time").html(time);
      $(".city").html(location.city);
      createMap(location, locationLat, locationLng);
    });
});
function createMap(location, lat, lng) {
  document.getElementById("weathermap").innerHTML =
    "<div id='map' style='width: 100%; height: 100%;'></div>";
  var map = L.map("map").setView([0, 0], 1);
  L.tileLayer(
    "https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=2lWZuNn5DTrOxZ3cQNdd",
    {
      attribution:
        '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
    }
  ).addTo(map);
  var marker = L.marker([lat, lng]).addTo(map);
}
// function ValidateIPaddress(inputText) {
//   if (
//     /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
//       inputText
//     )
//   ) {
//     $(".x").empty();
//     //     return inputText;
//   } else {
//     var alert = `<div class="alert">
//         <span
//         class="closebtn"
//         onclick="this.parentElement.style.display='none';"
//         >&times;</span
//       >
//       <strong>Wrong!</strong> Enter a valid Id Address (e.g 1.2.3.4)
//         </div>`;

//     $(".x").prepend(alert);
//     scrollWin(0, 50);
//   }
// }
function ValidateIPaddress(IP_U_ENTER) {
  Valid_IP = false;
  ipParts = IP_U_ENTER.split(".");
  if (ipParts.length == 4) {
    for (i = 0; i < 4; i++) {
      TheNum = parseInt(ipParts[i]);
      if (TheNum >= 0 && TheNum <= 255) {
      } else {
        break;
      }
    }
    if (i == 4) Valid_IP = true;
  }
  if (Valid_IP == true) {
    $(".x").remove();
    return IP_U_ENTER;
  } else {
    $(".wrong").html("You have entered an invalid IP address!(eg:2.3.3.4)");

    var alert = `<div class="alert">
        <span
        class="closebtn"
        onclick="this.parentElement.style.display='none';"
        >&times;</span
      >
      <strong>Wrong!</strong> Enter a valid Id Address (e.g 1.2.3.4)
        </div>`;

    $(".x").prepend(alert);
    scrollWin(0, 50);
  }
}

// function ValidateIPaddress(inputText) {
//   Valid_IP = false;
//   ipParts = inputText.split(".");
//   if (inputText.match(ipformat)) {
//     $(".x").empty();
//     return inputText;
//   } else {
//     $(".wrong").html("You have entered an invalid IP address!(eg:2.3.3.4)");

//     var alert = `<div class="alert">
//     <span
//     class="closebtn"
//     onclick="this.parentElement.style.display='none';"
//     >&times;</span
//   >
//   <strong>Wrong!</strong> Enter a valid Id Address (e.g 1.2.3.4)
//     </div>`;

//     $(".x").prepend(alert);
//     scrollWin(0, 50);
//   }
// }
function scrollWin(x, y) {
  window.scrollBy(x, y);
}
