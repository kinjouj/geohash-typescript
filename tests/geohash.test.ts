import GeoHash from '../src/geohash';

const lat = 35.7101389;
const lng = 139.8108333;

describe('GeoHash', () => {
  test('encode test', () => {
    const geohash = new GeoHash(8);
    expect(geohash.encode(lat, lng)).toBe('xn77jkz4');
  });

  test('decode', () => {
    const geohash = new GeoHash(8);
    const latlng = geohash.decode('xn77jkz4');
    expect(latlng).not.toBeNull();
    expect(parseInt(latlng.lat.toString())).toBe(35);
    expect(parseInt(latlng.lng.toString())).toBe(139);
  });

  test('neighbors', () => {
    const geohash = new GeoHash(8);
    expect(geohash.neighbors('xn77jkz4')).toHaveLength(8);
  });
});
