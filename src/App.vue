<template>
  <div id="app">
    <h1 @click="homePage" class="title">FAKEFLIX</h1>

    <!-- //*Si authentication === True -->
    <div v-if="this.$store.state.authentication">
      <nav id="nav" class="flex">
        <router-link :to="{ name: 'Home' }">Home</router-link>
        <router-link :to="{ name: 'Favoris' }">Favoris </router-link>
        <router-link :to="{ name: 'FilmsVoir' }">Films à voir</router-link>

        <search></search>
      </nav>
      <div></div>
    </div>

    <router-view />

    <!-- //*Si authentication === False -->
    <!--
      
    <form class="flex-login" v-else>
      <h2 class="title">App Test</h2>
      <div class="username">
        <input type="text" placeholder="Nom d'utilisateur" required />
      </div>
      <div class="password">
        <input type="password" placeholder="Mot de passe" required />
      </div>
      <div class="submit">
        <input type="submit" value="Valider" />
      </div>
    </form>-->
  </div>
</template>


<script>
// @ is an alias to /src
import search from "@/components/Search.vue";

export default {
  name: "App",
  components: { search },

  methods: {
    homePage() {
      this.$router.push({ path: `/home` });
    },
  },
};
</script>





<style>
label {
  color: #fff;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body {
  background-color: rgb(17, 16, 16);
}

#nav {
  padding: 30px;
  text-decoration: none;
  background-color: rgb(170, 169, 169);
}

#nav a {
  color: red;
  padding: 30px;
  font-weight: bold;
  color: #061727;
  text-decoration: none;
}

#nav a.router-link-exact-active {
  color: #d60823;
  text-decoration: none;
}
.title {
  color: red;
  font-size: 60px;

  cursor: pointer;
}

.flex {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
#nav > div {
  display: flex;
  justify-content: end;
  flex-wrap: wrap;
}
.flex-login {
  padding-top: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.username label {
  font-size: 25px;
  padding-right: 20px;
}
.password label {
  font-size: 25px;

  padding-right: 55px;
}
.password {
  padding-top: 5px;
}
.submit input {
  margin: auto;
  min-height: 30px;
}
.submit {
  padding-top: 10px;
}
</style>
