<template>
  <div class="home">
    <div>
      <h2 v-if="this.$store.state.search">
        Film contetant: {{ this.$store.state.search }}
      </h2>
      <h2 v-else>Commencer votre recherche</h2>
    </div>

    <div class="flex-movies">
      <div
        v-for="movie of $store.state.searchedMovies"
        :key="movie.id"
        @click="loadfilm(movie.id)"
      >
        <img
          v-if="movie.poster_path"
          :src="urlImg + movie.poster_path"
          width="250px"
          height="350px"
          :alt="movie.title"
        />
        <!-- <img
          v-if="!movie.poster_path"
          src="../public/img.jpg"
          width="250px"
          height="350px"
          :alt="movie.title"
        /> -->
      </div>
    </div>

    <!-- Carousel -->
    <div class="flex-end" v-if="!this.$store.state.search">
      <div class="carousel">
        <hooper :settings="hooperSettings">
          <slide v-for="movie of moviesDiscover" :key="movie.id">
            <img
              :src="urlImg + movie.poster_path"
              alt=""
              @click="loadfilm(movie.id)"
            />
          </slide>
        </hooper>
      </div>
    </div>
  </div>
</template> 

<script>
import { Hooper, Slide } from "hooper";
import "hooper/dist/hooper.css";

export default {
  name: "Home",
  components: { Hooper, Slide },
  data: function () {
    return {
      publicImg: "@/public/img.jpg",
      urlImg: "https://image.tmdb.org/t/p/w500",
      moviesDiscover: null,

      //*Settings carousel
      hooperSettings: {
        playSpeed: 3500,
        autoPlay: true,
        wheelControl: false,
        itemsToShow: 1,
      },
    };
  },

  methods: {
    loadfilm: function (movieId) {
      this.$router.push({ path: `/film/${movieId}` });
      this.$store.commit("setMovieId", movieId);
      console.log(movieId);
    },
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
  justify-content: center;
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
.carousel {
  width: 220px;
}
.flex-end {
  display: flex;
  justify-content: center;
}
</style>