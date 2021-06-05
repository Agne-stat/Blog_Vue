<template>
  <main>
    <h1>Homepage</h1>
    <Posts></Posts>
  </main>
</template>

<script>
import Posts from '../components/Posts.vue'

export default {
  name: 'Home',

  components: {
    Posts
  }
  
}
</script>

<style scoped>

</style>
