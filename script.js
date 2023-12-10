// Function to handle link click events
var filename = "";
function handleLinkClick(event) {
  // Prevent the default link behavior (e.g., navigating to a new page)
  event.preventDefault();

  // Get the clicked link element
  const clickedLink = event.currentTarget;

  // Get the label (textContent) of the clicked link
  const activeLinkLabel = clickedLink.textContent;

  // Display the active link label
  const activeLinkLabelElement =
    document.getElementById("activeLinkLabel");
  activeLinkLabelElement.textContent = "Selected: " + activeLinkLabel;

  filename = activeLinkLabel;

  // Use the activeLinkLabel as a variable within your script
  // Example: You can use activeLinkLabel here as needed
  console.log("Active Link Label as a variable:", activeLinkLabel);
}

// Add click event listeners to all links
const links = document.querySelectorAll(".sidebar ul li a");
links.forEach((link) => {
  link.addEventListener("click", handleLinkClick);
});

// Fetch GeoJSON data and store it as a variable
fetch(`/data/Bagerhat_City_Profile.geojson`)
  .then((response) => response.json())
  .then((data) => {
    // Store the GeoJSON data in a variable
    const geojsonData = data;

    // Create the map using the data
    createMap(geojsonData);

    // Populate the table using the data
    populateTable(geojsonData);

    // Extract the "Data_Colle" attribute values
    const dataColleValues = geojsonData.features.map(
      (feature) => feature.properties.Data_Colle
    );

    // Count the occurrences of each "Data_Colle" value
    const dataColleCounts = {};
    dataColleValues.forEach((value) => {
      dataColleCounts[value] = (dataColleCounts[value] || 0) + 1;
    });

    // Extract unique "Data_Colle" values and their counts
    const uniqueDataColle = Object.keys(dataColleCounts);
    const dataColleCountsArray = Object.values(dataColleCounts);

    // Create a pie chart
    const ctx = document.getElementById("pieChart").getContext("2d");
    const pieChart = new Chart(ctx, {
      type: "doughnut", // Change chart type to doughnut
      data: {
        labels: uniqueDataColle,
        datasets: [
          {
            data: dataColleCountsArray,
            backgroundColor: [
              "rgba(255, 99, 132, 0.7)",
              "rgba(54, 162, 235, 0.7)",
              "rgba(255, 206, 86, 0.7)",
              // Add more colors as needed
            ],
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            position: "right", // Position the legend on the right side
          },
        },
        responsive: true, // Enable responsiveness
        maintainAspectRatio: false, // Disable aspect ratio
        width: 200, // Set the desired width
        height: 200, // Set the desired height
      },
    });

    // Generate the legend and append it to the chart
    const legend = document.getElementById("chart-legend");
    legend.innerHTML = pieChart.generateLegend();
  })
  .catch((error) => {
    console.error("Error loading GeoJSON data:", error);
  });

// Function to create the map
function createMap(data) {
  var map = L.map("map").setView(
    [22.66351318359375, 89.7786865234375],
    12
  );

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

// Fetch GeoJSON data and calculate the total number of entries
fetch("/data/Bagerhat_City_Profile.geojson")
  .then((response) => response.json())
  .then((data) => {
    // Calculate the total number of entries
    const totalEntries = data.features.length;

    // Create an HTML card with the total number of entries
    const cardHtml = `
        <div class="tne">
          <h1>${totalEntries}</h1>
        </div>
      `;

    // Append the card to the grid-item-1 container
    const cardContainer = document.querySelector(".tne");
    cardContainer.innerHTML = cardHtml;
  })
  .catch((error) => {
    console.error("Error fetching GeoJSON data:", error);
  });

// Fetch GeoJSON data and calculate the total number of entries for "Formal" type
fetch("/data/Bagerhat_City_Profile.geojson")
  .then((response) => response.json())
  .then((data) => {
    // Calculate the total number of entries
    const totalEntries = data.features.length;

    // Filter the data to count the number of "Formal" entries
    const formalEntries = data.features.filter(
      (feature) => feature.properties.Type_ === "Formal"
    );

    // Calculate the number of "Formal" entries
    const numFormalEntries = formalEntries.length;

    // Create an HTML card with the number of "Formal" entries
    const numFormalEntriesCardHtml = `
        <div class="formal">
          <h1>${numFormalEntries}</h1>
        </div>
      `;

    // Append the "Formal" entries card to the grid-item-2 container
    const numFormalEntriesContainer = document.querySelector(".formal");
    numFormalEntriesContainer.innerHTML = numFormalEntriesCardHtml;
  })
  .catch((error) => {
    console.error("Error fetching GeoJSON data:", error);
  });

// Fetch GeoJSON data and calculate the total number of entries for "Informal" type
fetch("/data/Bagerhat_City_Profile.geojson")
  .then((response) => response.json())
  .then((data) => {
    // Calculate the total number of entries
    const totalEntries = data.features.length;

    // Filter the data to count the number of "Informal" entries
    const informalEntries = data.features.filter(
      (feature) => feature.properties.Type_ === "Informal"
    );

    // Calculate the number of "Informal" entries
    const numInformalEntries = informalEntries.length;

    // Create an HTML card with the number of "Informal" entries
    const numInformalEntriesCardHtml = `
        <div class="informal">
          <h1>${numInformalEntries}</h1>
        </div>
      `;

    // Append the "Informal" entries card to the grid-item-3 container
    const numInformalEntriesContainer =
      document.querySelector(".informal");
    numInformalEntriesContainer.innerHTML = numInformalEntriesCardHtml;
  })
  .catch((error) => {
    console.error("Error fetching GeoJSON data:", error);
  });

// Fetch GeoJSON data and display the total number of entries for "Comments" values
fetch("/data/Bagerhat_City_Profile.geojson")
  .then((response) => response.json())
  .then((data) => {
    // Calculate the total number of entries
    const commentsValues = data.features.map(
      (feature) => feature.properties.Comments_
    );

    // Create an HTML card with the total number of entries
    const cardHtml = `
        <div class="tne">
          <h1>${commentsValues.length}</h1>
        </div>
      `;

    // Append the card to the grid-item-1 container
    const cardContainer = document.querySelector(".tne");
    cardContainer.innerHTML = cardHtml;
  })
  .catch((error) => {
    console.error("Error fetching GeoJSON data:", error);
  });

// Fetch GeoJSON data for the column chart
fetch("/data/Bagerhat_City_Profile.geojson")
  .then((response) => response.json())
  .then((data) => {
    const geojsonData = data;

    // Extract the "Type_" attribute values
    const typeValues = geojsonData.features.map(
      (feature) => feature.properties.Type_
    );

    // Count the occurrences of each "Type_" value
    const typeCounts = {};
    typeValues.forEach((value) => {
      typeCounts[value] = (typeCounts[value] || 0) + 1;
    });

    // Extract unique "Type_" values and their counts
    const uniqueTypes = Object.keys(typeCounts);
    const typeCountsArray = Object.values(typeCounts);

    // Create a column chart
    const ctx = document.getElementById("columnChart").getContext("2d");
    const columnChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: uniqueTypes,
        datasets: [
          {
            label: "Dataset 1", // Provide a label for the first dataset
            data: typeCountsArray,
            backgroundColor: [
              "rgba(255, 99, 132, 0.7)",
              "rgba(54, 162, 235, 0.7)",
              "rgba(255, 206, 86, 0.7)",
              // Add more colors as needed
            ],
          },
          // Add more datasets with unique labels and data here
        ],
      },
      options: {
        plugins: {
          legend: {
            display: false, // Show the legend
            position: "bottom", // Position the legend at the bottom
          },
        },
        responsive: true,
        maintainAspectRatio: false,
        width: 200,
        height: 200,
      },
    });

    // Generate the custom legend
    const legendContainer = document.querySelector(".legend");
    uniqueTypes.forEach((type, index) => {
      const legendItem = document.createElement("div");
      legendItem.classList.add("legend-item");
      legendItem.innerHTML = `
          <div class="legend-color-box" style="background-color:${columnChart.data.datasets[0].backgroundColor[index]}"></div>
          <div class="legend-label">${type}</div>
        `;
      legendContainer.appendChild(legendItem);
    });
  })
  .catch((error) => {
    console.error("Error fetching GeoJSON data:", error);
  });

// Wrap your JavaScript code inside a DOMContentLoaded event listener
document.addEventListener("DOMContentLoaded", function () {
  const mainSourceList = document.getElementById("mainSourceList");

  // JavaScript code to fetch and populate the list
  fetch("/data/Bagerhat_City_Profile.geojson")
    .then((response) => response.json())
    .then((data) => {
      // Extract the "Main_sourc" attribute values
      const mainSourceValues = data.features.map(
        (feature) => feature.properties.Main_sourc
      );

      // Remove duplicate values by converting the array to a Set
      const uniqueMainSourceValues = [...new Set(mainSourceValues)];

      // Populate the list with unique Main Source values
      uniqueMainSourceValues.forEach((value) => {
        const listItem = document.createElement("li");
        listItem.textContent = value;
        mainSourceList.appendChild(listItem);
      });
    })
    .catch((error) => {
      console.error("Error fetching GeoJSON data:", error);
    });
});

// Function to create a Line Chart for "F_Locati_3"
function createLineChart(data) {
  const lineChartCanvas = document
    .getElementById("lineChart")
    .getContext("2d");

  const labels = data.map((feature) => feature.properties.F_Locati_3);
  const values = data.map((feature) =>
    parseFloat(feature.properties.F_Locati_3)
  ); // Use the correct attribute name here

  new Chart(lineChartCanvas, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Accuracy Level (m)",
          data: values,
          fill: false,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        },
      ],
    },
    options: {
      scales: {
        x: {
          type: "linear",
          position: "bottom",
        },
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

// Fetch the JSON data and create the Line Chart
// Specify the hosted URL of your GeoJSON file here
const geoJsonUrl = "/data/Bagerhat_City_Profile.geojson"; // Update with the actual hosted URL

fetch(geoJsonUrl)
  .then((response) => response.json())
  .then((data) => {
    createLineChart(data.features);
  })
  .catch((error) => {
    console.error("Error fetching GeoJSON data:", error);
  });
  