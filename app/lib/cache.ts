import Cache from 'lru-cache';

export default new Cache({ max: 100, ttl: 60 * 60 * 1000 });
