import { Icon, Style, Stroke,Fill,Text } from 'ol/style';
import { fromLonLat } from 'ol/proj';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import { LineString } from 'ol-react/lib/geom';
import { Feature } from 'ol';
import Pin from '../Assets/placeholder.png'
import { Point } from 'ol/geom';

class Marker{
    constructor(map){
        this.map = map;
        this.vectorSource = new VectorSource();
        this.vectorLayer = new VectorLayer({
          source: this.vectorSource,
        });
        this.map.addLayer(this.vectorLayer);
    }
    addMarker(lon,lat,label){
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
        this.vectorSource.addFeature(markerFeature);
    }
    drawLineBetweenMarkers(coord1, coord2){
      // Convert coordinates to map projection
      const point1 = fromLonLat([coord1['lon'],coord1['lat']]);
      const point2 = fromLonLat([coord2['lon'],coord2['lat']]);
      console.log(point1)
      // Create a LineString geometry
      try{
      // Create a feature for the line
      const lineFeature = new Feature({
        geometry: new LineString([point1, point2]),
      });
    
      // Create a style for the line
      const lineStyle = new Style({
        stroke: new Stroke({
          color: 'red', // Line color
          width: 2, // Line width
        }),
      });
      lineFeature.setStyle(lineStyle);
    
      // Create a vector source and layer to render the line
      this.vectorSource.addFeature(lineFeature);

    }
    catch(error){
      console.error('Error drawing line between markers:', error);

    }
    };
}
export default Marker;