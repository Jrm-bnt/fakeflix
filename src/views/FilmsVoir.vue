<template>
  <div class="FilmsVoir">
    <div>
      <h2>Film actuellement en salle.</h2>
    </div>
    <div class="flex-movies">
      <div v-for="movie of moviesDiscover" :key="movie.id">
        <img :src="urlImg + movie.poster_path" alt="" />
        <p>{{ movie.title }}</p>
      </div>
    </div>
  </div>
</template> 

<script>
export default {
  name: "FilmsVoir",
  components: {},
  data: function () {
    return {
      moviesDiscover: null,
      urlImg: "https://image.tmdb.org/t/p/w500",
    };
  },

  created: async function () {
    let response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=07cce3178d50aa582c6d5c2c74bd7d6d&language=fr-FR&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`
    );
    let moviesDiscover = await response.json();
    this.moviesDiscover = moviesDiscover.results;
  },
};
</script>

<style >
.flex-movies {
  margin-top: 50px;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
img {
  height: 350px;
  width: 250px;
}
p {
  font-size: 25px;
  color: #fff;
}

h2 {
  color: white;
}
</style>