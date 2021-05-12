<template>
  <div class="about">
    <h1>About</h1>
    <b-card class="about-s1">
      <b-card-text>
        MaPic is a mobile-first designed web app app that makes it easier than every to find photoshoot locations.
        <br />
        Photographers all around the world can use the app to enter a keyword and get a list of all the known spots near them. 
        <br />
        Users can also help grow the MaPic database by creating an account and submitting their favourite spots.
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
  },
  components: {
  }
})
</script>

<style scoped lang="scss">
@import '../sass/variables.scss';
.about-s1 {
  color: white; 
  background-color: $lighter;
  width: 400px;
  margin: 0 auto;
  padding: 10px 0;
}

@media screen and (min-width: 750px) {
  .about-s1 {
    width: 750px;
  }
}
</style>