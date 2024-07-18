import { CacheInterface } from "../interfaces/Cache.interface"
class CacheClass {
    private cachedList: Array<CacheInterface> = [];
    static _intance: CacheClass;
    private constructor() { }
    public static get instance() {
        if (!this._intance) {
            this._intance = new CacheClass();
        }
        return this._intance;
    }

    public addCache(css: string, js: string, domain: string) {
        const addToCache: CacheInterface = {
            js: js,
            css: css,
            time: Date.now(),
            domain: domain
        }
        this.cachedList.push(addToCache);
    }

    public getCache(domain: string) {
        const cachedValue = this.cachedList.find(cached => cached.domain === domain) || undefined;
        return cachedValue;

    }

}
export const Cache = CacheClass; 