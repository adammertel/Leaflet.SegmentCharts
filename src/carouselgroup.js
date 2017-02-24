L.CarouselMarkerGroup = L.FeatureGroup.extend({
  options: {
    maxDist: 60000,
    noSteps: 10,
    circleSegmentAngle: 20
  },
  
  initialize: function (options) {
		L.Util.setOptions(this, options);

    this.options.distStep = this.options.maxDist/this.options.noSteps;
    this.options.opacityStep = 1/(this.options.maxDist/this.options.distStep);
    
    L.FeatureGroup.prototype.initialize.call(this, []);
  },
  
  addCarousel: function (carousel) {
    var coordinates = [carousel.geometry.coordinates[1], carousel.geometry.coordinates[0]];
    var properties = carousel.properties;
    var newCarousel = L.carouselMarker(L.extend(this.options, {
      coordinates: coordinates,
      properties: properties
    }));

    this.fire('layeradd', { layer: newCarousel });
    
    L.FeatureGroup.prototype.addLayer.call(this, newCarousel);
  }
});

L.carouselMarkerGroup = function (options) {
  return new L.CarouselMarkerGroup(options);
};