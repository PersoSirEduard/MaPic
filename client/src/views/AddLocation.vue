<template>
    <div>
      <h1>Add Location</h1>
      <b-container>
        <b-form
          @submit="onSubmit"
          @reset="onReset"
        >
          <!-- Location -->
          <b-form-group
            id="input-group-1"
            label="Location"
            label-for="input-1"
            class="mt-2"
          >
            <!-- description="Location of picture spot" -->
            <b-form-input
              id="input-1"
              type="text"
              placeholder="Enter Location here..."
              required
            ></b-form-input>
          </b-form-group>

          <!-- Title -->
          <b-form-group
            id="input-group-2"
            label="Title"
            label-for="input-2"
            class="mb-3"
          >
            <b-form-input
              id="input-2"
              type="text"
              placeholder="Enter a title..."
              required
            ></b-form-input>
          </b-form-group>

          <!-- Image upload -->
          <b-form-group
            id="input-group-3"
            label="Image file"
            label-for="input-3"
            description="Supported types: JPG, JPEG, PNG"
            class="mt-2"
          >
            <b-form-file
              id="input-3"
              v-model="newImg"
              :state="Boolean(newImg)"
              placeholder="Browse or drop file here..."
              drop-placeholder="Drop file here..."
              @change="upImg"
            ></b-form-file>
          </b-form-group>
            
          <!-- Buttons -->
          <b-row class="mt-3 mb-2 btn-row">
            <b-col>
              <b-button 
                type="submit"
                variant="primary"
                size="sm"
              >
                Add Location
              </b-button>
            </b-col>
            <b-col>
              <b-button 
                @click="clearFile"
                variant="info"
                size="sm"
              >
                Clear File
              </b-button>
            </b-col>
          </b-row>
         
        </b-form>
      </b-container>
      <p class="image-label">Preview: </p>
      <div class="imagePreviewWrapper">
        <img v-if="imgP" :src="imgP" alt="up img" />
      </div>
    </div>
</template>
<script>
import { defineComponent } from 'vue'

export default defineComponent({
    setup() {
        
    },
    data() {
        return {
          imgP: null, // image preview
          newImg: null,
          allImgs: [],
          location: '', // image location
          loggedIn: true,
          userName: '',
        }
    },
     methods: {
        onSubmit(e) {
          e.preventDefault();
          alert(this.imgP)
          console.log(this.imgP)
          /*
          var lat='';
            var long='';
            window.navigator.geolocation.getCurrentPosition((position)=>{
            const { latitude, longitude } = position.coords;
            const apikey = '756a63ee12b6463ca4c4528cde632393';
            lat=latitude;
            long=longitude;
            fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apikey}`).then(console.log);
            }, console.log)
          const data = {
              user_name: this.user_name,
            image_blob: imgP,
            title: title,
            latitude: lat,
            longitude: long
          }
          fetch(url, {
                method: "POST",
                mode: "no-cors",
                cache: "no-cache",
                credentials: "same-origin",
                headers: {
                "Content-Type": "application/json",
                },
                redirect: "follow", // manual, *follow, error
                referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                body: JSON.stringify(data), // body data type must match "Content-Type" header
            }).then((res) => {
                var ans = JSON.parse(res.json())
            })*/
        },
        onReset(e) {
        e.preventDefault()
        // Resetvalues
        this.location = '';
        },
        sendFile() {
          const expressServerBase = "http://localhost:8082/";
          console.log(expressServerBase)
        },
        clearFile() {
          this.newImg = null;
          this.imgP = null;
        },
        upImg(e) {
          this.imgP = URL.createObjectURL(e.target.files[0]);
          this.allImgs.push(this.imgP);
          console.log(this.imgP);
        },
        verify(token) {
        const expressServerBase = "http://localhost:8082/";
        const url = expressServerBase + "api/account/verify?token=" + token;
        
        fetch(url).then((res) =>{
            console.log(JSON.stringify(res.json()));
            var ans = JSON.parse(res.json())
            if (!ans.sucess) {
                this.loggedIn = false;
                this.$router.push('/') //redirecting user to homepage if not logged in
            } else {
                this.userName = ans.user_name
            }
        });
        },
      },
      created() {
        // check if user is logged in
        // show form if logged in
        // else take them to the login page
      }
})
</script>

<style scoped lang="scss">
@import '../sass/variables';
.image-label {
  color: #d3d3d3;
  font-size: 1.3rem;
  font-weight: 400;
  text-align: left;
  width: 400px;
  margin: 50px auto 10px auto;
}
.imagePreviewWrapper {
  margin: 5px auto 0 auto;
  max-width: 400px;
  height: auto;
  border-radius: 10px;
  background-color: $lighter;
  padding: 15px;
}
.imagePreviewWrapper > img {
  width: 100%;
  height: 100%;
  padding: 5px;
}

@media screen and (min-width: 750px) {  
  #input-group-2, #input-group-1, #input-group-3 {
    width: 600px;
    margin: 15px auto;
  }
  .btn-row {
    width: 600px;
    margin: 20px auto
  }
  .imagePreviewWrapper {
    max-width: 600px;
  }
}
</style>
