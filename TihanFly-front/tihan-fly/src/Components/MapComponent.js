import React, { useState } from 'react';

import { GoogleSatelliteMapProvider } from '../LocationPlugin/Providers/GoogleMapProvider';

const MapComponent = () => {
  const tileSize = 256; // Set the tile size (example: 256x256 pixels)
  const tileGridSize = 15; // Define how many tiles to display in each direction
  const googleMapProvider = new GoogleSatelliteMapProvider();
  // Function to convert latitude and longitude to tile coordinates
  const latLonToTileXY = (lat, lon, z) => {
    const n = Math.pow(2, z); // Calculate the number of tiles at the specified zoom level
  
    const tileX = Math.floor(n * ((lon + 180) / 360)); // Calculate tile X coordinate
    const latRad = lat * Math.PI / 180.0; // Convert latitude from degrees to radians
    const tileY = Math.floor((1.0 - Math.log(Math.tan(latRad) + (1.0 / Math.cos(latRad))) / Math.PI) / 2.0 * Math.pow(2.0, z));
  
    return { tileX, tileY }; // Return the calculated tile coordinates
  };
  

  // Calculate tile coordinates based on provided latitude, longitude, and zoom level
  const { tileX, tileY } = latLonToTileXY(17.601906, 78.126869,20);
  const halfGrid = Math.floor(tileGridSize / 2);

  // Generate tile images based on the calculated tile coordinates
  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${tileGridSize}, 1fr)` }}>
        {[...Array(tileGridSize)].map((_, row) => (
          [...Array(tileGridSize)].map((_, col) => {
            const currentTileX = tileX + (col - halfGrid);
            const currentTileY = tileY + (row - halfGrid);
            
            return (
              <img
                key={`${currentTileX}-${currentTileY}`}
                src={googleMapProvider.getTileURL(currentTileX,currentTileY,20)} // You need to define this function
                alt={`Tile ${currentTileX}-${currentTileY}`}
                width={tileSize}
                height={tileSize}
                style={{ display: 'block' }}
              />
            );
          })
        ))}
      </div>
    </div>
  );
};

export default MapComponent;
