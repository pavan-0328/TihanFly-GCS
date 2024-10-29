/*import React, { useRef, useEffect, useState } from 'react';
import { GoogleSatelliteMapProvider } from '../LocationPlugin/Providers/GoogleMapProvider';

const MapComponent = () => {
  const canvasRef = useRef(null);
  const tileSize = 256; // Tile size (256x256 pixels)

  // Visible grid size (3x3 tiles) + Extra tiles for preloading (2 on each side)
  const visibleGridSize = 4;
  const preloadBuffer = 0; // Extra rows/columns of tiles to load outside the view
  const totalGridSize = visibleGridSize + 2 * preloadBuffer; // Total size with preloading

  const googleMapProvider = new GoogleSatelliteMapProvider();

  // State to track zoom level and map center (lat, lon)
  const [zoomLevel, setZoomLevel] = useState(20);
  const [center, setCenter] = useState({ lat: 17.601906, lon: 78.126869 });

  // State to track panning
  const [isDragging, setIsDragging] = useState(false);
  const [startDrag, setStartDrag] = useState(null);

  // Cache object to store loaded tiles
  const tileCache = useRef({});

  // Function to convert latitude and longitude to tile coordinates
  const latLonToTileXY = (lat, lon, z) => {
    const n = Math.pow(2, z); // Number of tiles at the specified zoom level

    const tileX = Math.floor(n * ((lon + 180) / 360)); // X coordinate
    const latRad = (lat * Math.PI) / 180.0; // Latitude in radians
    const tileY = Math.floor(
      (1.0 - Math.log(Math.tan(latRad) + 1.0 / Math.cos(latRad)) / Math.PI) /
        2.0 *
        n
    ); // Y coordinate

    return { tileX, tileY }; // Return calculated tile coordinates
  };

  // Function to convert tile coordinates back to latitude and longitude
  const tileXYToLatLon = (tileX, tileY, z) => {
    const n = Math.pow(2, z);
    const lon = (tileX / n) * 360 - 180;
    const latRad = Math.atan(Math.sinh(Math.PI * (1 - (2 * tileY) / n)));
    const lat = (latRad * 180) / Math.PI;
    return { lat, lon };
  };

  // Calculate the tile coordinates based on latitude, longitude, and zoom level
  const { tileX, tileY } = latLonToTileXY(center.lat, center.lon, zoomLevel);
  const halfGrid = Math.floor(totalGridSize / 2);

  // Redraw the tiles on zoom level or center changes
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const loadAndDrawTile = (tileX, tileY, xPos, yPos) => {
      const cacheKey = `${tileX}_${tileY}_${zoomLevel}`;
      
      // Check if tile is already in cache
      if (tileCache.current[cacheKey]) {
        // Use cached tile
        ctx.drawImage(tileCache.current[cacheKey], xPos, yPos, tileSize, tileSize);
      } else {
        // Load tile from server and store it in cache
        const img = new Image();
        img.src = googleMapProvider.getTileURL(tileX, tileY, zoomLevel); // Define this method in your provider
        img.onload = () => {
          // Draw the tile once it's loaded
          ctx.drawImage(img, xPos, yPos, tileSize, tileSize);
          
          // Store tile in cache
          tileCache.current[cacheKey] = img;
        };
      }
    };

    // Clear the canvas before redrawing
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Loop over grid (including preload buffer) and draw tiles
    for (let row = 0; row < totalGridSize; row++) {
      for (let col = 0; col < totalGridSize; col++) {
        const currentTileX = tileX + (col - halfGrid);
        const currentTileY = tileY + (row - halfGrid);

        // Calculate the canvas position where the tile should be drawn
        const xPos = (col - preloadBuffer) * tileSize;
        const yPos = (row - preloadBuffer) * tileSize;

        loadAndDrawTile(currentTileX, currentTileY, xPos, yPos);
      }
    }
  }, [googleMapProvider, tileX, tileY, totalGridSize, halfGrid, zoomLevel]);

  // Handle mouse wheel zoom and zoom into mouse location
  const handleWheel = (event) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();

    const mouseX = event.clientX ; // X position of the mouse in canvas
    const mouseY = event.clientY ; // Y position of the mouse in canvas
    console.log(mouseX,mouseY)

    const zoomChange = Math.sign(event.deltaY); // Scroll direction (+/-)

    // Get the tile coordinates of the mouse position
    const mouseTileX = tileX + (mouseX / tileSize - halfGrid);
    const mouseTileY = tileY + (mouseY / tileSize - halfGrid);

    // Convert mouse tile coordinates to latitude and longitude
    const mouseLatLon = tileXYToLatLon(mouseTileX, mouseTileY, zoomLevel);

    // Adjust zoom level (clamp between 1 and 21)
    const newZoomLevel = Math.max(1, Math.min(zoomLevel - zoomChange, 21));

    // Calculate new tile coordinates after zoom change
    const { tileX: newTileX, tileY: newTileY } = latLonToTileXY(mouseLatLon.lat, mouseLatLon.lon, newZoomLevel);

    // Update the map center to zoom into the mouse position
    const newCenterLatLon = tileXYToLatLon(newTileX, newTileY, newZoomLevel);
   // setCenter({ lat: newCenterLatLon.lat, lon: newCenterLatLon.lon });
    setZoomLevel(newZoomLevel);
  };

  // Handle map dragging (dynamic panning)
  const handleMouseDown = (event) => {
    setIsDragging(true);
    setStartDrag({ x: event.clientX, y: event.clientY });
  };

  const handleMouseMove = (event) => {
    if (!isDragging || !startDrag) return;

    const dx = event.clientX - startDrag.x;
    const dy = event.clientY - startDrag.y;

    const latLonPerPixelX = 360 / (Math.pow(2, zoomLevel) * tileSize); // Longitude degrees per pixel
    const latLonPerPixelY = 170 / (Math.pow(2, zoomLevel) * tileSize); // Latitude degrees per pixel (approx.)

    // Calculate the new center latitude and longitude based on drag
    const newLat = center.lat - dy * latLonPerPixelY;
    const newLon = center.lon - dx * latLonPerPixelX;

    setCenter({ lat: newLat, lon: newLon });

    // Update the start drag position for continuous panning
    setStartDrag({ x: event.clientX, y: event.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      onWheel={handleWheel} // Attach wheel event listener
      onMouseDown={handleMouseDown} // Attach mouse down event listener for dragging
      onMouseMove={handleMouseMove} // Attach mouse move event listener for dragging
      onMouseUp={handleMouseUp} // Attach mouse up event listener to stop dragging
      onMouseLeave={handleMouseUp} // Stop dragging if the mouse leaves the canvas
      style={{ 
        width: visibleGridSize * tileSize, 
        height: visibleGridSize * tileSize, 
        position: 'relative', 
        cursor: isDragging ? 'grabbing' : 'grab',
        overflow: "hidden",
      }}
    >
      {/* The Canvas for rendering tiles 
      <canvas
        ref={canvasRef}
        width={totalGridSize * tileSize} // Include extra space for preloaded tiles
        height={totalGridSize * tileSize} // Include extra space for preloaded tiles
        style={{ 
          border: '1px solid black', 
          transform: `translate(${-preloadBuffer * tileSize}px, ${-preloadBuffer * tileSize}px)` 
        }}
      />

      {/* Marker at the center of the map 
      <div 
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '20px',
          height: '20px',
          backgroundColor: 'red', // You can change this to an image or other styles
          borderRadius: '50%', // Makes it a circle
          zIndex: 10 // Ensures it appears above the canvas
        }} 
      />
    </div>
  );
};

export default MapComponent;
*/
import React, { useEffect, useRef } from 'react';


import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import { fromLonLat } from 'ol/proj';

import { GoogleSatelliteMapProvider } from '../LocationPlugin/Providers/GoogleMapProvider';
const position = [78.126737,17.6017851];

const MapComponent = () => {

  const googleMapProvider = new GoogleSatelliteMapProvider();
  const latLonToTileXY = (lat, lon, z) => {
    const n = Math.pow(2, z); // Number of tiles at the specified zoom level

    const tileX = Math.floor(n * ((lon + 180) / 360)); // X coordinate
    const latRad = (lat * Math.PI) / 180.0; // Latitude in radians
    const tileY = Math.floor(
      (1.0 - Math.log(Math.tan(latRad) + 1.0 / Math.cos(latRad)) / Math.PI) /
        2.0 *
        n
    ); // Y coordinate

    return [tileX,tileY];
  }; 
 
  const mapRef = useRef(null);

  useEffect(() => {
    const tileUrlFunction = (z, x, y) => {
      return googleMapProvider.getTileURL(x, y, z);
    };

    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new XYZ({
            tileUrlFunction: googleMapProvider.getTileURL
          })
        })
      ],
      view: new View({
        center: fromLonLat(position),
        zoom: 22
      })
    });

    return () => map.setTarget(null);
  }, []);

  return <div ref={mapRef} style={{ width: '100%', height: '100vh' }} />;

  
  };

export default MapComponent;


