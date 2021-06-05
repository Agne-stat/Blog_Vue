<template>
  <main>
    <h1>Posts</h1>
    <div class="wrapper">


      <button @click="filterByDate">See new Posts</button>

      <div class="post"
        v-for="(post,index) in posts"
        :key="index">
            <router-link :to="'/post/'+post.username+'/'+post.id">
              <img :src="post.image" alt="">
            </router-link>

            <router-link :to="'/post/'+post.username">
              <p>{{post.username}}</p>
            </router-link>
            
            <h2>{{post.title}}</h2>
            <p>{{post.description}}</p>

            <router-link :to="'/post/'+post.username+'/'+post.id">
              <button>Read more</button>
            </router-link>
            
      </div>

    </div>
  </main>
</template>

<script>
export default {
  name: 'Posts',

  data() {
    return {
      posts: null,
      search: ''
    }
  },

  methods: {
    filterByDate() {
      this.posts.sort((a,b) => b.timestamp - a.timestamp)
      console.log(this.posts)
    }
  },

  created() {
    fetch('http://167.99.138.67:1111/getallposts')
    .then(res => res.json())
    .then(data => {
      this.posts = data.data
      console.log(this.posts)
    })
  },

  
  
}
</script>

<style scoped>

</style>
