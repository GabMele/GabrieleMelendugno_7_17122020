<template>
    <main class="container">  

        <section class="row justify-content-center">

            <div class="card text-center m-5">
                <div class="card-body">
                    <h5 class="card-title mb-0" >Bonjour 
                        <span class="bonjour-text-bold"> {{ name }}</span>
                        <div class="d-flex mt-2 justify-content-center">
                            <button v-if="admin == 1" @click="$router.push('MainWall')" class="button-gm mx-2 pt-2">Retourner aux posts</button>
                            <button @click="logout" class="button-gm mx-2 pt-2">LOGOUT</button>
                        </div>
                    </h5>
                </div>
            </div>

        </section>

        <div class="title-box-gm text-center mt-0 mb-5">
            <h3><strong>Commenter le post</strong></h3>
            <hr class="hr bg-red-gm">
        </div>  

        <section class="card col-12 col-md-8 bg-light mb-3">
            <div class="card bg-light p-4">
                <div class="card-header">
                    <i class="far fas fa fa-user-circle fa-2x"></i>
                    <strong>&nbsp;&nbsp;POST</strong> publié par <strong>{{ postName }}</strong>
                    le {{ postCreatedAt }} 
                </div>

                <div v-if="postImageUrl !== 'null' " class="d-flex">
                    <img :src="postImageUrl" class="post-image" alt="image associée au post" />
                </div>

                <div class="card-body post-box d-flex mt-3">
                    {{ postContent }}
                </div>
                <div class="box-image-and-buttons">
                    <div class="post-buttons d-flex p-2 justify-content-end">
                        <div v-if="postStatus == 0 && admin == 1">
                            <button @click="validatePost(postId)" class="m-2 btn-warning btn-comment">Valider post</button>
                        </div>
                        <div v-if="admin == 1 || postUserId == userId">
                            <button @click="deletePost(postId)" class="m-2 btn-danger btn-comment">Effacer post </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>

<!-- -------------------------------------------------------------------- -->

        <div class="comment-wrapper pb-5">
            
            <div v-if="!hasComments" class="m-3 pb-5">
                <h3>Aucun commentaire.</h3>
            </div> 

            <div v-else class="m-3">
                <h3 class="ml-4">Commentaires</h3>
                <div v-for="comment in comments" :key="comment" class="pb-5">
                    
                    <div v-for="(value, item) in comment" :key="item">

                        <template v-if="( comment[item].status == 1 || admin == 1)">

                            <div class="card bg-light px-4 py-2 m-3">

                                <div class="card-header">
                                    <i class="far fas fa fa-user-circle fa-2x"></i>
                                    &nbsp;&nbsp;Commentaire de <strong>{{ comment[item].User.name }}</strong>
                                    le {{ comment[item].createdAt.slice(0,10).split('-').reverse().join('.') }} 
                                </div>

                                <div class="card-body comment-box d-flex py-2 px-3">
                                    {{ comment[item].comment }}
                                </div>

                                <div class="box-image-and-buttons">
                                    <div class="comment-buttons d-flex p-2 justify-content-end">

                                        <div v-if="comment[item].status == 0 && admin == 1">
                                            <button @click="validateComment(comment[item].id)" class="m-2 btn-warning btn-comment">Valider </button>
                                        </div>

                                        <div v-if="admin == 1 || comment[item].userId == userId">
                                            <button @click="deleteComment(comment[item].id)" class="m-2 btn-danger btn-comment">Effacer </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </template>           
                    </div>
                </div>                     
            </div>

<!-- CREATE COMMENT ----------------------------------------------- -->

       <section class="row card bg-light m-2 p-3">

            <div v-if="postStatus == 0" class="m-3 pb-5">
                <h3>Vous ne pouvez pas ajouter votre commentaire tant le post ne soit pas validé par un administrateur.</h3>
            </div> 

            <div v-else class="m-3">

                <form enctype="multipart/form-data">
                    <div class="header p-1">
                        <h4>
                        Ton commentaire, <strong>{{ name }}</strong> ?
                        </h4>
                    </div>
                    <div class="row">
                        <div class="w-100 mx-4 justify-content-center form-group">
                            <textarea @keydown="isOk = false" class="text-area-gm" rows="2" v-model="commentContent" id="commentContent" name="commentContent" placeholder="Ici votre commentaire"></textarea>
                        </div>
                
                    </div>
                    <div class="mx-auto align-content-center">
                        <div><button type="submit" @click.prevent="send()" class="button-gm m-2 p-2">Envoyer</button></div>
                        <!--<router-link to="/MainWall"> <div> <a class="btn btn-block m-2 p-2">Retour</a></div></router-link>-->
                    </div>
                </form>
            </div>
        </section>

        </div>
    </main>
</template>

<script>
import axios from "axios";
import router from "../router";
import VueJwtDecode from "vue-jwt-decode";
import ls from 'localstorage-slim';

export default {
    name: "Comment",

    data() {
        return {
            admin: false,
            comments: [],
            createdAt: "",
            commentName: "",
            commentUserId: "",
            commentPostId: "",
            commentContent: "",
            commentId: "",
            name: "",
            currentUserId: "",
            createdAtUser: "",
            hasComments: false 
        }
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

        ls.config.encrypt = true;           
        this.postId         = ls.get('postId', { decrypt: true });
        this.postUserId     = ls.get('postUserId', { decrypt: true });
        this.postName       = ls.get('postName', { decrypt: true });
        this.postContent    = ls.get('postContent', { decrypt: true });  
        this.postImageUrl   = ls.get('postImageUrl', { decrypt: true });
        this.postStatus     = ls.get('postStatus', { decrypt: true });
        this.postCreatedAt  = ls.get('postCreatedAt', { decrypt: true });

        axios.get("http://localhost:3000/api/comment/getallbypost/" + this.postId,
            { headers: {"Authorization": "Bearer " + localStorage.getItem('token') } })
            .then((res) => {
                    console.log(res);
                    if (res) {
                        this.comments = res.data;
                        if (res.data.comments.length > 0) {
                        this.hasComments = true; 
                        }
                    } else {
                        //this.hasComments = false;
                        alert("Aucun commentaire trouvé !");
                    }
                })
                .catch((error)=>{
                    console.log(error)
                })   
            },

    methods: {
        localClear() {
            localStorage.clear();
            router.push({ path : "/" });
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
                    router.push({ path : "/MainWall" }) })
                .catch((error) => { 
                    console.log(error);
                    router.push({ path : "/MainWall" })
            })} else {
                return
            }
        },

        validatePost(postId) {
            axios.put("http://localhost:3000/api/post/validate/" + postId, {
                headers: { "Authorization": "Bearer " + localStorage.getItem("token") }
                })
            .then((res) => {
                router.push({ path : "/MainWall" });
                console.log(res)})
            .catch((error) => { 
                console.log(error);
                router.push({ path : "/MainWall" })
            })
        },

        logout() {
            localStorage.clear();
            router.push({ path : "/" });
        },

        deleteComment(commentId) {
            let confirmCommentDeletion = confirm("Voulez-vous suppimer votre commentaire définitement ?");
            if (confirmCommentDeletion == true) {
                axios.delete("http://localhost:3000/api/comment/delete/" + commentId, {
                headers: { 
                        "Authorization": "Bearer " + localStorage.getItem('token') 
                    }
                })
                .then((res)=> {
                    console.log(res);
                    location.reload();
                })
                .catch((error) => { 
                    console.log(error)
                })
            } else {
                return 
            }
        },

        validateComment(commentId) {
            axios.put("http://localhost:3000/api/comment/validate/" + commentId, {
                headers: { "Authorization": "Bearer " + localStorage.getItem("token") }
                })
            .then((res) => {
                router.push({ path : "/MainWall" });
                console.log(res)})
            .catch((error) => { 
                console.log(error);
                router.push({ path : "/MainWall" })
            })
        },

        send() {
            if ( !this.commentContent ) {
                this.isOk = true;
                alert("Commentaire vide, écrivez-le. ")
            } else {

                var postData = {
                userId: this.userId,
                postId: this.postId,
                comment: this.commentContent.toString()                
                };

                console.log(postData);
                console.table(postData);

                axios.post("http://localhost:3000/api/comment/create", postData, { headers: { "Authorization":"Bearer " + localStorage.getItem("token")}})

                .then(()=> {
                    this.userId = ""
                    this.postId = ""
                    this.commentContent = ""
                    this.$router.go(this.$router.currentRoute)
                })
                .catch((error)=>{
                    console.log(error);
                })
            }
        },
    }
}
</script>
