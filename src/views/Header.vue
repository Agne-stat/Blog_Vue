<template>
  <header>
      <nav>
          <ul>
              <li><router-link to="/">Home</router-link></li>
              <li v-if="!logedin"><router-link to="/register">Register</router-link></li>
              <li v-if="!logedin"><router-link to="/login">Login</router-link></li>
              <li v-if="logedin"><router-link to="/newPost">Create Blog</router-link></li>
              <li v-if="logedin" @click="logout"><router-link to="/">Logout</router-link></li>
          </ul>
      </nav>
  </header>
</template>


<script>
export default {
    name: "Header",

    data() {
        return {
            logedin: false,

        }
    },

    methods: {
        logout() {
            localStorage.removeItem('blogVue')
            this.$router.go()
        }
    },

    created() {
        if(localStorage.blogVue) {
            this.logedin = true
        }
    },

    

}
</script>

<style>

</style>
