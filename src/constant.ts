import type { Direction, Parity } from './geohash-type';

export const BORDER: Record<Direction, Record<Parity, string>> = {
  top: { even: 'prxz', odd: 'bcfguvyz' },
  right: { even: 'bcfguvyz', odd: 'prxz' },
  bottom: { even: '028b', odd: '0145hjnp' },
  left: { even: '0145hjnp', odd: '028b' },
};

export const NEIGHBOR: Record<Direction, Record<Parity, string>> = {
  top: {
    even: 'p0r21436x8zb9dcf5h7kjnmqesgutwvy',
    odd: 'bc01fg45238967deuvhjyznpkmstqrwx',
  },
  right: {
    even: 'bc01fg45238967deuvhjyznpkmstqrwx',
    odd: 'p0r21436x8zb9dcf5h7kjnmqesgutwvy',
  },
  bottom: {
    even: '14365h7k9dcfesgujnmqp0r2twvyx8zb',
    odd: '238967debc01fg45kmstqrwxuvhjyznp',
  },
  left: {
    even: '238967debc01fg45kmstqrwxuvhjyznp',
    odd: '14365h7k9dcfesgujnmqp0r2twvyx8zb',
  },
};

export const NEIGHBOR_DIRECTIONS: [Direction, Direction][] = [
  ['top', 'right'],
  ['right', 'bottom'],
  ['bottom', 'left'],
  ['left', 'top'],
];

export const INDEX_TO_CHAR: string[] = [
  '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
  'b', 'c', 'd', 'e', 'f', 'g', 'h', 'j', 'k', 'm', 'n', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
];

/* eslint-disable */
export const CHAR_TO_INDEX: Record<string, number> = {
  '0': 0, '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9,
  'b': 10, 'c': 11, 'd': 12, 'e': 13, 'f': 14, 'g': 15, 'h': 16, 'j': 17, 'k': 18,
  'm': 19, 'n': 20, 'p': 21, 'q': 22, 'r': 23, 's': 24, 't': 25, 'u': 26, 'v': 27,
  'w': 28, 'x': 29, 'y': 30, 'z': 31,
};
/* eslint-enable */
