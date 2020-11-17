import client from './client';
import {updateParams} from './params';

let redirectTimer = null;

class Router {

  processing = false;
  _changed = false

  _redirect(target) {
    if(target != this.url) {
      clearTimeout(redirectTimer);
      redirectTimer = setTimeout(() => {
        this.processing = true;
        updateParams(target);
        history.pushState({}, document.title, target);
        window.dispatchEvent(new Event('popstate'));
        this._changed = true;
      }, 0);
    }
  }

  get url() {
    return window.location.pathname+window.location.search;
  }

  set url(target) {
    this._redirect(target);
  }

  get path() {
    return window.location.pathname;
  }

  set path(target) {
    this._redirect(target+window.location.search);
  }

  _stopProcessing() {
    if(this.processing) {
      setTimeout(() => {
        this.processing = false;
        client.update();
      }, 0);
    }
  }

}

const router = new Router();

export default router;