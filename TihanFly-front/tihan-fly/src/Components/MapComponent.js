
import React, { useEffect, useRef, useState } from 'react';

import 'ol/ol.css';
import { Map, View} from 'ol';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import { Feature } from 'ol';
import { Point } from 'ol/geom';
import { Icon, Style,Fill,Text } from 'ol/style';
import { fromLonLat } from 'ol/proj';
import { createStringXY } from 'ol/coordinate';
import { MousePosition } from 'ol-react/lib/control';
import { GoogleSatelliteMapProvider } from '../LocationPlugin/Providers/GoogleMapProvider';
import '../Styles/MapComponent.css'

import Pin from '../Assets/placeholder.png'

const position = [78.126737,17.6017851];

const MapComponent = () => {
  const mapRef = useRef(null);
  const [mapCenter, setMapCenter] = useState([]);

  useEffect(() => {
    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new GoogleSatelliteMapProvider()
        })
      ],
      view: new View({
        center: fromLonLat(position),
        zoom: 22
      })
    });

    
    const addMarker = (lon, lat,label) => {
      const markerCoordinates = fromLonLat([lon, lat]);

      // Create a feature to represent the marker
      const markerFeature = new Feature({
        geometry: new Point(markerCoordinates),
      });

      // Style the marker
      markerFeature.setStyle(
        new Style({
          image: new Icon({
            anchor: [0.5,1],
            scale:0.1,
            src: Pin
          }),
          text: new Text({
            text: label,
            offsetY: -31,
            // Adjusts the label's vertical position relative to the marker
            fill: new Fill({ color: '#000' }),  // Text color
            font: '20px sans-serif',
          }),
        }),
       
      );

      // Create a vector source and layer to hold the marker
      const vectorSource = new VectorSource({
        features: [markerFeature],
      });

      const markerLayer = new VectorLayer({
        source: vectorSource,
      });

      // Add the marker layer to the map
      map.addLayer(markerLayer);
    };
    
    // Example: Add a marker at specified coordinates
    addMarker(78.126737,17.6017851,"1");
    addMarker(78.126746,17.6017851,"2");
    addMarker(78.126746,17.6018881,"3");

    return () => map.setTarget(null);
  }, []);

  return<div>
        <div ref={mapRef} className='map-component' />
        <div id="mouse-position" style={{ padding: '10px', fontSize: '14px' }}>Mouse position: </div>
      </div>;

  
  };

export default MapComponent;


