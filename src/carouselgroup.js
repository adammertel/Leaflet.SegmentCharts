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
  
  addCarousel: function (carousel) {
    var coordinates = [carousel.geometry.coordinates[1], carousel.geometry.coordinates[0]];
    var properties = carousel.properties;

    var newCarouselOptions = L.extend(this.options, {
      coordinates: coordinates,
      sequences: properties[this.options.propertyName],
      group: this
    });

    var newCarousel = L.carouselMarker(newCarouselOptions);
    this._carousels.push(newCarousel);

    this.fire('layeradd', { layer: newCarousel });
    
    this.redraw();
  },

  redraw: function () {
    this._clean();
    this._draw();
  },

  _clean: function () {
    console.log('_clean');
    for (var ci in this._carousels) {
      this._carousels[ci].clean();
    }
  },

  _draw: function () {
    console.log('_draw');

    var distStep = this.options.distStep;
    var maxDist = this.options.maxDist;
    var ci;

    for (var d = maxDist/distStep; d > 0; d--) {
      var circleDist = d * distStep;

      for (ci in this._carousels) {
        this._carousels[ci].drawCircle(circleDist);
      }
    }

    for (ci in this._carousels) {
      L.FeatureGroup.prototype.addLayer.call(this, this._carousels[ci]);
    }

  }

});

L.carouselMarkerGroup = function (options) {
  return new L.CarouselMarkerGroup(options);
};