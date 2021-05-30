<template>
  <div class="home">
    <b-jumbotron id="home-jumbo" header="MaPic" lead="Find perfect locations for your photos!">
      <b-input-group class="mt-3">
      <b-form-input
      id="input-1"
          v-model="search"
          type="text"
          placeholder="Enter a keyword"
          required
      ></b-form-input>
      <b-input-group-append>
        <b-button variant="primary" @click="searchFunc">Search</b-button>
      </b-input-group-append>
      
      </b-input-group>
      <div style="display:block;margin:auto;margin-top: 10px;">
          <b-button variant="primary" style="margin-right:5px;">Most popular</b-button>
          <b-button variant="white">Recent</b-button>
        </div>
    </b-jumbotron>

  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      search: '',
      userCoords: null, // current geoposition from browser
      currentLocation: {
        id:0,
        title: '',
          latitude: '',
          longitude: '',
          img: '',
          author: {
            user_name: '',
            img: ''
          }
      },
      locations: [],
    }
  }
}
</script>

<style scoped>
#app .navbar {
  margin-bottom: 0px !important;
}
.jumbotron {
  background: linear-gradient(0deg, rgba(32,32,64,0.99) 0%, rgba(32,32,64,0.25) 100%, rgba(96,32,128,1) 100%), url('https://cdn.mos.cms.futurecdn.net/gvQ9NhQP8wbbM32jXy4V3j-1024-80.jpg.webp');
  background-position: center;
  background-size: cover;
  color: white;
  border-radius: 25px 25px 0px 0px;
  margin-right: 10px;
  margin-left: 10px;
  margin-top: 5px;
}
.jumbotron h1 {
  font-weight: 700;
}
input {
  padding-top: 25px !important;
  padding-bottom: 25px !important;
  z-index:1;
}
.form-control:placeholder {
  z-index:-11;
}
.input-group-append {
  margin-left: -25px;
  z-index: 1000;
}
.input-group-append button {
  padding: 5px 20px !important;
}
#locations {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
#locations a {
  display: block;
  color: white;
}
@media screen and (min-width: 750px) {
  .jumbotron {
    width: 750px;
    margin: 5px auto 0 auto;
  }
}
</style>