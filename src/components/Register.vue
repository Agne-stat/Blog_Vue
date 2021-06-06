<template>
  <main>
    <div class="container">
      <h1>Register</h1>
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
          <label for="passwordOne">Insert password</label>
          <input type="password"
          required
          @input="reset2"
          v-model="user.passwordOne">
          <p>{{errorMessage2}}</p>
        </div>

        <div>
          <label for="passwordTwo">Repeat password</label>
          <input type="password"
          required
          @input="reset3"
          v-model="user.passwordTwo">
          <p>{{errorMessage3}}</p>
        </div>

        <div class="btn">
          <button
          @click.prevent="register"
          >Register</button>
        </div>

        

      </form>
    </div>
    
  </main>
</template>

<script>
export default {
  name: 'Register',

  data() {
      return {
          user: {
              name: '',
              passwordOne: '',
              passwordTwo: ''
          },
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

    register() {
      if(this.user.name == '' || this.user.name.length < 5) {
        this.errorMessage1 = 'Name has to be at least 5 symbols length.'
      } else if (this.user.passwordOne == '' || this.user.passwordOne.length < 5) {
        this.errorMessage2 = 'Password should be at least 5 symbols length'
      } else if (this.user.passwordTwo !== this.user.passwordOne) {
        this.errorMessage3 = 'Password should match'
      } else {

        const user = {
          name: this.user.name,
          passwordOne: this.user.passwordOne,
          passwordTwo: this.user.passwordTwo
        }

        fetch('http://167.99.138.67:1111/createaccount', {
          method: "POST",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data => {
          this.user.name = '',
          this.user.passwordOne = '',
          this.user.passwordTwo = ''
          console.log(data)
          window.location.href="http://localhost:8080/login"
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
  height: 400px;
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
