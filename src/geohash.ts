import { BORDER, CHAR_TO_INDEX, INDEX_TO_CHAR, NEIGHBOR, NEIGHBOR_DIRECTIONS } from './constant';
import type { Direction, Parity } from './geohash-type';

type Interval = readonly [number, number];
const avg = ([a, b]: Interval): number => (a + b) / 2;

export default class GeoHash {
  public constructor(private precision: number) {
  }

  public encode(lat: number, lng: number): string {
    return GeoHash.Encoder.encode(lat, lng, this.precision);
  }

  public decode(geohash: string): { lat: number, lng: number } {
    return GeoHash.Decoder.decode(geohash);
  }

  public neighbors(geohash: string): string[] {
    return GeoHash.Neighbor.neighbors(geohash);
  }

  private static Encoder = class {
    public static encode(lat: number, lng: number, precision: number): string {
      const hash: string[] = [];
      let bit = 0;
      let bitCount = 0;
      let lngInterval: Interval = [-180, 180];
      let latInterval: Interval = [-90, 90];
      let isLng = true;

      const pushBit = (b: number): void => {
        bit = (bit << 1) | b;
        bitCount++;

        if (bitCount === 5) {
          hash.push(INDEX_TO_CHAR[bit]);
          bit = 0;
          bitCount = 0;
        }
      };

      while (hash.length < precision) {
        if (isLng) {
          const middle = avg(lngInterval);

          if (lng > middle) {
            pushBit(1);
            lngInterval = [middle, lngInterval[1]];
          } else {
            pushBit(0);
            lngInterval = [lngInterval[0], middle];
          }
        } else {
          const middle = avg(latInterval);

          if (lat > middle) {
            pushBit(1);
            latInterval = [middle, latInterval[1]];
          } else {
            pushBit(0);
            latInterval = [latInterval[0], middle];
          }
        }

        isLng = !isLng;
      }

      return hash.join('');
    }
  };

  private static Decoder = class {
    public static decode(geohash: string): { lat: number, lng: number } {
      const [latInterval, lngInterval] = this.decodeInterval(geohash);
      const lat = avg(latInterval);
      const lng = avg(lngInterval);

      return { lat, lng };
    }

    private static decodeInterval(geohash: string): [Interval, Interval] {
      const bits = this.toBits(geohash);
      let latInterval: Interval = [-90.0, 90.0];
      let lngInterval: Interval = [-180.0, 180.0];

      for (let i = 0; i < bits.length; i++) {
        if (i % 2 === 0) {
          const middle = avg(lngInterval);
          lngInterval = bits[i] === 1 ? [middle, lngInterval[1]] : [lngInterval[0], middle];
        } else {
          const middle = avg(latInterval);
          latInterval = bits[i] === 1 ? [middle, latInterval[1]] : [latInterval[0], middle];
        }
      }

      return [latInterval, lngInterval];
    }

    private static toBits(geohash: string): number[] {
      const bits: number[] = [];

      for (const c of geohash) {
        const index = CHAR_TO_INDEX[c];

        for (let i = 4; i >= 0; i--) {
          bits.push((index >> i) & 1);
        }
      }

      return bits;
    }
  };

  private static Neighbor = class {
    public static neighbors(geohash: string): string[] {
      const neighbors = new Set<string>();

      for (const direction of NEIGHBOR_DIRECTIONS) {
        const point1 = this.adjacent(geohash, direction[0]);
        const point2 = this.adjacent(point1, direction[1]);
        neighbors.add(point1);
        neighbors.add(point2);
      }

      return [...neighbors];
    }

    private static adjacent(geohash: string, direction: Direction): string {
      const type: Parity = geohash.length % 2 == 0 ? 'even' : 'odd';
      const border = new Set(BORDER[direction][type]);
      const last = geohash.substring(geohash.length - 1);
      let base = geohash.substring(0, geohash.length - 1);

      if (base.length && border.has(last)) {
        base = this.adjacent(base, direction);
      }

      const neighbor = NEIGHBOR[direction][type];
      const index = neighbor.indexOf(last);

      if (index === -1) {
        throw new Error(`Failed to find neighbor for direction: ${direction} at geohash: ${geohash}`);
      }

      return base + INDEX_TO_CHAR[index];
    }
  };
}
