
import React, { useContext, useEffect, useRef, useState } from 'react';

import 'ol/ol.css';
import { Map, View} from 'ol';
import { Tile as TileLayer} from 'ol/layer';
import { fromLonLat, toLonLat } from 'ol/proj';
import { GoogleSatelliteMapProvider } from '../LocationPlugin/Providers/GoogleMapProvider';
import '../Styles/MapComponent.css'
import  Marker  from './Markers';
import { AppContext } from '../Context/AppContext';
import Bridge from '../Networking/Bridge';
const position = [78.126737,17.6017851];

const WaypointMap = ({waypoints,Add,setAdd, Delete, setDelete}) => {
  const {selectedDrones, addSelected} = useContext(AppContext);
  const mapRef = useRef(null);
  const lable = useRef(0);
  
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
    map.on('click', (event) => {
        const [lon,lat] = toLonLat(event.coordinate);
        
            let nlable = lable.current + 1;
            lable.current = nlable;
            waypoints.current[lable.current] = {'lon': lon,'lat': lat, 'alt': 10}
            marker.addMarker(lon,lat,String(lable.current));
            console.log(waypoints)
    })
    
    return () => map.setTarget(null);
  }, []);

  return <div>
          <div ref={mapRef} className="map-component" />
        </div>

  
  };

export default WaypointMap;


