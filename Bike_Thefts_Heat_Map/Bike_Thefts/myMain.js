"use strict"; // JS strict mode 

var myFunctionHolder = {}
//declaring function addPopups
myFunctionHolder.addPopups = function (feature, layer) {
    //this if statement used to check whether the feature has a property named "Location"
    if (feature.properties && feature.properties.Location) {
    layer.bindPopup(feature.properties.Location);
    }
}

//declaring function pointToCircle
myFunctionHolder.pointToCircle = function(feature, latlng) {
    var geojsonMarkerOptions = {
    radius: 8,
    //fillColor: "#F46B06",
    fillColor: "yellow",
    color: "black",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
    };
    var circleMarker = L.circleMarker(latlng, geojsonMarkerOptions);
    return circleMarker;
}
// Execture only when window is fully loaded
window.onload = function () {
    var mapObject = L.map('mapId').setView([39.99, -75.16], 11);
    var cfg = {
        // radius should be small ONLY if scaleRadius is true (or small radius is intended)
        // if scaleRadius is false it will be the constant radius used in pixels
        "radius": 0.01,
        "maxOpacity": .8,
        // scales the radius based on map zoom
        "scaleRadius": true,
        // if set to false the heatmap uses the global maximum for colorization
        // if activated: uses the data maximum within the current map boundaries
        //   (there will always be a red spot with useLocalExtremas true)
        "useLocalExtrema": true,
        // which field name in your data represents the latitude - default "lat"
        latField: 'lat',
        // which field name in your data represents the longitude - default "lng"
        lngField: 'lng',
        // which field name in your data represents the data value - default "value"
        valueField: 'value'
      };
    var heatmapLayer = new HeatmapOverlay(cfg);
    heatmapLayer.setData(theftsHeatMapData);
    mapObject.addLayer(heatmapLayer);

    var baseMap = L.tileLayer('https://api.mapbox.com/styles/v1/liping17/cj6ut4r6u1vnw2rmrtwymq5lq/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibGlwaW5nMTciLCJhIjoiY2o2dTJwYTJ0MG1wdzMzbzRrNDJlOG5jbyJ9.cr8HRltBug7xDGgTV_X__A', {
        maxZoom: 18,
        attribution: '&copy; <a href=”https://www.mapbox.com/about/maps/”>Mapbox</a> &copy; <a href=”http://www.openstreetmap.org/copyright”>OpenStreetMap</a>'
    });
    
    baseMap.addTo(mapObject);
    
    // bikeThefts is the variable name we defined in Bike_Thefts_2011.js file. 
    // var bikesLayerGroup = L.geoJSON(bikeThefts, {
    //     onEachFeature: myFunctionHolder.addPopups,
    //     pointToLayer: myFunctionHolder.pointToCircle
    // });
    
    // mapObject.addLayer(bikesLayerGroup);
    // mapObject.fitBounds(bikesLayerGroup.getBounds());
};
