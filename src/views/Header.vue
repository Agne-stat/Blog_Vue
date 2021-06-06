<template>
  <header>
      <div class="container">
        <nav>
          <ul>
              <li><router-link to="/">HOME</router-link></li>
              <li v-if="!logedin"><router-link to="/register">REGISTER</router-link></li>
              <li v-if="!logedin"><router-link to="/login">LOGIN</router-link></li>
              <li v-if="logedin"><router-link to="/newPost">MY BLOG</router-link></li>
              <li v-if="logedin" @click="logout"><router-link exact to="/">LOGOUT</router-link></li>
          </ul>
        </nav>
      </div>
      
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

<style scoped>
header .container {
  margin: 0 auto;
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
}

header .container nav{
  width: 100%;
  height: 100%;
}

header .container nav ul{
    width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-content: center;
}

header .container nav ul li{
    padding: 20px 0 0 0;
    list-style: none;
    width: 15%;
    text-align: right;
}

header .container nav ul li a{
    text-decoration: none;
    color: #fff;
    font-size: 1.1em;
}
header .container nav ul li a:hover{
    color: #ff9f1c;
}

</style>
