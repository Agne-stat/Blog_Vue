<template>
  <main>
    <h1>Update Post</h1>
    <form>
        <div>
            <label for="title">Post title</label>
            <input type="text"
            @input="reset1"
            v-model="post.title">
            <p>{{errorMessage1}}</p>
        </div>

        <div>
            <label for="image">Post image</label>
            <input type="text"
            v-model="post.image"
            @input="reset2"
            placeholder="has to include http">
            <p>{{errorMessage2}}</p>
        </div>

        <div>
            <label for="description">Your Post</label>
            <textarea cols="30" rows="10"
            @input="reset3"
            v-model="post.description"></textarea>
            <p>{{errorMessage3}}</p>
        </div>

        <button
        @click.prevent="updatePost">Update Post</button>

    </form>

  </main>
</template>

<script>
export default {
    name: 'UpdatePost',

    data() {
        return {
            id: this.$route.params.id,
            post: null,
            errorMessage1: '',
            errorMessage2: '',
            errorMessage3: ''
        }
    },

    created() {
        let name = localStorage.getItem('blogVue_username')
        let userid = this.id

        fetch(`http://167.99.138.67:1111/getsinglepost/${name}/${userid}`)
        .then(res => res.json())
        .then(data => {
            this.post = data.data
            console.log(this.post)
        })
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

        updatePost() {
            if(this.post.title.length < 20){
                this.errorMessage1 = 'Title must be at least 20 symbols length.'
            } else if (this.post.image == '') {
                this.errorMessage2 = 'Post require image.'
            } else if (this.post.description.length < 50) {
                this.errorMessage3 = 'Description must be at least 50 symbols length.'
            } else {
                const updatedpost = {
                    title: this.post.title,
                    description: this.post.description,
                    image: this.post.image,
                    secretKey: localStorage.getItem('blogVue'),
                    id: this.post.id
                }

                fetch('http://167.99.138.67:1111/updatepost', {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(updatedpost)
                })
                .then(res => res.json())
                .then(data => {
                    this.post = data
                    console.log(data)
                    window.location.href="http://localhost:8080/newPost";
                })
            }

        }
    }

}
</script>