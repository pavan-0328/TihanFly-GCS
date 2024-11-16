import { Icon, Style,Fill,Text } from 'ol/style';
import { fromLonLat } from 'ol/proj';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import { Feature } from 'ol';
import Pin from '../Assets/placeholder.png'
import { Point } from 'ol/geom';

class Marker{
    constructor(map){
        this.map = map;
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
        const vectorSource = new VectorSource({
          features: [markerFeature],
        });
    
        const markerLayer = new VectorLayer({
          source: vectorSource,
        });
        this.map.addLayer(markerLayer);
    }
}
export default Marker;