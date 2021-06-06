<template>
  <main>
    <h1>Cerate Your Blog</h1>

    <form>
        <div>
            <label for="title">Post title</label>
            <input type="text"
            @input="reset1"
            v-model="newPost.title">
            <p>{{errorMessage1}}</p>
        </div>

        <div>
            <label for="image">Post image</label>
            <input type="text"
            v-model="newPost.image"
            @input="reset2"
            placeholder="has to include http">
            <p>{{errorMessage2}}</p>
        </div>  

        <div>
            <label for="description">Your Post</label>
            <textarea cols="30" rows="10"
            @input="reset3"
            v-model="newPost.description"></textarea>
            <p>{{errorMessage3}}</p>
        </div>

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
                <button 
                @click="deletePost(post.id)
                ">Delete Post</button>
            </div>
        </div>
    </div>

  </main>
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
                image: ''
            },
            userPosts: null,
            errorMessage1: '',
            errorMessage2: '',
            errorMessage3: ''
        }
    },

    methods: {
        reset1() {
            this.errorMessage1 = ''
        },
        reset2() {
            this.errorMessage2 = ''
        },
        reset3() {
            this.errorMessage3 = ''
        },

        createPost() {
            if(this.newPost.title == '' || this.newPost.title.length < 20){
                this.errorMessage1 = 'Title must be at least 20 symbols length.'
            } else if (this.newPost.image == '') {
                this.errorMessage2 = 'Post require image.'
            } else if (this.newPost.description == '' || this.newPost.description.length < 50) {
                this.errorMessage3 = 'Description must be at least 50 symbols length.'
            } else {
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
            }

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
                    this.$router.go()
                })
        }
    },

    created() {
        let name = localStorage.getItem('blogVue_username')

        fetch(`http://167.99.138.67:1111/getuserposts/${name}`)
        .then(res => res.json())
        .then(data => {
            this.userPosts = data.data.sort((a,b) => b.timestamp - a.timestamp)
            console.log(this.userPosts)
        })
    },

    watch: {
        newPost: function() {
            this.$router.go()
        }
    }

}
</script>