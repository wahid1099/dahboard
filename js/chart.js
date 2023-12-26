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

// Function to create a Line Chart for "F_Locati_3"
function createLineChart(data) {
  const lineChartCanvas = document.getElementById("lineChart").getContext("2d");

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
