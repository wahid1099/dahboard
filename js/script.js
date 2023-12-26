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
  const activeLinkLabelElement = document.getElementById("activeLinkLabel");
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
    const numInformalEntriesContainer = document.querySelector(".informal");
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
