// script.js

document.addEventListener("DOMContentLoaded", function() {
  // Transition from menu to tutorial
  document.getElementById("startButton").addEventListener("click", function () {
    document.getElementById("menu").style.display = "none";
    document.getElementById("tutorial").style.display = "block";
  });

  // Transition from tutorial to game (and load the map)
  document.getElementById("tutorialOk").addEventListener("click", function () {
    document.getElementById("tutorial").style.display = "none";
    document.getElementById("game").style.display = "block";
    loadMap();
  });

  function loadMap() {
    const container = document.getElementById("mapContainer");
    const width = container.clientWidth;
    const height = 500; // You can adjust the height as needed

    // Append an SVG element to the map container
    const svg = d3.select("#mapContainer")
                  .append("svg")
                  .attr("width", width)
                  .attr("height", height);

    // Define a Mercator projection and path generator
    const projection = d3.geoMercator()
                         .scale((width / 2 / Math.PI))
                         .translate([width / 2, height / 1.5]);

    const path = d3.geoPath().projection(projection);

    // Load the GeoJSON data for countries (ensure the file is in the same folder)
    d3.json("countries.geo.json").then(function(geojson) {
      // Draw each country with black outlines and a light fill color
      svg.append("g")
         .selectAll("path")
         .data(geojson.features)
         .enter()
         .append("path")
         .attr("d", path)
         .attr("fill", "#e0e0e0")
         .attr("stroke", "#000")
         .attr("stroke-width", 1);

      // Add country names as text labels (using the 'ADMIN' property for the full name)
      svg.append("g")
         .selectAll("text")
         .data(geojson.features)
         .enter()
         .append("text")
         .attr("x", function(d) { return path.centroid(d)[0]; })
         .attr("y", function(d) { return path.centroid(d)[1]; })
         .attr("text-anchor", "middle")
         .attr("font-size", "8px")
         .attr("fill", "#000")
         .text(function(d) { return d.properties.ADMIN; });
    }).catch(function(error) {
      console.error("Error loading GeoJSON data:", error);
    });
  }
});
