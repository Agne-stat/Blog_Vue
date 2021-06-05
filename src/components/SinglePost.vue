<template>
  <main>
    <h1>Post</h1>
    <div class="wrapper">

      <div class="post">
            <img :src="this.userPost.image" alt="">
            <p>{{this.userPost.username}}</p>
            <h2>{{this.userPost.title}}</h2>
            <p>{{this.userPost.description}}</p>
      </div>

    </div>
  </main>
</template>

<script>
export default {
  name: 'SinglePosts',

  data() {
    return {
      userPost: null,
    }
  },

  created() {
    let userName = this.$route.params.name
    let userId = this.$route.params.id

    fetch(`http://167.99.138.67:1111/getsinglepost/${userName}/${userId}`)
    .then(res => res.json())
    .then(data => {
      this.userPost = data.data
      console.log(this.userPost)
    })
  }
  
}
</script>

<style scoped>

</style>
