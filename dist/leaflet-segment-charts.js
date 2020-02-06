/*
  leaflet segnment-charts plugin
  github https://github.com/adammertel/Leaflet.SegmentCharts
  demo https://github.com/adammertel/Leaflet.SegmentCharts
  Adam Mertel
*/
"use strict";L.SegmentMarkerGroup=L.FeatureGroup.extend({options:{maxDist:60000,noSteps:10,circleSegmentAngle:20,colors:{},propertyName:"",opacityDecrease:1,maxOpacity:1},initialize:function a(b){L.Util.setOptions(this,b);this.options.distStep=this.options.maxDist/this.options.noSteps;this.options.opacityStep=1/(this.options.maxDist/this.options.distStep);this._markers=[];L.FeatureGroup.prototype.initialize.call(this,[])},_addMarker:function a(b){var c=this;var d=b.getLatLng();var e=b.feature.properties;var f=e[this.options.propertyName];if(f.length>0){f.sort();var g=f.map(function(a){return c.options.colors[a]});var h=L.extend(this.options,{coordinates:d,sequences:g,group:this});var i=L.segmentMarker(h);this._markers.push(i);this.fire("layeradd",{layer:i})}},addLayer:function a(b){this.addLayers([b])},addLayers:function a(b){for(var c in b){this._addMarker(b[c])}this.redraw()},redraw:function a(){this._clean();this._draw()},_clean:function a(){this._markers.map(function(a){return a.clean()})},_draw:function a(){var b=this.options.distStep;var c=this.options.maxDist;for(var e=c/b;e>0;e--){var f=e*b;for(var g in this._markers){var h=this._markers[g];h.drawCircle(f)}}for(var i in this._markers){L.FeatureGroup.prototype.addLayer.call(this,this._markers[i])}}});L.segmentMarkerGroup=function(a){return new L.SegmentMarkerGroup(a)};"use strict";L.SegmentMarker=L.FeatureGroup.extend({options:{opacities:{}},initialize:function a(b){L.Util.setOptions(this,b);for(var c=1;c<=this.options.noSteps;c++){this.options.opacities[c]=this._getOpacity(c)}L.FeatureGroup.prototype.initialize.call(this,[])},_getOpacity:function a(b){var c=this.options.maxOpacity/this.options.noSteps;// coefficient
var d=this.options.noSteps/2-b+0.5;var e=c+d*this.options.opacityDecrease*c;return e.toPrecision(6)},_makeCircle:function a(b,c,d,e){var f=b/(this.options.maxDist/this.options.noSteps);var g=this.options.opacities[f];return L.semiCircle(this.options.coordinates,{startAngle:c,stopAngle:d,radius:b,className:"segment-sequence",fillColor:e,fillOpacity:g,interactive:false})},clean:function a(){this.clearLayers()},drawCircle:function a(b){// only one sequence
if(this.options.sequences.length===1){var c=this.options.sequences[0];L.FeatureGroup.prototype.addLayer.call(this,this._makeCircle(b,0,360,c).bringToFront())}// more sequences
else{for(var d=0;d<360/this.options.circleSegmentAngle;d++){var e=d*this.options.circleSegmentAngle;var f=this.options.circleSegmentAngle+e;var g=this.options.sequences[d%this.options.sequences.length];L.FeatureGroup.prototype.addLayer.call(this,this._makeCircle(b,e,f,g))}}}});L.segmentMarker=function(a){return new L.SegmentMarker(a)};
