document.addEventListener('DOMContentLoaded', function() {
  var map = L.map('map').setView([37, 28], 7);

  L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    opacity: 0.3
  }).addTo(map);

  console.log(temples)

  const carousel = L.carouselMarkerGroup({
    maxDist: 60000,
    noSteps: 10,
    circleSegmentAngle: 20,
    colors: {
      'Sarapis': '#66c2a5',
      'Isis': '#fc8d62',
      'Apis': '#8da0cb',
      'Anubis': '#e78ac3' 
    },
    propertyName: 'deities'
  })

  temples.features.map( (temple, ti) => {
    carousel.addCarousel(temple)
  })
  carousel.addTo(map)


});