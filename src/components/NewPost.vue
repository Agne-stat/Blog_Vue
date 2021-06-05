<template>
  <div>
    <h1>New Post</h1>
    <form>
        <input type="text"
        v-model="newPost.title">
        
        <textarea cols="30" rows="10"
        v-model="newPost.description"></textarea>

        <button
        @click.prevent="createPost">Create Post</button>

    </form>


    <div class="my-posts">
        <div class="post"
        v-for="(post,index) in userPosts"
        :key="index">
            <img :src="post.image" alt="">
            <p>{{post.username}}</p>
            <h2>{{post.title}}</h2>
            <p>{{post.description}}</p>
            <div class="control">
                <router-link :to="'newPost/'+post.id">
                    <button>Update Post</button>
                </router-link>
                <button @click="deletePost(post.id)">Delete Post</button>
            </div>
        </div>
    </div>

  </div>
</template>

<script>
export default {
    name: 'NewPost',

    data() {
        return {
            newPost: {
                username: localStorage.getItem('blogVue_username') ,
                title: '',
                description: '',
                image: 'https://images.pexels.com/photos/7772719/pexels-photo-7772719.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
            },
            userPosts: null
            
        }
    },

    methods: {
        createPost() {
            const newPost = {
                title: this.newPost.title,
                description: this.newPost.description,
                image: this.newPost.image,
                secretKey: localStorage.getItem('blogVue')
            }

            fetch('http://167.99.138.67:1111/createpost', {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(newPost)
            })
            .then(res => res.json())
            .then(data => {
                this.newPost = data
                console.log(data)
            })
        },

        deletePost(userid) {
            const deletedpost = {
                secretKey: localStorage.getItem('blogVue'),
                id: userid
            }

            fetch('http://167.99.138.67:1111/deletepost', {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(deletedpost)
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
            })
        }
    },

    created() {
        let name = localStorage.getItem('blogVue_username')

        fetch(`http://167.99.138.67:1111/getuserposts/${name}`)
        .then(res => res.json())
        .then(data => {
            this.userPosts = data.data
            console.log(this.userPosts)
        })
    }

}
</script>