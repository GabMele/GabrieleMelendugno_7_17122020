<template>
    <main class="post-wrapper pb-5">    

        <User-badge :name="name" :admin="admin" :status="status" :userId="userId"/>

        <div v-if="status == 1">

            <div class="title-box-gm text-center mt-3">
                <h3><strong>Tous les posts</strong></h3>
                <hr class="hr bg-red-gm">
            </div>     
                
            <!---------- Create post -------------------------->

            <section class="row card bg-light m-5 p-3">
                <form enctype="multipart/form-data">
                    <div class="header p-1">
                        <h4>
                        Quoi de neuf, <strong>{{ name }} </strong>?
                        </h4>
                    </div>
                    <div class="row">
                        <div class="col-12 justify-content-center form-group">
                            <textarea @keydown="isOk = false" class="text-area-gm" rows="4" v-model="postContent" id="postContent" name="postContent" placeholder="Ici votre post"></textarea>
                        </div>

                        <input v-model="imageUrl" type="text" class="form-control-gm mb-3 mx-3 py-2 inputUrl" id="imageUrl" placeholder="Lien d'une image, http://...">    
                            
                    </div>
                    <div class="mx-auto align-content-center">
                        <div><button type="submit" @click.prevent="send()" class="button-gm m-2 p-2">Envoyer</button></div>
                        <!--<router-link to="/MainWall"> <div> <a class="btn btn-block m-2 p-2">Retour</a></div></router-link>-->
                    </div>
                </form>
            </section>

            <!---------- Show posts -------------------------->

            <div class="post-wrapper">
                hasposts : {{ hasPosts }}
                <div v-if="!hasPosts" class="m-3">
                    <h2>Aucun post à afficher.</h2>
                </div> 

                <div v-else class="m-3">
                    
                    <div v-for="post in posts" :key="post">
                        
                        <div v-for="(value, item) in post" :key="item">

                            <template v-if="( post[item].status == 1 || admin == 1 || post[item].UserId == userId )">
                                <div class="card bg-light px-3 py-2 m-3">

                                    <div class="card-header">
                                        <i class="far fas fa fa-user-circle fa-2x"></i>
                                        Publié par <strong>{{ post[item].User.name }}</strong>
                                        le {{ post[item].createdAt.slice(0,10).split('-').reverse().join('.') }} 
                                    </div>
                                        
                                    <div v-if="post[item].imageUrl !== '' && post[item].imageUrl !== null " class="d-flex">
                                        <img :src="post[item].imageUrl" class="post-image" alt="image associée au post" />
                                    </div>
                                
                                    <div class="card-body post-box d-flex mt-3">
                                        {{ post[item].post }}
                                    </div>

                                    <div class="box-image-and-buttons">
                                        <div class="post-buttons d-flex p-2 justify-content-end">

                                            <div v-if="post[item].status == 1 ">
                                                <button @click="commentPage(
                                                    post[item].id,
                                                    post[item].User.name,
                                                    post[item].User.id,
                                                    post[item].post,
                                                    post[item].status,
                                                    post[item].imageUrl,
                                                    post[item].createdAt.slice(0,10).split('-').reverse().join('.')
                                                )
                                                " class="m-2 btn-info btn-comment">Comment </button>
                                            </div> 

                                            <div v-if="post[item].status == 0 && admin == 1">
                                                <button @click="validatePost(post[item].id)" class="m-2 btn-warning btn-comment">Valider </button>
                                            </div>

                                            <div v-if="admin == 1 || post[item].UserId == userId">
                                                <button @click="deletePost(post[item].id)" class="m-2 btn-danger btn-comment">Effacer </button>
                                            </div>
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
import router from "../router";
import VueJwtDecode from "vue-jwt-decode";
import ls from 'localstorage-slim';
import UserBadge from "../components/UserBadge"

export default {

    name: "MainWall",
    data() {
        return {
            name: "", 
            postContent: "",
            imageUrl: "",
            file: null,
            isOk: false,
            posts: [],
            userId: "",                          
            status: 0,
            admin: 0,
            createdAt: "",
            hasPosts: false            
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
        
        axios.get("http://localhost:3000/api/post/getall",  { headers: {"Authorization": "Bearer " + localStorage.getItem("token")} })
              
       .then((res) => {
            console.log(res);
            if (res) {
                const postList = res.data;
                this.posts = postList;
                console.log("POST LIST =========")
                console.table(postList);
                this.hasPosts = true;
            } else {
                alert("Aucun post trouvé !");
            }
        })
        .catch((error)=>{
            console.log(error)
        })   
    },

methods: {
        send() {
             if ( !this.postContent ) {
                this.isOk = true;
                alert("Post vide, écrivez votre post. ")
            } else {
                const formData = new FormData()
                formData.append("userId", this.userId)
                formData.append("imageUrl", this.imageUrl)
                formData.append("post", this.postContent)

                axios.post("http://localhost:3000/api/post/create", formData, { headers: { "Authorization":"Bearer " + localStorage.getItem("token")}})
                .then(()=> {
                    this.userId = ""
                    this.postContent = ""
                    this.imageUrl = ""
                    this.$router.go(this.$router.currentRoute)
                })
                .catch((error)=>{
                    console.log(error);
                })
            }
        },

        commentPage(postId,postName,postUserId,postContent,postStatus,postImageUrl,postCreatedAt) {
            ls.config.encrypt = true;
            ls.set('postId', postId);
            ls.set('postName', postName);
            ls.set('postUserId', postUserId);
            ls.set('postContent', postContent);
            ls.set('postStatus', postStatus);
            ls.set('postImageUrl', postImageUrl);
            ls.set('postCreatedAt', postCreatedAt);

            router.push({ path : "/Comment" });
        },

        deletePost(postId) {
            let confirmDeletePost = confirm("Voulez-vous supprimer ce post définitivement ?");
            if (confirmDeletePost == true) {
                axios.delete("http://localhost:3000/api/post/delete/" + postId, {
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

        validatePost(postId) {
            axios.put("http://localhost:3000/api/post/validate/" + postId, {
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

        logout() {
            localStorage.clear();
            router.push({ path : "/" });
        }
    },
}

</script>