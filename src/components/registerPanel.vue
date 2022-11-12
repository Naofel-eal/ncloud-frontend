<template>
    <div class="registerPanel">
        <h1>N-CLOUD</h1>
        <form @submit.prevent="register()">

            <div class="doubleField">
                <div class="semifield firstname">
                    <label for="firstname">Firstname : </label>
                    <input required v-model="firstname" type="text" id="firstname" name="firstname" placeholder="Firstname"/>
                </div>
                <div class="semifield name">
                    <label for="name">Name : </label>
                    <input required v-model="name" type="text" id="name" name="name" placeholder="Name"/>
                </div>
            </div>
 
            <div class="field user">
                <label for="username">Nom d'utilisateur : </label>
                <input required v-model="username" type="text" id="username" name="Username" placeholder="Nom d'utilisateur" @blur="checkAvailableUsername()" />
            </div>

            <div class="field mail">
                <label for="mail">E-mail : </label>
                <input required v-model="mail" type="text" id="mail" name="mail" placeholder="E-mail" @blur="checkValidEMail()" />
            </div>

            <div class="field pass">
                <label for="password">Mot de passe : </label>
                <input required v-model="password" type="password" id="password" name="Password" placeholder="Mot de passe" @blur="checkValidPassword()"/>
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
import API from '@/Utils/API.js';
import axios from 'axios'
export default {
    name: 'RegisterPanel',
    data() {
        return {
            username: "",
            password: "",
            firstname: "",
            mail: "",
            name: "",
            showError: { print : false, msg: ""},
        };
    },
    methods : {
        async checkAvailableUsername() {
            if(this.username.length < 3)
            {
                this.showError.print = true;
                this.showError.msg = 'Please enter a longer username';
                return false;
            }
            else {
                const response = await axios.post(API.URL + API.REGISTER_USERNAME, {username : this.username})
                if(response.data === true)
                {
                    this.showError.print = false;
                    this.showError.msg = '';
                    return true;
                }
                else
                {
                    this.showError.print = true;
                    this.showError.msg = 'Username not available';
                    return false;
                }
            }
        },
        checkValidPassword() {
            if(this.password.length > 8) {
                if((/[A-Z]/.test(this.password))) {
                    if(/\d/.test(this.password)) {
                        this.showError.print = true;
                        this.showError.msg = '';
                        return true;
                    }
                    else {
                        this.showError.print = true;
                        this.showError.msg = 'Your password must contain numbers';
                        return false;
                    }
                }
                else {
                    this.showError.print = true;
                    this.showError.msg = 'Your password must contain capital letters';
                    return false;
                }
            }
            else {
                this.showError.print = true;
                this.showError.msg = 'Your password must contain at least 8 characters';
                return false;
            }
        },
        async checkValidEMail() { 
            const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (regex.test(this.mail)) {
                this.showError.print = false;
                this.showError.msg = '';
                const response = await axios.post(API.URL + API.REGISTER_EMAIL, {mail : this.mail})
                if(response.data === true)
                {
                    this.showError.print = false;
                    this.showError.msg = '';
                    return true;
                }
                else
                {
                    this.showError.print = true;
                    this.showError.msg = 'E-Mail not available. Please connect to your account';
                    return false;
                }
            } 
            else {
                this.showError.print = true;
                this.showError.msg = 'Please enter a valid E-Mail address';
                return false;
            }
        },
        async register() {
            if(await this.checkAvailableUsername()) {
                if(await this.checkValidEMail()) {
                    if(this.checkValidPassword()) {
                        const response = await axios.post(API.URL + API.REGISTER, {name:this.name, firstname:this.firstname, username:this.username, mail:this.mail, password:this.password})
                        if(response.status == 201)
                        {
                            this.$router.push('/');
                        }
                    } 
                    else {
                        this.showError.print = true;
                        this.showError.msg = "Password must contain capital letter and number";
                    }
                }
                else {
                    this.showError.print = true;
                    this.showError.msg = "Verify your email";
                }
            }
            else {
                this.showError.print = true;
                this.showError.msg = "Username not available";
            }
        },
    },
}
</script>

<style>
.registerPanel
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
.registerPanel h1
{
    color: rgb(222, 222, 222);
    font-size: 3rem;
    font-family: Verdana;
    text-align: center;
    margin: 0;
    margin-bottom: 1rem;
}

.registerPanel label
{
    font-size: 1.5em;
    font-family: 'Signika Negative', sans-serif;
    color: rgb(255, 255, 255);
}
.registerPanel form > .field
{
    justify-content: center;
    align-items: center;
    width: 100%;
    display: flex;
    flex-direction: column;
}
.registerPanel form
{
    height: fit-content;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.registerPanel .field
{
    width: 80%;
    margin: 1rem 0;
}
.registerPanel input
{   
    border: none;
    padding: 20px;
    font-size: 1.1em;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    background-color: rgba(57, 63, 84, 0.8);
    color: #BFD2FF;
    width: 100%;
    height: 30px;
    border: 0;
    border-bottom: 10px solid;
    border-image-slice: 1;
    border-width: 5px;
    border-image-source: linear-gradient(to left, #743ad5, #d53a9d);
    transition: all 0.2s ease-in-out;
}
.registerPanel input[type="text"]:focus, input[type="password"]:focus
{
    background-color: rgba(45, 47, 57, 0.8);
    outline: none;
}

.registerPanel .btn {
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

.registerPanel .btn:hover
{
    opacity: 1;
}
.registerPanel .errorDiv{
    width: 80%;
    padding: none;
}
.registerPanel #error{
    font-family: 'Signika Negative';
    font-size: 20px;
    color: rgba(150, 0, 0, 1);
}
.doubleField {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}
.doubleField div {
    max-width: 45%;
}
@media screen and (min-width: 360px) and (max-width: 700px)
{
    .registerPanel h1
    {
        font-size: 40px;
    }
    .registerPanel
    {
        width: 90%;
        padding: 0;
    }
    .registerPanel label
    {
        font-size: large;
        width: 100%;
    }
    .registerPanel input[type="text"], input[type="password"]
    {
        width: 100%;
    }
    .registerPanel form
    {
        width: 80%;
    }
}
</style>