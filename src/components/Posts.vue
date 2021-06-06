<template>
  <div class="posts-container">
      <button class="sort-posts" @click="filterByDate">See new Posts</button>

      <div class="posts">
        <div class="post"
          v-for="(post,index) in posts"
          :key="index">
              <router-link :to="'/post/'+post.username+'/'+post.id" class="post-img">
                <img :src="post.image" alt="">
              </router-link>

              <router-link :to="'/post/'+post.username" class="post-username">
                <p>{{post.username}}</p>
              </router-link>

              <router-link :to="'/post/'+post.username+'/'+post.id" class="post-title">
                <h2>{{post.title | snippetTitle}}</h2>
              </router-link>
              
              <router-link :to="'/post/'+post.username+'/'+post.id" class="post-content">
                <p>{{post.description | snippet}}</p>
              </router-link>

              <router-link :to="'/post/'+post.username+'/'+post.id" class="post-button">
                <button>Read more</button>
              </router-link>
              
        </div>
      </div>
      
  </div>
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
    }
  },

  created() {
    fetch('http://167.99.138.67:1111/getallposts')
    .then(res => res.json())
    .then(data => {
      this.posts = data.data
    })
  },
}
</script>

<style scoped>
.posts-container {
  margin-top: 50px;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.posts-container .sort-posts {
  padding: 10px 0;
  width: 150px;
  border: none;
  border-radius: 10px;
  background-color: #ff9f1c;
  color: #fff;
  font-size: 1em;
}

.posts-container .sort-posts:hover {
  cursor: pointer;
  opacity: 0.6;
}

.posts-container .posts {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.posts-container .posts .post {
  margin: 20px 0;
  padding: 0 20px;
  width: 30%;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: space-between;
  border: 2px solid #cbf3f0;
  cursor: pointer;
  border-radius: 20px;
}

.posts-container .posts .post a {
  width: 100%;
  display: flex;
  flex-direction: column;
  text-decoration: none;
}

.posts-container .posts .post .post-img {
  width: 100%;
  height: 60%;
  align-self: flex-start;
}

.posts-container .posts .post .post-img img {
  width: 100%;
  height: 100%;
  align-self: flex-start;
}

.posts-container .posts .post .post-username {
  margin-top: 10px;
  width: 100%;
  height: 5%;
  color: #ff9f1c;
}

.posts-container .posts .post .post-title h2 {
  width: 100%;
  height: 10%;
  color: #2ec4b6;
}

.posts-container .posts .post .post-content p {
  padding: 20px 0;
  width: 100%;
  height: 20%;
  color: #000;
}

.posts-container .posts .post .post-button  {
  width: 100%;
  height: 5%;
}

.posts-container .posts .post .post-button button {
  padding: 5px 0;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  background-color: #ff9f1c;
  color: #fff;
}

.posts-container .posts .post .post-button button:hover {
  opacity: 0.6;
}



</style>
