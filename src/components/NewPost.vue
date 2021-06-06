<template>
  <main>
      <div class="container">
        <h1>Create Your Blog</h1>

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

            <div class="btn">
                <button
                @click.prevent="createPost">Create Post</button>
            </div>

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
                        <button class="update">Update Post</button>
                    </router-link>
                    <button class="delete"
                    @click="deletePost(post.id)
                    ">Delete Post</button>
                </div>
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
            errorMessage3: '',
            modalStatus: false,
            delete: false
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
        },

        modalCancel() {
            this.delete = false,
            this.modalStatus = false
        },

        modalDelete() {
            this.delete = true,
            this.modalStatus = false
        },
    },

    created() {
        let name = localStorage.getItem('blogVue_username')

        fetch(`http://167.99.138.67:1111/getuserposts/${name}`)
        .then(res => res.json())
        .then(data => {
            this.userPosts = data.data.sort((a,b) => b.timestamp - a.timestamp)
        })
    },

    watch: {
        newPost: function() {
            this.$router.go()
        }
    }

}
</script>


<style scoped>
main .container h1 {
    margin: 20px 0;
}
main .container form{
  margin: 20px auto;
  width: 100%;
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  background-color: #ffbf69;
  border-radius: 20px;
}

main .container form div{
    margin: 20px auto;
    width: 60%;
    display: flex;
    flex-wrap: wrap;
}

main .container form div p{
    padding: 10px 0;
    width: 100%;
    color: red;
}

main .container form div label{
    width: 50%;
    color: #fff;
    font-size: 1.1em;
}

main .container form div input{
    width: 50%;
    font-size: 1em;
    border: none;
    background-color: #fff;
}

main .container form .btn {
    justify-content: center;
}

main .container form .btn button{
    padding: 5px 0;
    width: 150px;
    font-size: 1em;
    border: none;
    border-radius: 10px;
    background-color: #fff;
}

main .container form .btn button:hover{
    opacity: 0.6;
    cursor: pointer;
}

main .container .error{
    margin: 10px auto;
    width: 60%;
    text-align: center;
    font-size: 1.2em;
    font-weight: 700;
    color: red;

}

main .container .my-posts {
    margin: 20px 0;
    display: flex;
    flex-direction: column;
}

main .container .my-posts .post {
    margin: 50px 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
}

main .container .my-posts .post p{
    margin: 20px 0; 
}

main .container .my-posts .post .control {
    display: flex;
    justify-content: center;
}

main .container .my-posts .post .control button{
    margin: 0 10px;
    padding: 10px 30px;
    border: none;
    border-radius: 10px;
    font-size: 1em;
    color: #fff;
}

main .container .my-posts .post .control button:hover{
    cursor: pointer;
    opacity: 0.6;
}

main .container .my-posts .post .control .update{
    background-color: #ff9f1c;
}

main .container .my-posts .post .control .delete{
    background-color: red;
}

</style>