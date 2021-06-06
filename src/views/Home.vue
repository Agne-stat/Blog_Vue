<template>
  <main>
    <div class="container">
      <Posts></Posts>
    </div>
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

<style>
main .container {
  margin: 0 auto;
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
}

</style>
