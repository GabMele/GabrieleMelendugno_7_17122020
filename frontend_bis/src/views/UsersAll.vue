<template>
    <main class="post-wrapper pb-5">   

        <UserBadge :name="name" :admin="admin" :status="status" />

        <div v-if="status == 1">
                
            <div class="title-box-gm mt-3 text-center">
                <h3><strong>Liste de tous les usagers </strong></h3>
                <hr class="hr bg-red-gm mt-1 mb-5">
            </div>

            <div class="post-wrapper">

                <div v-if="!hasUsers" class="m-3">
                    <h2 class="text-center">Aucun usager à afficher.</h2>
                </div> 

                <div v-else class="m-3">
                    
                    <div v-for="user in users" :key="user">
                        
                        <div v-for="(value, item) in user" :key="item">

                            <template v-if="( user[item].status == 1 || admin == 1)">

                                <div class="card bg-light px-3 py-2 m-3">

                                    <div class="card-header d-flex">

                                        <div v-if="user[item].admin == 0 ">
                                            <i class="far fas fa fa-user-circle fa-2x"></i>
                                        </div>
                                        <div v-else>
                                            <i class="far fas fa fa-users fa-2x" style="color:green"></i>
                                        </div> 
                                        &nbsp;&nbsp;<strong>{{ user[item].name }}</strong>
                                    </div>

                                    <div class="card-body post-box d-flex">
                                        Nom : {{ user[item].name }}<br/>
                                        Email : {{ user[item].email }}<br/>
                                        Membre depuis : {{ user[item].createdAt.slice(0,10).split('-').reverse().join('.') }}<br/>
                                    </div>

                                    <div class="box-image-and-buttons">
                                        <div class="post-buttons d-flex p-2 justify-content-end">
        
                                            <div v-if="user[item].admin == 0 ">
                                                <button @click="updateAdmin(user[item].id,1)" class="m-2 btn-success btn-comment">Rendre Admin </button>
                                            </div>
                                            <div v-else>
                                                <button @click="updateAdmin(user[item].id,0)" class="m-2 btn-dark btn-comment">Rendre User </button>
                                            </div>  
        
                                            <div v-if="user[item].status == 0 ">
                                                <button @click="updateStatus(user[item].id,1)" class="m-2 btn-primary btn-comment">Activer </button>
                                            </div>
                                            <div v-else>
                                                <button @click="updateStatus(user[item].id,0)" class="m-2 btn-warning btn-comment">Suspendre </button>
                                            </div>  

                                            <button @click="deleteUser(user[item].id)" class="m-2 btn-danger btn-comment">Effacer </button>                                
                                        </div>
                                    </div>
                                </div>
                            </template>           
                        </div>
                    </div>
                            
                </div>
            </div>
        </div>
               
    </main>
</template>

<script>
import axios from "axios";
import VueJwtDecode from "vue-jwt-decode";
import UserBadge from "../components/UserBadge"

export default {

    name: "UsersAll",
    data() {
        return {
            name: "", 
            isOk: false,
            users: [],
            userId: "",                          
            status: 0,
            admin: 0,
            createdAt: "",
            hasUsers: false
        }
    },

    components: { 
        UserBadge
    },

    mounted() {

        let token = localStorage.getItem("token");
        try {
            let decoded = VueJwtDecode.decode(token);
            this.userId = decoded.userId;
            this.name = decoded.name;
            this.admin = decoded.admin;
            this.status = decoded.status;
        } catch (error) {
            console.log(error, 'error from decoding token')
        }
        
        axios.get("http://localhost:3000/api/user/getall",  { headers: {"Authorization": "Bearer " + localStorage.getItem("token")} })
              
       .then((res) => {
            console.log(res);
            if (res) {
                this.users = res.data;
                this.hasUsers = true;

            } else {
                alert("Aucun usager trouvé !");
            }
        })
        .catch((error)=>{
            console.log(error)
        })  
    },

    methods: {

        deleteUser(userId) {
            let confirmDeleteUser = confirm("Voulez-vous supprimer ce user définitivement ?");
            if (confirmDeleteUser == true) {
                axios.delete("http://localhost:3000/api/user/delete/" + userId, {
                    headers: { 
                        "Authorization": "Bearer " + localStorage.getItem("token") 
                    }
                    })
                .then((res) => { 
                    console.log(res);
                    this.$router.go(this.$router.currentRoute) })
                .catch((error) => { 
                    console.log(error);
                    this.$router.go(this.$router.currentRoute)
            })} else {
                return
            }
        },

        updateAdmin(userId,admin) {
            axios.get("http://localhost:3000/api/user/updateadmin?userId=" + userId + "&admin=" + admin, {
                headers: { "Authorization": "Bearer " + localStorage.getItem("token") }
                })
            .then((res) => {
                this.$router.go(this.$router.currentRoute);
                console.log(res)})
            .catch((error) => { 
                console.log(error);
                this.$router.go(this.$router.currentRoute)
            })
        },

        updateStatus(userId,status) {
            axios.get("http://localhost:3000/api/user/updatestatus?userId=" + userId + "&status=" + status, {
                headers: { "Authorization": "Bearer " + localStorage.getItem("token") }
                })
            .then((res) => {
                this.$router.go(this.$router.currentRoute);
                console.log(res)})
            .catch((error) => { 
                console.log(error);
                this.$router.go(this.$router.currentRoute)
            })
        },
    },
}

</script>