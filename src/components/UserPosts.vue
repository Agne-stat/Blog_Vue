<template>
  <main>
    <div class="container">

      <div class="post"
        v-for="(post,index) in posts"
        :key="index">
            <img :src="post.image" alt="">
            <p class="post-username">{{post.username}}</p>
            <h2>{{post.title}}</h2>
            <p class="post-content">{{post.description}}</p>
      </div>

    </div>
  </main>
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
    })
  }
  
}
</script>

<style scoped>
main .container .post{
  padding: 20px;
  margin: 20px 0;
  width: 100%;
  background-color: #cbf3f0;
}

main .container .post img{
  width: 100%;
  height: auto;
}

main .container .post .post-username{
  width: 100%;
  padding: 20px 0;
  color: #ff9f1c;
}

main .container .post h2{
  width: 100%;
  padding: 20px 0;
}

main .container .post .post-content{
  width: 100%;
}

</style>
