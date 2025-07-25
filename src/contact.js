// CSS Imports
import "./styles/default-reset.css";
import "./styles/styles.css";
import "./styles/header-styles.css";
import "./styles/contact-us-styles.css";
import "./styles/text-underline-animation.css";
import "./styles/why-choose-us.css";
import "./styles/footer.css";
import "./styles/util-styles.css";
// JS Imports
import "./scripts/header";
import "./scripts/loader";

// import 'ol/ol.css';
// import Map from 'ol/Map';
// import View from 'ol/View';
// import TileLayer from 'ol/layer/Tile';
// import OSM from 'ol/source/OSM';
// import { fromLonLat } from 'ol/proj';

// const map = new Map({
//   target: 'map-embed',
//   layers: [
//     new TileLayer({
//       source: new OSM(),
//     }),
//   ],
//   view: new View({
//     center: fromLonLat([80.946167, 26.846695]), // lon, lat
//     zoom: 14,
//   }),
// });


import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import Overlay from 'ol/Overlay';
import Control from 'ol/control/Control';

// 🔹 Lucknow Coordinates
const lon = 80.946167;
const lat = 26.846695;
const coordinates = fromLonLat([lon, lat]);

// 📍 Marker Feature
const marker = new Feature({
  geometry: new Point(coordinates),
});

marker.setStyle(
  new Style({
    image: new Icon({
      anchor: [0.5, 1],
      src: 'https://openlayers.org/en/latest/examples/data/icon.png',
    }),
  })
);

// 🧭 Marker Layer
const markerLayer = new VectorLayer({
  source: new VectorSource({
    features: [marker],
  }),
});

// 🗺️ Base Map Layer (OpenStreetMap)
const mapLayer = new TileLayer({
  title: 'Map',
  type: 'base',
  visible: true,
  source: new OSM(),
});

// 🛰️ Satellite Imagery (ESRI)
const satelliteLayer = new TileLayer({
  title: 'Satellite',
  type: 'base',
  visible: false,
  source: new XYZ({
    url: 'https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attributions: 'Imagery © Esri',
  }),
});

// 🏷️ Labels Layer (ESRI)
const labelLayer = new TileLayer({
  title: 'Labels',
  visible: false,
  source: new XYZ({
    url: 'https://services.arcgisonline.com/arcgis/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}',
    attributions: 'Labels © Esri',
  }),
});

// 🗺️ Map Initialization
const map = new Map({
  target: 'map-embed',
  layers: [mapLayer, satelliteLayer, labelLayer, markerLayer],
  view: new View({
    center: coordinates,
    zoom: 14,
  }),
});

// 💬 Popup Element
const popupElement = document.createElement('div');
popupElement.id = 'map-popup';
popupElement.style.cssText = `
  background: white;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  min-width: 160px;
  font-size: 14px;
  position: relative;
  bottom: 12px;
`;

popupElement.innerHTML = `
  <strong>Lucknow</strong><br>
  <a href="https://www.google.com/maps?q=26.846695,80.946167" target="_blank" style="color: #007bff; text-decoration: none;">
    Open in Google Maps
  </a>
`;

document.body.appendChild(popupElement);

// 🔧 Move Zoom Buttons to Bottom Right
const zoomControlStyle = document.createElement('style');
zoomControlStyle.textContent = `
  .ol-zoom {
    top: auto !important;
    left: auto !important;
    right: 8px;
    bottom: 8px;
    flex-direction: column;
  }
`;
document.head.appendChild(zoomControlStyle);

const attributionControlStyle = document.createElement('style');
attributionControlStyle.textContent = `
  .ol-attribution {
    bottom: 8px !important;
    left: 8px !important;
    right: auto !important;
  }
`;
document.head.appendChild(attributionControlStyle);


const popupOverlay = new Overlay({
  element: popupElement,
  positioning: 'bottom-center',
  stopEvent: false,
  offset: [0, -35],
});
map.addOverlay(popupOverlay);

// 👆 Show Popup on Marker Click
map.on('click', (event) => {
  const feature = map.forEachFeatureAtPixel(event.pixel, f => f);
  if (feature === marker) {
    popupOverlay.setPosition(coordinates);
    popupElement.style.display = 'block';
  } else {
    popupElement.style.display = 'none';
  }
});

// 🔀 Custom Control: Satellite View Toggle
const toggleControlElement = document.createElement('div');
toggleControlElement.className = 'ol-unselectable ol-control';
toggleControlElement.style.cssText = `
  background: white;
  border: 1px solid #ccc;
  padding: 4px 8px;
  margin-top: 8px;
  margin-left: 8px;
  border-radius: 4px;
  font-size: 13px;
  cursor: pointer;
  user-select: none;
`;
toggleControlElement.innerText = 'Satellite View';

let satelliteOn = false;

toggleControlElement.addEventListener('click', () => {
  satelliteOn = !satelliteOn;
  mapLayer.setVisible(!satelliteOn);
  satelliteLayer.setVisible(satelliteOn);
  labelLayer.setVisible(satelliteOn);
  toggleControlElement.innerText = satelliteOn ? 'Map View' : 'Satellite View';
});

// Add Control to Map
const toggleControl = new Control({
  element: toggleControlElement,
});
map.addControl(toggleControl);
