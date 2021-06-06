<template>
  <div id="app">
    <div class="wrapper">
      <Header></Header>
      <router-view/>
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
import Header from './views/Header.vue'
import Footer from './views/Footer.vue'

export default {
  name: "App",

  components: {
    Header,
    Footer
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Josefin Sans", sans-serif;
}

body {
  width: 100vw;
  min-height: 100vh;
}

body #app {
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

#app .wrapper {
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

#app .wrapper header {
  width: 100%;
  height: 8vh;
  background-color: #2ec4b6;
}

#app .wrapper main {
  width: 100%;
  min-height: 87vh;
}

#app .wrapper footer {
  width: 100%;
  height: 5vh;
  background-color: #2ec4b6;
}

</style>
