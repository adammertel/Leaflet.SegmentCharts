 /* Adam Mertel */

(function(exports, global) {
    L.CarouselMarkerGroup = L.FeatureGroup.extend({
        options: {
            maxDist: 6e4,
            noSteps: 10,
            circleSegmentAngle: 20,
            colors: {},
            propertyName: ""
        },
        initialize: function(options) {
            L.Util.setOptions(this, options);
            this.options.distStep = this.options.maxDist / this.options.noSteps;
            this.options.opacityStep = 1 / (this.options.maxDist / this.options.distStep);
            this._carousels = [];
            L.FeatureGroup.prototype.initialize.call(this, []);
        },
        _addCarousel: function(carousel) {
            var coordinates = carousel.getLatLng();
            var properties = carousel.feature.properties;
            var newCarouselOptions = L.extend(this.options, {
                coordinates: coordinates,
                sequences: properties[this.options.propertyName],
                group: this
            });
            var newCarousel = L.carouselMarker(newCarouselOptions);
            this._carousels.push(newCarousel);
            this.fire("layeradd", {
                layer: newCarousel
            });
        },
        addLayer: function(layer) {
            this.addLayers([ layer ]);
            this.redraw();
        },
        addLayers: function(layersArray) {
            for (var li in layersArray) {
                this._addCarousel(layersArray[li]);
            }
            this.redraw();
        },
        redraw: function() {
            this._clean();
            this._draw();
        },
        _clean: function() {
            console.log("_clean");
            for (var ci in this._carousels) {
                this._carousels[ci].clean();
            }
        },
        _draw: function() {
            console.log("_draw");
            var distStep = this.options.distStep;
            var maxDist = this.options.maxDist;
            var ci;
            for (var d = maxDist / distStep; d > 0; d--) {
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
    L.carouselMarkerGroup = function(options) {
        return new L.CarouselMarkerGroup(options);
    };
    L.CarouselMarker = L.FeatureGroup.extend({
        options: {},
        _getOpacity: function(distance) {
            return (1 / this.options.noSteps * (1 - Math.pow(distance / this.options.maxDist, 2))).toPrecision(6);
        },
        _makeCircle: function(distance, startAngle, endAngle, color) {
            var opacity = this._getOpacity(distance);
            return L.circle(this.options.coordinates, {
                startAngle: startAngle,
                stopAngle: endAngle,
                radius: distance,
                className: "carousel-sequence",
                fillColor: color,
                fillOpacity: opacity,
                interactive: false
            });
        },
        initialize: function(options) {
            L.Util.setOptions(this, options);
            L.FeatureGroup.prototype.initialize.call(this, []);
        },
        clean: function() {
            this.clearLayers();
        },
        drawCircle: function(distance) {
            var color;
            if (this.options.sequences.length == 1) {
                color = this.options.colors[this.options.sequences[0]];
                L.FeatureGroup.prototype.addLayer.call(this, this._makeCircle(distance, 0, 360, color).bringToFront());
            } else {
                for (var i = 0; i < 360 / this.options.circleSegmentAngle; i++) {
                    var sAngle = i * this.options.circleSegmentAngle;
                    var eAngle = this.options.circleSegmentAngle + sAngle;
                    var sequenceType = this.options.sequences[i % this.options.sequences.length];
                    color = this.options.colors[sequenceType];
                    L.FeatureGroup.prototype.addLayer.call(this, this._makeCircle(distance, sAngle, eAngle, color).bringToFront());
                }
            }
        }
    });
    L.carouselMarker = function(options) {
        return new L.CarouselMarker(options);
    };
    global[""] = exports;
})({}, function() {
    return this;
}());