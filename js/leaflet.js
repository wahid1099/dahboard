// Function to create the map
function createMap(data) {
  var map = L.map("map").setView([22.66351318359375, 89.7786865234375], 12);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  L.geoJSON(data, {
    onEachFeature: function (feature, layer) {
      var [lat, long, altitude, accuracy] =
        feature.properties.Location.split(" ").map(parseFloat);
      var popupContent =
        "<b>Feature Type:</b> " +
        feature.properties.Feature_ +
        "<br><b>Altitude:</b> " +
        altitude +
        "<br><b>Accuracy:</b> " +
        accuracy +
        "<br><b>Location:</b> " +
        lat +
        " " +
        long +
        "<br><b>Data Collector:</b> " +
        feature.properties.Data_Colle;

      layer.bindPopup(popupContent);
    },
  }).addTo(map);
}
// Function to populate the table
function populateTable(data) {
  const tableBody = document.getElementById("table-body");

  data.features.forEach((feature) => {
    const row = document.createElement("tr");
    const featureTypeCell = document.createElement("td");
    const locationCell = document.createElement("td");
    const dataCollectorCell = document.createElement("td");

    featureTypeCell.textContent = feature.properties.Feature_;
    locationCell.textContent = feature.properties.Location;
    dataCollectorCell.textContent = feature.properties.Data_Colle;

    row.appendChild(featureTypeCell);
    row.appendChild(locationCell);
    row.appendChild(dataCollectorCell);

    tableBody.appendChild(row);
  });
}
