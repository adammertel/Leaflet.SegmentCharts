var carouselGroup;
var map;

document.addEventListener('DOMContentLoaded', function() {
  map = L.map('map-content').setView([37, 28], 7);

  L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    opacity: 0.3
  }).addTo(map);

  render()

  var selects = document.getElementsByTagName('select');
  for (var si in selects) {
    var select = selects[si];
    
    if (select.addEventListener) {
      select.addEventListener('change', function () {
        render()
      });
    };
  }
});

var getOptions = function () {
  return {
    maxDist: parseInt(document.getElementById('select-max-distance').value),
    noSteps: parseInt(document.getElementById('select-no-steps').value),
    circleSegmentAngle: parseInt(document.getElementById('select-angle').value),
    colors: {
      'Sarapis': '#ff7f00',
      'Isis': '#377eb8',
      'Apis': '#4daf4a',
      'Anubis': '#e41a1c' 
    },
    propertyName: 'deities'
  }
} 

var render = function () {
  console.log('render');
  var options = getOptions();

  console.log(options)

  if (map.hasLayer(carouselGroup)) {
    map.removeLayer(carouselGroup);
  }

  carouselGroup = L.carouselMarkerGroup(options); 

  var templesJson = L.geoJSON(temples);
  var templeLayers = templesJson.getLayers();

  carouselGroup.addLayers(templeLayers);

  carouselGroup.addTo(map)

  console.log(carouselGroup);

}