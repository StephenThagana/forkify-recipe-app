import * as model from './model.js';
import recipeView from './views/recipeViews.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

if (module.hot) {
  module.hot.accept();
}
///////////////////////////////////////

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpiner();

    // 0.update results view to mark selected search results
    resultsView.update(model.getSearchResultsPage());
    // 1. Loading recipe
    await model.loadRecipe(id);

    // 2.rendering the recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};
const controlSearchResults = async function () {
  try {
    // render spinner
    resultsView.renderSpiner();
    // 1. get search query
    const query = searchView.getQuery();
    if (!query) return;
    // 2. load search query
    await model.loadSearchResults(query);
    // 3.render results
    resultsView.render(model.getSearchResultsPage(model.state.search.page));
    //4. render initial button pagination
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (goToPage) {
  // 1.render  new results
  resultsView.render(model.getSearchResultsPage(goToPage));

  //2. render new button pagination
  paginationView.render(model.state.search);
  // console.log(goToPage);
};

const controlServings = function (newServings) {
  // updaterecipe servings(in state)
  model.updateServings(newServings);

  // update the recipe view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};


const controlAddBookmark = function(){
  model.addBookmark(model.state.recipe)
  console.log(model.state.recipe);
}
const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};
init();
