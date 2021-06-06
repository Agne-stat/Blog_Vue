<template>
  <main>
    <h1>Login</h1>
    <form>
        <div>
            <label for="name">Your username</label>
            <input type="text"
            required
            @input="reset1"
            v-model="user.name">
            <p>{{errorMessage1}}</p>
        </div>

        <div>
            <label for="password">Insert password</label>
            <input type="password"
            required
            @input="reset2"
            v-model="user.password">
            <p>{{errorMessage2}}</p>
        </div>

        <button
        @click.prevent="login"
        >Login</button>

    </form>
    <p>{{errorMessage3}}</p>
  </main>
</template>

<script>
export default {
  name: 'Login',

  data() {
      return {
          user: {
              name: '',
              password: ''
          },
          errorMessage1: '',
          errorMessage2: '',
          errorMessage3: '',

      }
  },

  methods: {
    reset1() {
      this.errorMessage1 = ''
      this.errorMessage3 = ''
    },
    reset2() {
      this.errorMessage2 = ''
      this.errorMessage3 = ''
    },

    login() {
        if(this.user.name == '' || this.user.name.length < 5) {
        this.errorMessage1 = 'Name has to be at least 5 symbols length.'
        } else if (this.user.password == '' || this.user.password.length < 5) {
        this.errorMessage2 = 'Password should be at least 5 symbols length'
        } else {
            const user = {
            name: this.user.name,
            password: this.user.password
            }

            fetch('http://167.99.138.67:1111/login', {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(user)
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                console.log(data.secretKey)
                localStorage.setItem('blogVue', data.secretKey)
                localStorage.setItem('blogVue_username', user.name)

                if (data.success === false) {
                    this.errorMessage3 = 'No such user'
                } else {
                window.location.href="http://localhost:8080/newPost"
                }
            })
        }
    }
      
  }
  
}
</script>