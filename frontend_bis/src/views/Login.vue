<template>
    <main class="container mt-5 pb-2">
        <div class="p-3 mt-5 pb-4">
            <h4 class="text-center">
                Pas de compte ? <router-link to="/signup">Enregistrez-vous !</router-link>
            </h4>
        </div>
        <section class="text-center col-12 col-md-8 px-5 pb-5 mb-5 mx-auto pt-1 rounded">  
            <form class="m-auto">
                <h3 class="mb-4 text-center font-weight-bold title-gm">Login</h3>
                <div class="group mx-auto">          
                    <input @keydown="isInvalid = false" v-model="inputEmail" type="email" class="form-control-gm" id="inputEmail" placeholder="" required>    
                    <span class="bar"></span>
                    <label for="inputEmail">Email</label>              
                </div>
                <div class="group mx-auto">
                    <input @keydown="isInvalid = false" v-model="inputPassword" type="password" class="form-control-gm" id="inputPassword" placeholder="" required>
                    <span class="bar"></span>
                    <label for="inputPassword">Password</label>
                 </div>
                <button @click="checkInputData" type="button" class="btn btn-primary mt-1 mb-5 shadow font-weight-bold">  L O G I N  </button>
            </form>
        </section>
    </main>
</template>

<script>
import axios from "axios";
import router from "../router";

export default {
    name: "Login",
    data() {
        return {
            inputEmail: "",
            inputPassword: "",
            isInvalid: false
        }
    },
    methods: {
        checkInputData() {
            if ( !this.inputEmail || !this.inputPassword ) {
                    alert("Données saisies incompletes ou non valides !")
                    return this.isInvalid = true;
                }
            
            console.log("Data input OK go axios!")
            axios.post("http://localhost:3000/api/user/login", { 
                email :   this.inputEmail,
                password: this.inputPassword
             })
            .then((res) => {
                console.log("RES ===== >");
                console.log(res);
                console.log('res.data.token :');
                console.log(res.data.token);
                
                localStorage.setItem("token", res.data.token)
                /*
                localStorage.setItem("userId",  res.data.userId)
                localStorage.setItem("name",    res.data.name)
                localStorage.setItem("admin",   res.data.admin)
                localStorage.setItem("status",  res.data.status)
                
                */
                router.push({ path : 'MainWall'});
            })
            .catch((error) => {
                this.isInvalid = true;
                console.log(error);
                alert('Compte non existant ou password non correcte !')
            })         
        }
    }
}    
</script>