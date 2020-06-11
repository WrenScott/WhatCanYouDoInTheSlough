// Allow usage of 'const' for instantiating varibles that can't be overwritten 
'use strict';

// Create the map 
const map = L.map('map', {
    center: [45.567899, -122.599403],
    zoom: 11.75
});

// Create basemap variables and add ESRI gray as default
const gray = L.esri.basemapLayer('Gray').addTo(map);
const darkGray = L.esri.basemapLayer('DarkGray');
const streets = L.esri.basemapLayer('Streets');
const natGeo = L.esri.basemapLayer('NationalGeographic');

// Basemaps object for layer control 
const baseMaps = {
    "Gray": gray,
    "Dark Gray": darkGray,
    "Streets": streets,
    "National Geographic": natGeo
};

// Feature layer URL variables
const cswURL = 'https://services8.arcgis.com/tblHe99qQFMcNzpC/arcgis/rest/services/CSWC_Interactive_Map_WFL1/FeatureServer/17/';
const orcaURL = 'https://services8.arcgis.com/tblHe99qQFMcNzpC/arcgis/rest/services/CSWC_Interactive_Map_WFL1/FeatureServer/16/';
const waterFeaturesURL = 'https://services8.arcgis.com/tblHe99qQFMcNzpC/arcgis/rest/services/CSWC_Interactive_Map_WFL1/FeatureServer/15/';
const streamCrtlnURL = 'https://services8.arcgis.com/tblHe99qQFMcNzpC/arcgis/rest/services/CSWC_Interactive_Map_WFL1/FeatureServer/14/';
const citiesURL = 'https://services8.arcgis.com/tblHe99qQFMcNzpC/arcgis/rest/services/CSWC_Interactive_Map_WFL1/FeatureServer/11/';
const majArtURL = 'https://services8.arcgis.com/tblHe99qQFMcNzpC/arcgis/rest/services/CSWC_Interactive_Map_WFL1/FeatureServer/10/';
const bikeRouteURL = 'https://services8.arcgis.com/tblHe99qQFMcNzpC/arcgis/rest/services/CSWC_Interactive_Map_WFL1/FeatureServer/8/';
const trailsURL = 'https://services8.arcgis.com/tblHe99qQFMcNzpC/arcgis/rest/services/CSWC_Interactive_Map_WFL1/FeatureServer/7/';
const cswtURL = 'https://services8.arcgis.com/tblHe99qQFMcNzpC/arcgis/rest/services/CSWC_Interactive_Map_WFL1/FeatureServer/6/';
const busstopsURL = 'https://services8.arcgis.com/tblHe99qQFMcNzpC/arcgis/rest/services/CSWC_Interactive_Map_WFL1/FeatureServer/4/';
const trailheadsURL = 'https://services8.arcgis.com/tblHe99qQFMcNzpC/arcgis/rest/services/CSWC_Interactive_Map_WFL1/FeatureServer/3/';
const launchURL = 'https://services8.arcgis.com/tblHe99qQFMcNzpC/arcgis/rest/services/CSWC_Interactive_Map_WFL1/FeatureServer/2/';
const portageURL = 'https://services8.arcgis.com/tblHe99qQFMcNzpC/arcgis/rest/services/CSWC_Interactive_Map_WFL1/FeatureServer/1/';

// Feature layerr for Columbia Slough Watershed (CSW)
const Columbia_Slough_Watershed = L.esri.featureLayer({
    url: cswURL
}).addTo(map);

// Create pane for ORCA_CSW
map.createPane('orca');

// Feature layer for Outdoor Recreation and Conservation Areas (ORCA) that are within the CSW 
const ORCA_CSW = L.esri.featureLayer({
    url: orcaURL,
    pane: 'orca'
}).addTo(map);

// Popup for ORCA 
const ORCA_popUp = ORCA_CSW.bindPopup(function (evt) {
    return L.Util.template('<b>{SITENAME}</b><hr><p>This site is a {UNITTYPE} owned by {OWNLEV3}.</p>', evt.feature.properties);
});

// Create pane for water features
map.createPane('water');

// Feature layer for water features
const Water_Features = L.esri.featureLayer({
    url: waterFeaturesURL,
    pane: 'water'
}).addTo(map);

// Feature Layer for stream centerlines within the CSW
const Stream_Centerlines_CSW = L.esri.featureLayer({
    url: streamCrtlnURL,
    pane: 'water'
}).addTo(map);

// Feature layer for city boundaries that intersect the CSW
const Cities_CSW = L.esri.featureLayer({
    url: citiesURL
}).addTo(map);

// Feature layer for major arterials
const Major_Arterials = L.esri.featureLayer({
    url: majArtURL
}).addTo(map);

// Feature layer for bike routes within the Portland Metro Area
const bikeRoutes_PDXMetro = L.esri.featureLayer({
    url: bikeRouteURL,
    maxZoom: 19,
    minZoom: 13
}).addTo(map);

// Create pane for Trails_CSW
map.createPane('trails');

// Feature layer for trais within the CSW
const Trails_CSW = L.esri.featureLayer({
    url: trailsURL,
    pane: 'trails',
    maxZoom: 19,
    minZoom: 13
}).addTo(map);

// Feature layer for Columbia Slough Water Trail
const CS_waterTrail = L.esri.featureLayer({
    url: cswtURL,
    pane: 'trails',
    maxZoom: 19,
    minZoom: 13
}).addTo(map);

// Creating custom marker icon for trailheads
const trailsIcon = L.icon({
    iconUrl: 'assets/trailheadIcon.svg',
    iconSize: [25, 35]
});

// Feature layer for trailheads within CSW
const Trailheads_CSW = L.esri.Cluster.featureLayer({
    url: trailheadsURL,
    maxZoom: 19,
    minZoom: 13,
    pointToLayer: function(geojson, latlng) {
        return L.marker(latlng, {
            icon: trailsIcon
        });
    }
}).addTo(map);

const trailheadsPopUp = Trailheads_CSW.bindPopup(function (evt) {
    return L.Util.template('<b>Trail Name</b>: {TRAILNAME}<hr><b>Trail Surface</b>: {TRLSURFACE}<hr><b>Hike?</b> {HIKE}<hr><b>Road Bike?</b> {ROADBIKE}<hr><b>Mountain Bike?</b> {MTNBIKE}<hr><b>Miles</b>: {MILEAGE}', evt.feature.properties);
});

// Creating custom marker icon for paddle launches
const launchIcon = L.icon({
    iconUrl: 'assets/paddleLaunchIcon.svg',
    iconSize: [25, 35]
});

// Feature layer for paddling launch sites
const paddlingLaunches = L.esri.featureLayer({
    url: launchURL,
    maxZoom: 19,
    minZoom: 13,
    ignoreRenderer: true,
    pointToLayer: function(geojson, latlng) {
        return L.marker(latlng, {
            icon: launchIcon
        });
    }
}).addTo(map);

// Paddling launch popup 
const launchPopUp = paddlingLaunches.bindPopup(function (evt) {
    return L.Util.template('<b>Site Name</b>: {siteName}<hr><b>Address</b>: {address}<hr><b>Type</b>: {type}<hr><b>Owner</b>: {owner}<hr><b>Parking?</b> {parking}<hr><b>Restrooms?</b> {restrooms}<hr><b>Drinking water? {drinkingWater}<hr><b>ADA Acessible?</b> {ADAacessible}<hr><i>{description}</i>', evt.feature.properties);
});

// Feature layer for portage sites
const portageSites = L.esri.featureLayer({
    url: portageURL,
    maxZoom: 19,
    minZoom: 13
}).addTo(map);

// Portage site popup 
const portagePopUp = portageSites.bindPopup(function (evt) {
    return L.Util.template('<b>Site Name</b>: {siteName}<hr><b>Slough Section</b>: {sloughSection}<hr><b>Type</b>: {type}', evt.feature.properties);
});

// Feature layer for TriMet bus stops within the CSW
const busStops_CSW = L.esri.featureLayer({
    url: busstopsURL,
    maxZoom: 19,
    minZoom: 16
}).addTo(map);

// Create toggleable feature layer object 
const toggleFL = {
    "Bike Routes": bikeRoutes_PDXMetro,
    "Trails": Trails_CSW,
    "Columbia Slough Water Trail": CS_waterTrail,
    "Trailheads": Trailheads_CSW,
    "Paddling Launch Sites": paddlingLaunches,
    "Portage Sites": portageSites,
};

// Control for basemaps and feature layers
L.control.layers(baseMaps, toggleFL).addTo(map);

// Adds interactivity to legend div on navbar to toggle right-hand 
// legend in and out of view
function toggleSidePane() {
    document.getElementById("right-pane").classList.toggle("active");
};

// Welcome to the webmap alert message
function welcomeMessage(){
    alert("The Columbia Slough is a narow waterway in the floodplane of the Columbia River, about 19 miles long. Within its watershed there are many recreation oppertunities. This map aims to communicate all there is to offer in the Slough. Pan, zoom and select features for more information.");
}; 