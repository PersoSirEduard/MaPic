<template>
  <div class="signup container">
    <h1>Sign up</h1>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      
      <b-form-group
        id="input-group-2"
        label="Username: "
        label-for="input-2"
        >
        <b-form-input
          id="input-1"
          v-model="form.userName"
          type="text"
          placeholder="Enter a username"
          required
        ></b-form-input>
      </b-form-group>

    <b-form-group
        id="input-group-1"
        label="Email:"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="form.email"
          type="email"
          placeholder="Enter email"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Your Password:" label-for="input-3">
        <b-form-input
          id="input-3"
          type="password"
          v-model="form.password"
          placeholder="Enter a password"
          required
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary" class="btn-sbm">Sign up</b-button>
    </b-form>

    <p class="citations">
      [1] Your email is only used to identify the correct user and not shared with any 3rd parties.
      <br>
      [2] The password is encrypted and stored in our secure database
    </p>
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
              userName: '',
            email: '',
            password: '',
            },
            show: true,
            loggedIn: false,
        } 
    },
    methods: {
      onSubmit(event) {
        event.preventDefault()
        const expressServerBase = "http://localhost:8082/";
        const url =  expressServerBase + "api/account/signup";
        const data = {
            email: this.form.email,
            password: this.form.password,
            userName: this.form.userName,
        }
        fetch(url, {
          method: 'POST',
          mode: 'no-cors',
          cache: "no-cache",
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json'
          },
          redirect: "follow",
          referrerPolicy: "no-referrer",
          body: JSON.stringify(data)
        }).then(res => {
           const ans = JSON.parse(res.json())
          if (ans.success) {
            //successful login
            alert(JSON.stringify(res.json()))
            document.cookie=`token=${ans.token};`
          } else{
            // failed login
            alert("failed")
          }
        })
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
      emailValidator() {
            const re = /\S+@\S+\.\S+/
            if (!this.form.email || this.form.email.length <= 0) return "Email can't be empty."
            if (!re.test(this.form.email)) return 'Ooops! We need a valid email address.'
            return ''
        },
      nameValidator() {
        if (!this.form.userName || this.form.userName.length <= 0) return "Name can't be empty."
        return ''
        },
      passwordValidator() {
            if (!this.form.password || this.form.password.length <= 0) return "Password can't be empty."
                return ''
    },
      onReset(event) {
        event.preventDefault()
        // Reset our form values
        this.form.email = ''
        this.form.password = ''
        this.form.userName = ''
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
.signup {
    padding-top: 2rem;
}
h1 {
    font-weight: 700;
}
label {
    text-align: left;
}
.btn-sbm {
  display:block;margin: 0 auto;width:100%;
}
.citations {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  font-size: 0.65rem;
  line-height: 1.7;
  letter-spacing: 1.2px;
  color: #949494
}

@media screen and (min-width: 750px) {  
  #input-group-2, #input-group-1, #input-group-3 {
    width: 600px;
    margin: 15px auto;
  }
  .btn-sbm {
    width: 600px;
  }
}
</style>
