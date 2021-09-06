<template>
    <main class="container mt-5 pb-3">
        <div class="p-3 mt-3">
            <h4 class="text-center">
            Déjà enregistré ? <router-link class="redirection-signup" to="/">Login</router-link>
            </h4>
        </div>
        <section class="text-center col-12 mt-3 mx-auto px-5 pb-3 mb-5 rounded">
            <form  class="m-auto" >
                <h3 class="mb-4 text-center font-weight-bold title-gm">Signup</h3>
                <div class="group mx-auto">
                    <input @keydown="invalid = false" v-model="inputName" type="text" class="form-control-gm" id="inputName" placeholder="" required>
                    <span class="bar"></span>
                    <label for="inputName" class="control-label">Nom </label>
                </div>      
                <div class="group mx-auto">
                    <input @keydown="invalid = false" v-model="inputEmail" type="email" class="form-control-gm" id="inputEmail" placeholder="" required>
                    <span class="bar"></span>
                    <label for="inputEmail" class="control-label">Email </label>                 
                 </div>
                <div class="group mx-auto">
                    <input @keydown="invalid = false" v-model="inputPassword" type="password" class="form-control-gm" id="inputPassword" placeholder="" required>
                    <span class="bar"></span>
                    <label for="inputPassword" class="control-label">Password </label>
                </div>
                <button @click="checkForm" type="button" class="btn btn-primary p-2 shadow font-weight-bold">  S I G N U P  </button>                          
            </form>
        </section>    
    </main>
</template>

<script>
import axios from "axios";
import router from "../router";

export default {
    name: "Signup",
    data() {
        return {
            inputName: "",
            inputEmail: "",
            inputPassword: "",
            invalid: false
        }
    },
    methods: {
        checkForm() {
            if ( !this.inputName || !this.inputEmail || !this.inputPassword ) {
                alert('Veuillez remplir tout le formulaire.');
                return 
            }
            const nameRegex = /(.*[a-z]){3,40}/;
            const mailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
            const pwdRegex  = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,64}$/;
            if ( nameRegex.test(this.inputName) && mailRegex.test(this.inputEmail) && pwdRegex.test(this.inputPassword)) {
                axios.post("http://localhost:3000/api/user/signup", { 
                    name     : this.inputName, 
                    email    : this.inputEmail,
                    password : this.inputPassword,
                })
                .then(() => {
                    console.log('Signup OK !');
                    router.push({ path : '/'});
                })
                .catch((error)=>{
                    console.log(error);
                    alert("Erreur: Un autre usager est déjà enregistré avec ce mail.")                   
                    });
            } else {
                alert(`
                Erreur: Vérifiez le format des données saisies. \n
                Le mot de passe doit avoir :
                - au moins 1 Majuscule
                - au moins 1 minuscule
                - au moins 1 chiffre
                - minimum 8 caractéres
                `)
                this.invalid = true;
            }
        }
    }
}    
</script>