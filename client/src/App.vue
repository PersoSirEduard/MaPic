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
    <router-view></router-view>
  </div>
</template>

<script>
import {verify, getCookie, logout, deleteCookie} from './auth'

export default {
  name: 'App',
  data() {
      return {
        loggedIn: false
      }
  },
  methods: {
    async logoutFunction() {
      if (this.loggedIn) {
        const token = getCookie(document.cookie, 'token')
        console.log(token)
        this.loggedIn = await !logout(token)
        console.log(this.loggedIn)
        document.cookie = deleteCookie(document.cookie, "token")
        console.log(document.cookie)
      }
      
    }
  },
  async mounted() {
    const token = getCookie(document.cookie, "token")
    // token=fjdafu93jjpafd;
    await verify(token).then(verifyValue => {
      console.log(verifyValue)
      this.loggedIn = token == '' ? false : verifyValue
      console.log(this.loggedIn)
    });
    // console.log(verifyValue)
    // this.loggedIn = token == '' ? false : verifyValue
    // console.log(this.loggedIn)
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
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
  color: #7041FF !important;
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
  background-color: #303a59;
  border: 1px solid #303a59;
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
  border: 1px solid #303a59;
}
#app .form-control:hover {
  background-color: #303a59;
  border: 1px solid #303a59;
}
#app .custom-file-label {
  background-color: #303a59;
  border: #9090A0;
}

</style>
