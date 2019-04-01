var markerGroup;
var map;

document.addEventListener("DOMContentLoaded", function() {
  map = L.map("map-content").setView([37, 32], 6);

  L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}",
    {
      attribution: "Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ",
      maxZoom: 16
    }
  ).addTo(map);

  render();

  var selects = document.getElementsByTagName("select");
  for (var si in selects) {
    var select = selects[si];

    if (select.addEventListener) {
      select.addEventListener("change", function() {
        render();
      });
    }
  }
});

var getOptions = function() {
  return {
    maxDist: parseInt(document.getElementById("select-max-distance").value),
    noSteps: parseInt(document.getElementById("select-no-steps").value),
    circleSegmentAngle: parseInt(document.getElementById("select-angle").value),
    opacityDecrease: parseFloat(
      document.getElementById("select-opacity-decrease").value
    ),
    maxOpacity: parseFloat(document.getElementById("select-max-opacity").value),
    colors: {
      Sarapis: "#ff7f00",
      Isis: "#377eb8",
      Apis: "#4daf4a",
      Anubis: "#e41a1c"
    },
    propertyName: "deities"
  };
};

var render = function() {
  console.log("render");
  var options = getOptions();

  console.log(options);

  if (map.hasLayer(markerGroup)) {
    map.removeLayer(markerGroup);
  }

  markerGroup = L.segmentMarkerGroup(options);

  var templesJson = L.geoJSON(temples);
  var templeLayers = templesJson.getLayers();

  markerGroup.addLayers(templeLayers);

  console.log(markerGroup);

  markerGroup.addTo(map);
};
