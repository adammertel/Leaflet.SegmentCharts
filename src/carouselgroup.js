L.CarouselMarkerGroup = L.FeatureGroup.extend({
  options: {
    maxDist: 60000,
    noSteps: 10,
    circleSegmentAngle: 20,
    colors: {},
    propertyName: ''
  },
  
  initialize: function (options) {
		L.Util.setOptions(this, options);

    this.options.distStep = this.options.maxDist/this.options.noSteps;
    this.options.opacityStep = 1/(this.options.maxDist/this.options.distStep);

    this._carousels = [];
    
    L.FeatureGroup.prototype.initialize.call(this, []);
  },
  
  _addCarousel: function (carousel) {
    const coordinates = carousel.getLatLng();
    const properties = carousel.feature.properties;

    const newCarouselOptions = L.extend(this.options, {
      coordinates: coordinates,
      sequences: properties[this.options.propertyName],
      group: this
    });

    const newCarousel = L.carouselMarker(newCarouselOptions);
    this._carousels.push(newCarousel);

    this.fire('layeradd', { layer: newCarousel });
  },

  addLayer: function (layer) {
    this.addLayers([layer]);
  },

  addLayers: function (layersArray) {
    for (var li in layersArray) {
      this._addCarousel(layersArray[li]);
    }
    this.redraw();
  },

  redraw: function () {
    this._clean();
    this._draw();
  },

  _clean: function () {
    console.log('_clean');
    this._carousels.map(carousel => carousel.clean());
  },

  _draw: function () {
    console.log('_draw');

    var distStep = this.options.distStep;
    var maxDist = this.options.maxDist;
    var ci;

    for (var d = maxDist/distStep; d > 0; d--) {
      var circleDist = d * distStep;
      this._carousels.map(carousel => carousel.drawCircle(circleDist));
    }

    for (ci in this._carousels) {
      L.FeatureGroup.prototype.addLayer.call(this, this._carousels[ci]);
    }
  }

});

L.carouselMarkerGroup = function (options) {
  return new L.CarouselMarkerGroup(options);
};