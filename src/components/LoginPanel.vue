<template>
    <div class="container">
        <h1>ESICLOUD</h1>
        <form @submit.prevent="login">
            <div class="field user">
                <label for="username">Nom d'utilisateur : </label>
                <input v-model="username" type="text" id="username" name="Username" placeholder="Nom d'utilisateur" />
            </div>
            <div class="field pass">
                <label for="password">Mot de passe : </label>
                <input  v-model="password" type="password" id="password" name="Password" placeholder="Mot de passe" />
            </div>
            <div class="errorDiv">
                <p v-if="showError.print" id="error">{{this.showError.msg}}</p>
            </div>
            <div class="field btnDiv">
                <button class="btn" role="button">Connexion</button>
            </div>
        </form>
    </div>
</template>

<script>
import axios from 'axios'
import API from "@/Utils/API.js"

export default {
  name: 'LoginPanel',
  data(){
    return {
        username: "",
        password: "",
        showError: { print : false, msg: ""},
    };
  },
  methods: {
    async login(e){
        e.preventDefault();
        axios.post(API.URL + API.LOGIN, {username: this.username, password: this.password})
        .then(response => {
            if(response.status === 201)
            {
                sessionStorage.setItem('isLogged', true);
                sessionStorage.setItem('token', response.data.access_token);
                this.$router.push('/home');
            }
        })
        .catch(error => {
            this.showError.print = true;
            if(error.response.status === 401)
                this.showError.msg = "Identifiant ou mot de passe incorrect";
            else if(error.response.status === 404)
                this.showError.msg = "Erreur serveur introuvable";
            else
                this.showError.msg = "Erreur inconnue : " + error.status;
            sessionStorage.setItem('isLogged', false);
            sessionStorage.setItem('token', null)
        });
    },
  },
}
</script>

<style>
h1
{
    color: rgb(222, 222, 222);
    font-size: 4em;
    font-family: Verdana;
    text-align: center;
    margin: 0;
    margin-bottom: 5%;
}
label
{
    font-size: 1.5em;
    font-family: 'Signika Negative', sans-serif;
    color: rgb(255, 255, 255);
}
.container
{
    opacity: 0.98;
    width: 40%;
    height: fit-content;
    margin: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #1d1e26;
    border-radius: 50px;
    box-shadow: 0px 0px 20px rgba(29, 30, 38, 1);
    padding: 2rem;
}
form > div
{
    justify-content: center;
    align-items: center;
    width: 100%;
    display: flex;
    flex-direction: column;
}
form
{
    width: 60%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.field
{
    width: 70%;
    margin: 1rem 0;
}
.field > label
{
    margin: 2%;
}
input[type="text"], input[type="password"]
{   
    border: none;
    padding: 20px;
    font-size: 1.1em;
    border-radius: 0%;
    background-color: rgba(57, 63, 84, 0.8);
    color: #BFD2FF;
    margin-top: 1%;
    width: 100%;
    height: 30px;
    border: 0;
    border-bottom: 10px solid;
    border-image-slice: 1;
    border-width: 5px;
    border-image-source: linear-gradient(to left, #743ad5, #d53a9d);
    transition: all 0.2s ease-in-out;
}
input[type="text"]:focus, input[type="password"]:focus
{
    background-color: rgba(45, 47, 57, 0.8);
    outline: none;
}

.btn {
    opacity: 0.8;
  background-image: linear-gradient(92.88deg, #455EB5 9.16%, #5643CC 43.89%, #673FD7 64.72%);
  border-radius: 8px;
  border-style: none;
  box-sizing: border-box;
  color: #FFFFFF;
  cursor: pointer;
  flex-shrink: 0;
  font-family: "Inter UI","SF Pro Display",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,"Open Sans","Helvetica Neue",sans-serif;
  font-size: 1.3em;
  font-weight: 100;
  height: 3rem;
  width: 9rem;
  padding: 0 1.6rem;
  text-align: center;
  text-shadow: rgba(0, 0, 0, 0.25) 0 3px 8px;
  transition: all .2s;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.btn:hover
{
    opacity: 1;
}

#background-wrap {
    bottom: 0;
	left: 0;
	padding-top: 50px;
	position: fixed;
	right: 0;
	top: 0;
	z-index: -1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.errorDiv{
    width: 80%;
    padding: none;
}
#error{
    font-family: 'Signika Negative';
    font-size: 20px;
    color: rgba(150, 0, 0, 1);
}
@media screen and (min-width: 360px) and (max-width: 700px)
{
    h1
    {
        font-size: 40px;
    }
    .container
    {
        width: 90%;
        padding: 0;
    }
    label
    {
        font-size: large;
        width: 100%;
    }
    input[type="text"], input[type="password"]
    {
        width: 100%;
    }
    form
    {
        width: 80%;
    }
}
</style>