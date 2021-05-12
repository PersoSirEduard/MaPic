<template>
  <div class="home">
    <b-jumbotron id="home-jumbo" header="MaPic" lead="Find perfect locations for your photos!">
      <b-input-group class="mt-3">
      <b-form-input
      id="input-1"
          v-model="search"
          type="text"
          placeholder="Enter keyword"
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
      <Map v-if="userCoords" :markers="locations" :currPos="userCoords" />
      <div v-else style="text-align: center; color: white; font-size: 1.2rem; width: 95vw; margin: 0 auto;">
        <p>Please allow location services to display map.</p>
      </div>
    
    <!--
      <b-container>
      </b-container>
      <b-container id="locations">
        
        <a @click.prevent="stopProcess" v-b-modal.location-modal>
          <Location v-for="(location) in locations" :key="location.id" :id="location.id" :locationImg="location.url" :locationTitle="location.title" :locationLongitude="location.longitude" :authorImg="location.author.img" :authorName="location.author.name" />
        </a>
      </b-container>
      <b-modal id="location-modal" size="xl">
      
      <div class="location-img">
        <img :src="currentLocation.img" alt="">
      </div>
      <p>{{currentLocation.location}}</p>
      <p>{{currentLocation.description}}</p>
      <p>{{curentLocation.author.name}}</p>
      <div class="location-img">
        <img :src="currentLocation.author.img" alt="">
      </div>
    </b-modal>-->

  </div>
</template>

<script>
import Map from '../components/Map';
import {query_all_posts_function} from './../backendConn.js';

export default {
  name: 'Home',
  components: {
    Map,
  },
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
  },
  methods: {
    stopProcess(e) {
      e.preventDefault()
      // gets parent location to get the id of the location and display in modal
      var currentEl = e.target.parentElement
      while(currentEl._prevClass!=="location") {
        currentEl = currentEl.parentElement
      }
      /*
      let locationId = currentEl.id
      this.currentLocation.id = locationId
      this.currentLocation.description = this.locations[locationId].description
       this.currentLocation.location = this.locations[locationId].location
       this.currentLocation.img = this.locations[locationId].img
       this.currentLocation.author.name = this.locations[locationId].author.name
       this.currentLocation.author.img = this.locations[locationId].author.img*/
    },
    async searchFunc(event) {
        event.preventDefault()
        //const expressServerBase = "http://localhost:8082/";
        //const url =  expressServerBase + "api/posts/search_post";
        /*var sucessfulLookup = (position) => {
          const { latitude, longitude } = position.coords;
          const apikey = '756a63ee12b6463ca4c4528cde632393';
          fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apikey}`).then(response => response.json().then(console.log));
        }
        // Set variables for body JSON
        var lat='';
        var long='';
        window.navigator.geolocation.getCurrentPosition((position)=>{
          const { latitude, longitude } = position.coords;
          const apikey = '756a63ee12b6463ca4c4528cde632393';
          lat=this.userCoords[0];
          long=this.userCoords[1];
          fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apikey}`).then(console.log);
        }, console.log)
        console.log(lat+long)
        */
        //let returnData = await search_post_function(data)
        await this.get_all()
        
    },
    async get_all() {
      let returnData = await query_all_posts_function()
      console.log("posted")
      console.log(returnData)
      this.locations = returnData.posts.slice(); // deep array copy without reference
      console.log(this.locations)
    },
    getCurrentLocation() {
      if (navigator.geolocation) navigator.geolocation.getCurrentPosition(this.printPos)
      // if (navigator.geolocation) navigator.geolocation.watchPosition(this.printPos)
    },
    printPos(p) {
      this.userCoords = [p.coords.latitude, p.coords.longitude];
    }
  },
  mounted() {
    this.getCurrentLocation();
    this.get_all()
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
