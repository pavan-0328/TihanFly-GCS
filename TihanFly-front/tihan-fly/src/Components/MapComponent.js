
import React, { useContext, useEffect, useRef, useState } from 'react';

import 'ol/ol.css';
import { Map, View} from 'ol';
import { Tile as TileLayer} from 'ol/layer';
import { fromLonLat } from 'ol/proj';
import { GoogleSatelliteMapProvider } from '../LocationPlugin/Providers/GoogleMapProvider';
import '../Styles/MapComponent.css'
import  Marker  from './Markers';
import { AppContext } from '../Context/AppContext';
import Bridge from '../Networking/Bridge';
const position = [78.126737,17.6017851];

const MapComponent = () => {
  const {selectedDrones, addSelected} = useContext(AppContext);
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
    const marker = new Marker(map);
    const bridge = new Bridge();
    const fetchDroneLocations = async () => {
      try {
        console.log(selectedDrones);
        const droneRes = await bridge.send({}, "GET_LOCATION", selectedDrones);
        for (const res of droneRes) {
            const data = res;
            const loc = data["loc"];
            marker.addMarker(loc["lon"], loc["lat"], data["id"]);
        }
      } catch (error) {
        console.error("Error fetching drone locations:", error);
      }
    };
  
    fetchDroneLocations();
    return () => map.setTarget(null);
  }, [selectedDrones]);

  return <div>
          <div ref={mapRef} className="map-component" />
        </div>

  
  };

export default MapComponent;


