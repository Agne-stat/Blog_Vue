<template>
  <div>
    <h1>Login</h1>
    <form>
        <input type="text"
        required
        v-model="user.name">

        <input type="password"
        required
        v-model="user.password">

        <button
        @click.prevent="login"
        >Login</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Login',

  data() {
      return {
          user: {
              name: '',
              password: ''
          }
      }
  },

  methods: {
    login() {
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
        })

    }
      
  }
  
}
</script>