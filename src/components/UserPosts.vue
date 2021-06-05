<template>
  <div>
    <h1>{{this.posts.username}} Posts</h1>
    <div class="wrapper">

      <div class="post"
        v-for="(post,index) in posts"
        :key="index">
            <img :src="post.image" alt="">
            <p>{{post.username}}</p>
            <h2>{{post.title}}</h2>
            <p>{{post.description}}</p>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'UserPosts',

  data() {
    return {
      posts: null,
    }
  },

  created() {
    let userName = this.$route.params.name

    fetch(`http://167.99.138.67:1111/getuserposts/${userName}`)
    .then(res => res.json())
    .then(data => {
      this.posts = data.data
      console.log(this.posts)
    })
  }
  
}
</script>

<style scoped>

</style>
