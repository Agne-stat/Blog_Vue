<template>
  <main>
      <div class="container">
        <h1>Login</h1>
        <form>
            <div>
                <label for="name">Your username</label>
                <input type="text"
                required
                @input="reset1"
                v-model="user.name">
                <p>{{errorMessage1}}</p>
            </div>

            <div>
                <label for="password">Insert password</label>
                <input type="password"
                required
                @input="reset2"
                v-model="user.password">
                <p>{{errorMessage2}}</p>
            </div>

            <div class="btn">
                <button
                @click.prevent="login"
                >Login</button>
            </div>

        </form>
        <p class="error">{{errorMessage3}}</p>
      </div>
    
  </main>
</template>

<script>
export default {
  name: 'Login',

  data() {
      return {
          user: {
              name: '',
              password: ''
          },
          errorMessage1: '',
          errorMessage2: '',
          errorMessage3: '',

      }
  },

  methods: {
    reset1() {
      this.errorMessage1 = ''
      this.errorMessage3 = ''
    },
    reset2() {
      this.errorMessage2 = ''
      this.errorMessage3 = ''
    },

    login() {
        if(this.user.name == '' || this.user.name.length < 5) {
        this.errorMessage1 = 'Name has to be at least 5 symbols length.'
        } else if (this.user.password == '' || this.user.password.length < 5) {
        this.errorMessage2 = 'Password should be at least 5 symbols length'
        } else {
            const user = {
            name: this.user.name,
            password: this.user.password
            }

            fetch('http://167.99.138.67:1111/login', {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(user)
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                console.log(data.secretKey)
                localStorage.setItem('blogVue', data.secretKey)
                localStorage.setItem('blogVue_username', user.name)

                if (data.success === false) {
                    this.errorMessage3 = 'No such user'
                } else {
                window.location.href="http://localhost:8080/newPost"
                }
            })
        }
    }
      
  }
  
}
</script>

<style scoped>
main .container h1 {
  margin: 20px 0;
  text-align: center;
}
main .container form{
  margin: 20px auto;
  width: 60%;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  background-color: #ffbf69;
  border-radius: 20px;
}

main .container form div{
    margin: 20px auto;
    width: 80%;
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
    font-size: 1.1em;
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
</style>