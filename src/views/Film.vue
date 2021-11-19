<template>
  <div>
    <div>
      <div class="iframe" v-if="dataTrailer !== null">
        <iframe
          width="760"
          height="415"
          :src="youTube + dataTrailer.key"
          title="YouTube video player"
          frameborder="0"
          allowfullscreen
        ></iframe>
      </div>

      <div v-if="dataMovie !== null">
        <div class="flex">
          <div><img :src="urlImg + dataMovie.poster_path" alt="" /></div>
          <div>
            <h1>{{ dataMovie.title }}</h1>
            <h3>Informations</h3>
            <p>Date de sortie : {{ dataMovie.release_date }}</p>
            <ul>
              <li>dataMovie.popularity</li>
              <li>dataMovie.vote_average</li>
              <li>dataMovie.vote_count</li>
            </ul>
          </div>
          <p class="overview">{{ dataMovie.overview }}</p>
          <div></div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "film",

  data() {
    return {
      youTube: "https://www.youtube.com/embed/",
      idMovie: this.$store.state.movieId,
      dataMovie: null,
      urlImg: "https://image.tmdb.org/t/p/w500",
      dataTrailer: null,
    };
  },
  created: async function () {
    //* data du film
    let response = await fetch(
      ` https://api.themoviedb.org/3/movie/${this.idMovie}?api_key=07cce3178d50aa582c6d5c2c74bd7d6d&language=fr-FR`
    );
    this.dataMovie = await response.json();

    //*lien pour video de presentation
    let response2 = await fetch(
      ` https://api.themoviedb.org/3/movie/${this.idMovie}/videos?api_key=07cce3178d50aa582c6d5c2c74bd7d6d&language=en-US`
    );
    let dataTrailer = await response2.json();
    this.dataTrailer = dataTrailer.results[0];
    console.log("console.log");
    console.log(this.dataTrailer);
  },
};
</script>


<style >
.iframe {
  padding-top: 20px;
}
.flex {
  margin-top: 50px;
  display: flex;
  justify-content: center;
}
img {
  height: 350px;
  width: 250px;
}

h1 {
  color: white;
}
h3 {
  font-size: 20px;
  color: #fff;
}
p {
  font-size: 20px;
}
* {
  box-sizing: border-box;
}

img {
  max-width: 100%;
  vertical-align: middle;
  height: auto;
}
.overview {
  max-width: 800px;
}
</style>