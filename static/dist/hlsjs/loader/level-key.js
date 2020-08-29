import { buildAbsoluteURL } from 'url-toolkit';
export default class LevelKey {
    constructor(baseURI, relativeURI) {
        this._uri = null;
        this.method = null;
        this.key = null;
        this.iv = null;
        this.baseuri = baseURI;
        this.reluri = relativeURI;
    }
    get uri() {
        if (!this._uri && this.reluri) {
            this._uri = buildAbsoluteURL(this.baseuri, this.reluri, { alwaysNormalize: true });
        }
        return this._uri;
    }
}
