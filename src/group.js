L.SegmentMarkerGroup = L.FeatureGroup.extend({
  options: {
    maxDist: 60000,
    noSteps: 10,
    circleSegmentAngle: 20,
    colors: {},
    propertyName: '',
    opacityDecrease: 1,
    maxOpacity: 1,
  },
  
  initialize: function (options) {
		L.Util.setOptions(this, options);

    this.options.distStep = this.options.maxDist/this.options.noSteps;
    this.options.opacityStep = 1/(this.options.maxDist/this.options.distStep);

    this._markers = [];
    
    L.FeatureGroup.prototype.initialize.call(this, []);
  },
  
  _addMarker: function (marker) {
    const coordinates = marker.getLatLng();
    const properties = marker.feature.properties;

    const sequenceNames = properties[this.options.propertyName];

    if(sequenceNames.length > 0) {
      sequenceNames.sort();
      const sequenceColors = sequenceNames.map(sequenceName => this.options.colors[sequenceName]);

      const newMarkerOptions = L.extend(this.options, {
        coordinates: coordinates,
        sequences: sequenceColors,
        group: this
      });

      const newMarker = L.segmentMarker(newMarkerOptions);
      this._markers.push(newMarker);

      this.fire('layeradd', { layer: newMarker });
    }

  },

  addLayer: function (layer) {
    this.addLayers([layer]);
  },

  addLayers: function (layersArray) {
    for (var li in layersArray) {
      this._addMarker(layersArray[li]);
    }
    this.redraw();
  },

  redraw: function () {
    this._clean();
    this._draw();
  },

  _clean: function () {
    console.log('_clean');
    this._markers.map(marker => marker.clean());
  },

  _draw: function () {
    console.log('_draw');

    var distStep = this.options.distStep;
    var maxDist = this.options.maxDist;
    var ci;

    for (var d = maxDist/distStep; d > 0; d--) {
      var circleDist = d * distStep;
      this._markers.map(marker => marker.drawCircle(circleDist));
    }

    for (ci in this._markers) {
      L.FeatureGroup.prototype.addLayer.call(this, this._markers[ci]);
    }
  }

});

L.segmentMarkerGroup = function (options) {
  return new L.SegmentMarkerGroup(options);
};