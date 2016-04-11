/*
* Mode for differents user
*/
import url from 'fast-url-parser';
url.queryString = require('querystringparser');

class Modes {
  constructor() {
    this.parseQuery();
    window.DEVMODE = false;
  }
  parseQuery() {
    const parsed = url.parse(window.location.search, true);
    if (parsed.query.devMode) {
      window.DEVMODE = true;
    }
  }
}
export default new Modes();
