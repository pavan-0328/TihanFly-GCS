// Made to get google maps tiles 
const MapProvider = require('./MapProvider.js')
class GoogleMapProvider extends MapProvider {
    constructor(mapName, versionRequest, version, imageFormat, averageSize, mapType) {
        super(mapName, 'https://www.google.com/maps/preview', imageFormat, averageSize, mapType);
        this._versionRequest = versionRequest;
        this._version = version;
        this._mapUrl = 'http://mt{0}.google.com/vt/{1}={2}&hl={3}&x={4}&y={5}&z={6}&s={7}&scale={8}';
        this._secGoogleWord = 'Galileo';
        this._scale = '1';
    }

    getTileURL(x, y, zoom) {
        let sec1 = '';
        let sec2 = '';
        const sec = this._getSecGoogleWords(x, y, sec1, sec2);
        sec1 = sec.sec1;
        sec2 = sec.sec2;
        return this._mapUrl
            .replace('{0}', this._getServerNum(x, y, 4))
            .replace('{1}', this._versionRequest)
            .replace('{2}', this._version)
            .replace('{3}', 'en') // Language parameter (can be customized)
            .replace('{4}', x)
            .replace('{5}', y)
            .replace('{6}', zoom)
            .replace('{7}', this._secGoogleWord)
            .replace('{8}', this._scale);
    }

    _getSecGoogleWords(x, y, sec1, sec2) {
        sec1 = ''; sec2 = '';
        const letters = 'Galileo';
        const seclen = ((x*3)+y)%8;
        sec2 = letters.substring(0,seclen);
        if (y >= 10000 && y < 100000) {
            sec1 = "&s="; // Modify sec1 if condition is met
        }
        return {sec1: sec1,sec2: sec2};
    }

    _getServerNum(x, y, max) {
        return (x + 2 * y) % max;
    }
}

// Specific Google Map types that inherit from GoogleMapProvider

class GoogleStreetMapProvider extends GoogleMapProvider {
    constructor() {
        super('Google Street Map', 'lyrs', 'm', 'png', 4913, 'StreetMap');
    }
}

class GoogleSatelliteMapProvider extends GoogleMapProvider {
    constructor() {
        super('Google Satellite', 'lyrs', 's', 'jpg', 56887, 'SatelliteMapDay');
    }
}

class GoogleLabelsMapProvider extends GoogleMapProvider {
    constructor() {
        super('Google Labels', 'lyrs', 'h', 'png', 13652, 'CustomMap');
    }
}

class GoogleTerrainMapProvider extends GoogleMapProvider {
    constructor() {
        super('Google Terrain', 'v', 't,r', 'png', 19391, 'TerrainMap');
    }
}

class GoogleHybridMapProvider extends GoogleMapProvider {
    constructor() {
        super('Google Hybrid', 'lyrs', 'y', 'png', 56887, 'HybridMap');
    }
}

module.exports = {
    GoogleStreetMapProvider: GoogleStreetMapProvider,
    GoogleHybridMapProvider: GoogleHybridMapProvider,
    GoogleLabelsMapProvider: GoogleLabelsMapProvider,
    GoogleSatelliteMapProvider: GoogleSatelliteMapProvider,
    GoogleTerrainMapProvider: GoogleTerrainMapProvider
};

// const satelliteMapProvider = new GoogleSatelliteMapProvider();
// console.log(satelliteMapProvider.getTileURL(1, 1, 5));