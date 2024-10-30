
import React, { useEffect, useRef } from 'react';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
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

    return () => map.setTarget(null);
  }, []);

  return <div ref={mapRef} className='map-component' />;

  
  };

export default MapComponent;


