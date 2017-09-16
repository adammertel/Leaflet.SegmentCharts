# leaflet-segment-charts

## dependencies
 - [leaflet 1.2.0](leafletjs.com)
 - [leaflet-semicircle 2.0.2 ](https://github.com/jieter/Leaflet-semicircle)


## methods
 - **addLayer** (L.geoJSON.feature)
 - **addLayers** (L.geoJSON)


## options
  - **maxDist** (int) maximal distance of each marker,
  - **maxOpacity** (float) opacity of the inner circle,
  - **opacityDecrease** (float) coefficient that represents the pace of opacity decrease of outer circles/steps,
  - **noSteps** (int) - number of innercircles,
  - **circleSegmentAngle** (int) - angle of sequence
  - **propertyName** (String) - name of property to sequence marker (value of this property has to be array)
  - **colors** (Object) - key-value pairs of property values and particular segment colors


## todo
 - input control
 - maxDist based on property
 - better documentation
 - opacity control
 - better solution for sequence angles
 - ...


## demo
 - [demo](https://adammertel.github.io/leaflet-segments-charts/demo/)


 
