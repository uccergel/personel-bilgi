import { createRouter, createWebHistory }  from "vue-router"
import PersonList from "../views/PersonList.vue"
import CreateEmployee from "../views/CreateEmployee.vue"

const routes = [
    {
        path: "/person-list",
        name: "PersonListPage",
        component: PersonList
    },
    {
        path: "/create-employee",
        name: "CreateEmployeePage",
        component: CreateEmployee
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router