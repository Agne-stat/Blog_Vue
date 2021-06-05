<template>
  <div>
    <h1>Update Post</h1>
    <form>
        <input type="text"
        v-model="post.title">
        
        <textarea cols="30" rows="10"
        v-model="post.description"></textarea>

        <button
        @click.prevent="updatePost">Update Post</button>

    </form>

  </div>
</template>

<script>
export default {
    name: 'UpdatePost',

    data() {
        return {
            id: this.$route.params.id,
            post: null
            
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
        updatePost() {

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
            })
        }
    }

}
</script>