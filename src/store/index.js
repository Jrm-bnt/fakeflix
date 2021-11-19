import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    authentication: false,
    search: "",
    searchedMovies: null,
    movieId: null,
  },

  mutations: {
    setSearch(state, search) {
      state.search = search;
    },
    setSearchedMovies(state, movies) {
      state.searchedMovies = movies;
    },
    setMovieId(state, movieId) {
      state.movieId = movieId;
    },
    setAuthentication(state, authentication) {
      state.authentication = authentication
    }
  },
  actions: {
    async searchMovies(context) {
      // console.log(context.state.search);

      let response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=07cce3178d50aa582c6d5c2c74bd7d6d&language=fr-FR&query=${context.state.search}&page=1&include_adult=false`
      );
      let searchedMovies = await response.json();
      context.commit("setSearchedMovies", searchedMovies.results)

    },
    async loadMovie(context) {
      console.log(context.state.movieId);


    }

  },
  modules: {
  }

})
