<template>
  <main>
    <div class="container">

      <div class="post">
            <img :src="this.userPost.image" alt="">
            <p class="post-username">{{this.userPost.username}}</p>
            <h2>{{this.userPost.title}}</h2>
            <p class="post-content">{{this.userPost.description}}</p>
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
    })
  }
  
}
</script>

<style scoped>

main .container .post{
  margin: 20px 0;
  width: 100%;
}

main .container .post img{
  width: 100%;
  height: auto;
}

main .container .post .post-username{
  padding: 20px 0;
  color: #ff9f1c;
}

main .container .post h2{
  padding: 20px 0;
}
</style>
