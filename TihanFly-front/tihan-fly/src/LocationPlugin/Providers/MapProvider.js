//Base class for rest of the MapProviders

class MapProvider {
    constructor(mapName, referrer, imageFormat, averageSize = 13652, mapStyle = 'CustomMap') {
        this._mapName = mapName;
        this._referrer = referrer;
        this._imageFormat = imageFormat;
        this._averageSize = averageSize;
        this._mapStyle = mapStyle;
        this._mapId = MapProvider._mapIdIndex++;
        this._language = '';
    }

    // Method to get the URL for a tile
    getTileURL(x, y, zoom) {
        return this._getURL(x, y, zoom);
    }

    // Placeholder for image format processing (to be implemented as needed)
    getImageFormat(image) {
        // Implement specific logic to determine the image format from a ByteArray or similar data
        return this._imageFormat;
    }

    getAverageSize() {
        return this._averageSize;
    }

    getMapStyle() {
        return this._mapStyle;
    }

    getMapName() {
        return this._mapName;
    }

    getMapId() {
        return this._mapId;
    }

    getReferrer() {
        return this._referrer;
    }

    getToken() {
        return ''; // Return token if required
    }

    long2tileX(lon, z) {
        return Math.floor((lon + 180) / 360 * Math.pow(2, z));
    }

    lat2tileY(lat, z) {
        return Math.floor(
            (1 - Math.log(Math.tan(lat * Math.PI / 180) + 1 / Math.cos(lat * Math.PI / 180)) / Math.PI) / 2 * Math.pow(2, z)
        );
    }

    isElevationProvider() {
        return false; // Override if needed
    }

    isBingProvider() {
        return false; // Override if needed
    }

    getTileCount(zoom, topleftLon, topleftLat, bottomRightLon, bottomRightLat) {
        const x1 = this.long2tileX(topleftLon, zoom);
        const y1 = this.lat2tileY(topleftLat, zoom);
        const x2 = this.long2tileX(bottomRightLon, zoom);
        const y2 = this.lat2tileY(bottomRightLat, zoom);
        return { xCount: x2 - x1 + 1, yCount: y2 - y1 + 1 };
    }

    // Method for converting tile coordinates to a QuadKey (specific to certain map providers)
    _tileXYToQuadKey(tileX, tileY, levelOfDetail) {
        let quadKey = '';
        for (let i = levelOfDetail; i > 0; i--) {
            let digit = '0';
            const mask = 1 << (i - 1);
            if ((tileX & mask) !== 0) digit++;
            if ((tileY & mask) !== 0) digit += 2;
            quadKey += digit;
        }
        return quadKey;
    }

    // Get server number based on x, y coordinates and the maximum server count
    _getServerNum(x, y, max) {
        return (x + 2 * y) % max;
    }

    // Abstract method for URL generation (override this in subclass)
    _getURL(x, y, zoom) {
        throw new Error("Method '_getURL' must be implemented.");
    }
}
module.exports = MapProvider;