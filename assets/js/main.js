let details = document.querySelectorAll(".api-text");
let btn = document.querySelector(".btn");
let ipAddressEle = document.querySelector("input[type='text']");
const ipv4Regex =
  /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

// Draw initial Map
let map = L.map("map").setView([30, 80], 10);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);
let customIcon = L.icon({
  iconUrl: "./assets/images/icon-location.svg",
  iconSize: [27, 32],
  iconAnchor: [13, 27],
  popupAnchor: [0, -27],
});
let marker = L.marker([0, 0], {
  icon: customIcon,
}).addTo(map);

btn.addEventListener("click", () => {
  if (ipv4Regex.test(ipAddressEle.value) && ipAddressEle.value !== "") {
    fetch(
      `https://geo.ipify.org/api/v2/country,city?apiKey=at_BK6PtHruqvscgFTvrzNajCS8gc739&ipAddress=${ipAddressEle.value}`
    )
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        console.log(data);
        details[0].innerHTML = data.ip;
        details[1].innerHTML = `${data.location.city}, ${data.location.region},${data.location.country}`;
        details[2].innerHTML = `UTC ${data.location.timezone}`;
        details[3].innerHTML = data.isp;
        drawMap(data.location.lat, data.location.lng);
      });
  }
});

function drawMap(lat, lng) {
  if (map) {
    map.remove();
  }
  map = L.map("map").setView([lat, lng], 10);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);
  customIcon = L.icon({
    iconUrl: "./assets/images/icon-location.svg",
    iconSize: [27, 32],
    iconAnchor: [13, 27],
    popupAnchor: [0, -27],
  });
  marker = L.marker([lat, lng], {
    icon: customIcon,
  }).addTo(map);
}
