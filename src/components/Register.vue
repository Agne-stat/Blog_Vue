<template>
  <main>
    <h1>Register</h1>
    <form>
        <input type="text"
        required
        v-model="user.name">

        <input type="password"
        required
        v-model="user.passwordOne">

        <input type="password"
        required
        v-model="user.passwordTwo">

        <button
        @click.prevent="register"
        >Register</button>
    </form>
  </main>
</template>

<script>
export default {
  name: 'Register',

  data() {
      return {
          user: {
              name: '',
              passwordOne: '',
              passwordTwo: ''
          }
      }
  },

  methods: {
    register() {

      const user = {
        name: this.user.name,
        passwordOne: this.user.passwordOne,
        passwordTwo: this.user.passwordTwo
      }

      fetch('http://167.99.138.67:1111/createaccount', {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(user)
      })
      .then(res => res.json())
      .then(data => console.log(data))
    }
  }
}
</script>
