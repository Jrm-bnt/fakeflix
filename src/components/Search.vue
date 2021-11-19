<template>
  <div>
    <input
      type="text"
      id="searchInput"
      v-model="search"
      @keyup="searchInput(search)"
    /><i class="fas fa-search"></i>
  </div>
</template>


<script>
export default {
  data() {
    return {
      search: null,
    };
  },

  methods: {
    searchInput: function (search) {
      // TODO utiliser debounce
      // setTimeout(() => {
      //   }, 1500);

      console.log(this.$route);

      if (this.$route.name !== "Home") this.$router.push({ name: "Home" });
      this.$store.commit("setSearch", search);
      this.$store.dispatch("searchMovies");
    },
  },
};
</script>



<style >
input {
  min-width: 100px;
  height: 20px;
  align-items: center;
  margin-top: auto;
  margin-bottom: auto;
  padding-left: 5px;
  padding-right: 5px;
  font-size: 20px;
}
.svg-inline--fa {
  color: rgb(175, 37, 37);
  font-size: 20px;
  padding-top: 29px;
  padding-left: 5px;
}
</style>