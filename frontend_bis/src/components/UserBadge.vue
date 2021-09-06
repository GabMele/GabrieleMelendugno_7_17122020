<template>

        <section class="row justify-content-center">
            <div class="card text-center m-5">
                <div class="card-body">
                    <h5 class="card-title mb-3" >Bonjour 
                        <span class="bonjour-text-bold mb-3"> {{ name }}</span>
                    </h5>

                    <div class="d-flex-inline mt-2 justify-content-center">
                        <div v-if="status == 1">
                            <button @click="$router.push('MainWall')" class="button-gm m-1">Posts</button>
                            <div v-if="admin == 1">
                                <button @click="$router.push('UsersAll')" class="button-gm m-1">Usagers</button>
                            </div>
                        </div>
                        <button @click="deleteUser" class="button-gm-red button-gm m-1">EFFACER PROFIL</button>
                        <button @click="logout" class="button-gm m-1">LOGOUT</button>
                    </div>
                
                </div>
            </div>

            <div v-if="status == 0" class="m-2 pb-5">
                <h3 class="text-center">Votre profil n'est pas validé ou est suspendu. Contactez un administrateur</h3>
            </div>
        </section>

</template>
<script>

import axios from "axios";
import router from "../router";

export default {

  name: 'UserBadge',

  props: { 
      name:   { type:String },      
      admin:  { type:Number },
      status: { type:Number },
      userId: { type:Number }
  },

  methods: {
        deleteUser() {
            console.table("thisssssssssss")
            console.table(this)
            console.table(this.userId)
            alert("check this")
            let confirmDeletePost = confirm("Voulez-vous supprimer votre profil définitivement ?");
            if (confirmDeletePost == true) {
                axios.delete("http://localhost:3000/api/user/delete/" + this.userId, {
                    headers: { 
                        "Authorization": "Bearer " + localStorage.getItem("token") 
                    }
                    })
                .then((res) => { 
                    console.log(res);
                    router.push({ path : '/'})})
                .catch((error) => { 
                    console.log(error);
                    //location.reload()
                    //vm.$forceUpdate();
                    router.push({ path : '/'})
            })} else {
                return
            }
        },
        
        logout() {
            localStorage.clear();
            router.push({ path : "/" });
        }
    }
}
</script>