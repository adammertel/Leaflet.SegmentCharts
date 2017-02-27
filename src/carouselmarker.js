L.CarouselMarker = L.FeatureGroup.extend({
  options: {
  },
  
  _getOpacity: function (distance) {
    return (1/this.options.noSteps *  (1 - Math.pow(distance/this.options.maxDist, 1.4))).toPrecision(6);
  },
  
  _makeCircle: function (distance, startAngle, endAngle, color) {
    var opacity = this._getOpacity(distance);
    //console.log(distance + ' - ' + opacity);
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

    var distStep = this.options.distStep;
    
    for (var d = this.options.maxDist/distStep; d > 0; d--) {
      
      var distance = d * distStep;
      var dColor;

      if (this.options.sequences.length == 1) {
        
        dColor = this.options.colors[this.options.sequences[0]];
        this.options.group.addLayer(this._makeCircle(distance, 0, 360, dColor).bringToFront());

      }else{
        for (var i = 0; i < 360/this.options.circleSegmentAngle; i++) {
          var sAngle = i * this.options.circleSegmentAngle;
          var eAngle = this.options.circleSegmentAngle + sAngle;
          var tDeity = this.options.sequences[i%this.options.sequences.length];
          dColor = this.options.colors[tDeity];

          L.FeatureGroup.prototype.addLayer.call(this, this._makeCircle(distance, sAngle, eAngle, dColor).bringToFront());
        }
      }
    }
  }
});

L.carouselMarker = function (options) {
	return new L.CarouselMarker(options);
};