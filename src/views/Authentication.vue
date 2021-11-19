<template>
  <div>
    <div class="username">
      <input
        type="text"
        placeholder="Nom d'utilisateur"
        v-model="userName"
        required
      />
    </div>
    <div class="password">
      <input
        type="password"
        placeholder="Mot de passe"
        v-model="password"
        required
      />
    </div>
    <div class="submit">
      <button @click="requestAuthentication">Valider</button>
    </div>

    <p @click="guessMode">Se connecter en tant qu'invité</p>
  </div>
</template>



<script>
export default {
  name: "Authentication",

  data() {
    return {
      userName: "",
      password: "",
    };
  },

  methods: {
    guessMode() {
      this.$store.commit("setAuthentication", true);
      this.$router.push({ path: `/home` });
    },

    //* Requete authentication step 1
    async requestAuthentication() {
      let response = await fetch(
        `https://api.themoviedb.org/3/authentication/token/new?api_key=07cce3178d50aa582c6d5c2c74bd7d6d`
      );
      let responseToken = await response.json();
      this.authWithLogin(responseToken.request_token);
    },

    //* Requete authentication step 2

    authWithLogin(responseToken) {
      let url =
        "https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=07cce3178d50aa582c6d5c2c74bd7d6d";

      let init = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          username: this.userName,
          password: this.password,
          request_token: responseToken,
        }),
      };
      fetch(url, init)
        .then((response) => {
          if (!response.ok)
            return new Promise((resolve, reject) =>
              reject(new Error("Invalid response"))
            );
          return response.json();
        })
        .then((token) => this.sessionId(token.request_token))
        .catch((error) => console.error(error));
    },

    //* Requete authentication step 3

    sessionId(token) {
      console.log(token);
      let url =
        "https://api.themoviedb.org/3/authentication/session/new?api_key=07cce3178d50aa582c6d5c2c74bd7d6d";
      let fd = new FormData();
      fd.append("key", "value");
      let init = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          request_token: token,
        }),
      };
      fetch(url, init)
        .then((response) => {
          if (!response.ok)
            return new Promise((resolve, reject) =>
              reject(new Error("Invalid response"))
            );
          return response.json();
        })
        .then((response) => this.getSuccess(response))
        .catch((error) => console.error(error));
    },

    getSuccess(success) {
      console.log(success);
      success.success
        ? this.sessionOk()
        : console.error(success.status_message);
    },
    sessionOk() {
      this.$store.commit("setAuthentication", true);
      this.$router.push({ path: `/home` });
    },
  },
};
</script>


<style>
h2 {
  color: #fff;
}
p {
  font-size: 15px;
  color: aqua;
}
p:hover {
  cursor: pointer;
  color: blue;
}
</style>