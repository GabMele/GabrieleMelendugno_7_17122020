import { createRouter, createWebHistory } from "vue-router"

//import VueRouter from "vue-router"
//import Vue from "vue"
//Vue.use(VueRouter)

const routes = [
    {
      path: "/",
      name: "Login",
      component: () => import("../views/Login"),
    },
    {
      path: "/signup",
      name: "Signup",
      component: () => import("../views/Signup")
    },
    {
      path: "/mainwall",
      name: "MainWall",
      component: () => import("../views/MainWall")
    },
    {
        path: "/comment",
        name: "Comment",
        component: () => import("../views/Comment"),
    },
    {
        path: "/usersall",
        name: "UsersAll",
        component: () => import("../views/UsersAll")
    }
    
]

/*
const router = new VueRouter ({
    mode: 'history',
    routes
})
*/

const router = createRouter({ history: createWebHistory('/'), routes})


router.beforeEach((to, from, next) => {
    const publicPages = ["/", "/signup"]
    console.log("to.path ======> ")
    console.log(to.path)
    const authRequired = !publicPages.includes(to.path)
    const loggedIn = localStorage.getItem("userId")
    const loggedToken = localStorage.getItem("token")
    if (authRequired && !loggedIn && !loggedToken) {
        return next("/")
    }
    next()
})

export default router