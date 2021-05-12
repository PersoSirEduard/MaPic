<template>
  <div class="login container">
    <h1 style="font-weight:700;">Login</h1>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group
        id="input-group-1"
        label="Email address:"
        label-for="input-1"
        description="We'll never share your email with anyone else."
      >
        <b-form-input
          id="input-1"
          v-model="form.email"
          type="email"
          placeholder="Enter email"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Your Password:" label-for="input-2">
        <b-form-input
          id="input-2"
          type="password"
          v-model="form.password"
          placeholder="Enter password"
          required
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary" class="btn-sbm">Login</b-button>
    </b-form>
  </div>
</template>
<script>
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
      
  },
  data() {
      return {
            form: {
            email: '',
            password: '',
            },
            show: true,
            loggedIn: false,
        } 
    },
    methods: {
      async onSubmit(event) {
        event.preventDefault()
        const expressServerBase = "http://localhost:8082/";
        const url = expressServerBase + "api/account/signin";
        // clear form
        
        const data = {
            email: this.form.email,
            password: this.form.password,
        }
        console.log(JSON.stringify(data))
        const response = await fetch(url, {
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
  });
  const returnData = await response.json();
  console.log("Login request result: " + JSON.stringify(returnData));
        // await fetch(url, {
        //   method: 'POST',
        //   mode: 'no-cors',
        //   credentials: 'same-origin',
        //   headers: {
        //     'Content-Type': 'application/json'
        //   },
        //   body: JSON.stringify(data)
        // }).then(res => {
        //   //const ans = JSON.parse(res.json())
        //   const ans  = res.json()
        //   if (ans.success) {
        //     //successful login
        //     alert(JSON.stringify(res.json()))
        //     document.cookie=`token=${ans.token};`
        //   } else{
        //     // failed login
        //     alert("failed")
        //   }
        // })


      },
      verify(token) {
        const expressServerBase = "http://localhost:8082/";
        const url = expressServerBase + "api/account/verify?token=" + token;
        
        fetch(url).then((res) =>{
            console.log(JSON.stringify(res.json()));
            var ans = JSON.parse(res.json())
            if (ans.sucess) {
            this.loggedIn = true;
            this.$router.push('/') //redirecting user to homepage if already logged in
            }
        });
        },
      onReset(event) {
        event.preventDefault()
        // Reset our form values
        this.form.email = ''
        this.form.password = ''
        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      }
    }
})
</script>
<style scoped>
.login {
    padding-top: 2rem;
}
.btn-sbm {
  display:block;
  margin:0 auto;
  width:100%;
}
@media screen and (min-width: 750px) {  
  #input-group-2, #input-group-1{
    width: 600px;
    margin: 15px auto;
  }
  .btn-sbm {
    width: 600px;
    margin: 20px auto
  }
}
</style>
