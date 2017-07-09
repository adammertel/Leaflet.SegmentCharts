L.SegmentMarker = L.FeatureGroup.extend({
  options: {
    opacities: {}
  },

  initialize: function (options) {
		L.Util.setOptions(this, options);

    for (let i = 1; i <= this.options.noSteps; i++) {
      this.options.opacities[i] = this._getOpacity(i);
    }
    
    L.FeatureGroup.prototype.initialize.call(this, []);
  },
  
  _getOpacity: function (order) {
    const stepOpacity = this.options.maxOpacity / this.options.noSteps;
    
    // coefficient
    const cx = this.options.noSteps / 2 - order + 0.5;

    const opacity = stepOpacity + cx * this.options.opacityDecrease * stepOpacity;
    return opacity.toPrecision(6);
  },
  
  _makeCircle: function (distance, startAngle, endAngle, color) {
    const sequenceOrder = distance / (this.options.maxDist / this.options.noSteps);
    const opacity = this.options.opacities[sequenceOrder];

    return L.circle(
      this.options.coordinates, 
      {
        startAngle: startAngle,
        stopAngle: endAngle,
        radius: distance, 
        className: 'segment-sequence',
        fillColor: color, 
        fillOpacity: opacity,
        interactive: false
      }
    );
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

L.segmentMarker = function (options) {
	return new L.SegmentMarker(options);
};