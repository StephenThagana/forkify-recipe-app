import view from './view.js';
import icons from 'url:../../img/icons.svg'; //parcel 2

class paginationView extends view {
  _parentElement = document.querySelector('.pagination');

  _generateMarkup() {
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    console.log(numPages);
    //1. page 1 and there are other pages
    if (this._data.page === 1 && numPages > 1) {
      return 'page 1';
    }
    //2. page 1 and there are No other pages

    //last page
    if (this._data.page === numPages && numPages > 1) {
      return 'last page';
    }
    //other page
    if (this._data.page < numPages) {
      return 'other';
    }
    return 'only 1 page';
  }
}
export default new paginationView();
