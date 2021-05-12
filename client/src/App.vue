<template>
  <div id="app">
  <b-navbar toggleable="lg" type="dark" variant="dark">
    <b-navbar-brand href="/"><img src="./assets/logo.png" alt="MaPic" style="width: 40px;height:40px;margin-right:10px;">MaPic</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item href="/location/new">Add a location</b-nav-item>
        <b-nav-item href="/about">About</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
          <b-nav-item href="/signup"><b-button variant='primary' v-if="!loggedIn">Sign up</b-button></b-nav-item>
          <b-nav-item href="/login"><b-button variant='white' v-if="!loggedIn">Log in</b-button></b-nav-item>
          <b-nav-item @click="logoutFunction"><b-button variant='primary' v-if="loggedIn">Log out</b-button></b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
    <router-view/>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import config from '../config'

export default defineComponent({
  setup() {
    
  },
  data() {
    return {
      loggedIn: false,
    }
  },
  methods: {
    verify(token) {
      const requestAddr = config.ApiUrl + "api/account/verify?token=" + token;
      
      fetch(requestAddr).then((res) =>{ // Verify if user is logged in
        console.log(JSON.stringify(res.json()));
        var answer = JSON.parse(res.json())
        if (answer.sucess) {
          this.loggedIn = true;
        }
      });
    },
    logoutFunction() { // Log out the user
      const name = "token=";
      const decodedCookie = decodeURIComponent(document.cookie)
      const ca = decodedCookie.split(';')
      var token = "";
      for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          token= c.substring(name.length, c.length);
        }
      }
      const expressServerBase = config.ApiUrl;
      token = token.slice(1, -1);
      console.log("In logout function token = " + token);
      const url = expressServerBase + "api/account/logout?token=" + token;
      console.log("URL: " + url);
      console.log("D");
      fetch(url, {

      }).then((res) => {
        if (res) {
          alert("Logout request result: " + JSON.stringify(res.json()));
        }
        
      })
      return; // parses JSON response into native JavaScript objects
    }
  }
})
</script>


<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
@import './sass/variables';
* {
  margin: 0;
  padding:0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
  font-style: normal;
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
body {
  background-color: #202040 !important;
  height: 100vh;
}
#nav {
  margin: 0;
  padding: 0;
  background-color: #202040 !important;
}
#app {
  text-align: center;
  color: white !important;
  background-color: #202040;
  height: 100vh;
}
#nav a {
  font-weight: bold;
  color: #000000 !important;
}
#nav a.router-link-exact-active {
  color: #000000 !important;
}
.btn {
  border-radius: 25px !important;
  padding: 10px 20px !important;
}
.btn-white {
  background-color: #fff !important;
  color: $accent !important;
  border: 1px solid white;

}
.btn-primary {
  background-color: #7041FF!important;
  border-color: #7041FF !important;
  font-weight: 700;
}
.btn-primary:hover {
  background-color: #7041FF !important;
  border-color: #7041FF !important;
}
.btn-outline-primary {
  color: #7041FF!important;
  border-color: #7041FF !important;
}
.btn-outline-primary:hover {
  color: #fff!important;
  background-color: #7041FF !important;
}
#app .bg-dark {
  background: #202040 !important;
}
#app .navbar-brand {
  font-weight: 700;
}
.navbar {
  margin-bottom: 20px;
}
*:focus {
    outline: none;
}
textarea:focus, input:focus, button:focus{
    outline: none;
    border: none;    
}
#app label {
  text-align:left;
  color: #d3d3d3;
  font-weight: 300;
}
#app input {
  background-color: $lighter;
  border: 1px solid $lighter;
  border-radius: 10px;
  color: #fff;
  padding: 10px;
  text-align: center;
  letter-spacing: 1.5px;
  transition: border-radius 200ms ease-in;
}
#app input:focus {
  border: 1px solid #7041FF;
  border-radius: 20px;
  outline: none;
}
#app .form-control::placeholder {
  background-color: transparent;
  border: 1px solid $lighter;
}
#app .form-control:hover {
  background-color: $lighter;
  border: 1px solid $lighter;
}
#app .custom-file-label {
  background-color: $lighter;
  border: $grey;
}
</style>
 