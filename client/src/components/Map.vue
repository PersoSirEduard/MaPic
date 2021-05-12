<template>
  <div id="map">
    <div id="mapContainer" class="mapContainer">
      <p>Loading Map...</p>
      <p>User locations are not saved or shared with 3rd parties</p>
    </div>
  </div>
</template>

<script>
// import  {query_all_posts_function}  from './../backendConn.js'
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import { defineComponent } from 'vue'

export default defineComponent({
    name: "Map",
    props: ['markers', 'currPos'],
    setup() {
      
    },
    data() {
      return {
        mapDiv: null,
      }
    },
    methods: {
        setupLeafletMap () {
          this.mapDiv = L.map("mapContainer").setView(this.currPos, 13);
          L.tileLayer(
            "https://api.mapbox.com/styles/v1/miniapple8888/cklo4ivjr42cr17k8xtyqd3b7/tiles/256/{z}/{x}/{y}@2x?access_token={accessToken}",
          {
            attribution: 
              'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: "mapbox/streets-v11",
            accessToken: 'pk.eyJ1IjoiYXRhd2FrbCIsImEiOiJja29ncHE2azMwZXhsMnFsbHpxNGhvdmZyIn0.E4dMkWfUlVbW_r4ekxPYYg',
          }).addTo(this.mapDiv);
          
          // Add markers to map if any
          if (!this.markers.length) {
            this.markers.forEach(mark => this.addMarker(mark));
          }
        },
        addMarker(point) {
          point.leafObj = L.marker([point.latitude, point.longitude]).addTo(this.mapDiv)
            .bindPopup(`<b>point.title</b><br /> <img src="${point.url}" />`);
          /*
          console.log(point);
          this.markers[0].leafletObj = L.marker([this.markers[0].latitude, this.markers[0].longitude]).addTo(this.mapDiv)
            .bindPopup(`<b>this.markers[0].title</b><br /> <img src="${this.markers[0].url}" />`);
          this.markers.forEach((mark) => {
            mark.leafletObj = L.marker([mark.latitude, mark.longitude]).addTo(this.mapDiv)
              .bindPopup(`<b>mark.title</b><br /> <img src="${mark.url}" />`);
            console.log(mark);
          })
          */
        }
        /*
        addMarkers() {
          for(var i=0;i<this.results.length;i++){
              var location = this.results[i]
              let strength = 35;
              let radius = "#7041FF";
              var marker = L.circleMarker([location.latitude, location.longitude], {radius:strength, color:color}).addTo(this.mapDiv);
                marker.bindPopup(location.title).openPopup();
          }
        }
        */
    },
    mounted() {
      this.setupLeafletMap();
    }
})
</script>
<style scoped lang="scss">
@import '../sass/variables';
#map {
  width: 100%;
  text-align:center;
  margin: 0 auto;
}
.mapContainer {
  width: 95vw;
  height: 50vh;
  margin: 0 auto;
  border-radius: 20px;
}
@media screen and (min-width: 750px) {  
  #mapContainer {
    width: 750px;
  }
}
#mapContainer .leaflet-popup-content-wrapper, .leaflet-popup-tip {
    background-color: $darkness;
    color: white;
}
#mapContainer .leaflet-popup-content {
    margin:0;
    overflow: hidden;
    max-height: 100px;
    border-radius: 20px;
}

</style>
