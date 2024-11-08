
import React, { useEffect, useRef } from 'react';

import 'ol/ol.css';
import { Map, View } from 'ol';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import { Feature } from 'ol';
import { Point } from 'ol/geom';
import { Icon, Style } from 'ol/style';
import { fromLonLat } from 'ol/proj';
import { GoogleSatelliteMapProvider } from '../LocationPlugin/Providers/GoogleMapProvider';
import '../Styles/MapComponent.css'
const position = [78.126737,17.6017851];

const MapComponent = () => {
  const mapRef = useRef(null);

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

    const addMarker = (lon, lat) => {
      const markerCoordinates = fromLonLat([lon, lat]);

      // Create a feature to represent the marker
      const markerFeature = new Feature({
        geometry: new Point(markerCoordinates),
      });

      // Style the marker
      markerFeature.setStyle(
        new Style({
          image: new Icon({
            anchor: [0.5, 1],
            src: 'https://openlayers.org/en/latest/examples/data/icon.png', // Custom icon URL
          }),
        })
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
    addMarker(78.126737,17.6017851);

    return () => map.setTarget(null);
  }, []);

  return <div ref={mapRef} className='map-component' />;

  
  };

export default MapComponent;


