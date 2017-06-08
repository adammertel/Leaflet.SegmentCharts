L.CarouselMarker = L.FeatureGroup.extend({
  options: {
  },
  
  _getOpacity: function (distance) {
    return (Math.pow((1/this.options.noSteps * (1 - Math.pow(distance/this.options.maxDist, 2))), this.options.opacityDecrease)).toPrecision(6);
  },
  
  _makeCircle: function (distance, startAngle, endAngle, color) {
    var opacity = this._getOpacity(distance);
    //console.log(distance + ' - ' + opacity);
    //opacity = 1/this.options.noSteps;
    return L.circle(
      this.options.coordinates, 
      {
        startAngle: startAngle,
        stopAngle: endAngle,
        radius: distance, 
        className: 'carousel-sequence',
        fillColor: color, 
        fillOpacity: opacity,
        interactive: false
      }
    );
  },
  
  initialize: function (options) {
		L.Util.setOptions(this, options);
    
    L.FeatureGroup.prototype.initialize.call(this, []);
  },

  clean: function () {
    this.clearLayers();
  },

  drawCircle: function (distance) {
    // only one sequence
    if (this.options.sequences.length === 1) {
      const color = this.options.sequences[0];
      L.FeatureGroup.prototype.addLayer.call(this, this._makeCircle(distance, 0, 360, color).bringToFront());
    }
    // more sequences
    else{
      for (var i = 0; i < 360/this.options.circleSegmentAngle; i++) {
        const sAngle = i * this.options.circleSegmentAngle;
        const eAngle = this.options.circleSegmentAngle + sAngle;
        const color = this.options.sequences[i % this.options.sequences.length];

        L.FeatureGroup.prototype.addLayer.call(this, this._makeCircle(distance, sAngle, eAngle, color).bringToFront());
      }
    }
  }
});

L.carouselMarker = function (options) {
	return new L.CarouselMarker(options);
};