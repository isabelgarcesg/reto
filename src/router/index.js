//Paulina estuvo acá
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CrearUsuario from '../components/CrearUsuario.vue'
import ListarEntidad from '../components/ListarEntidad.vue'
import ListarUsuario from '../components/ListarUsuario.vue'
import EditarView from '../components/EditarView.vue'
import operationsView from '../components/operationsView.vue'
import CrearEntidad from '../components/CrearEntidad.vue'

const routes = [
{
    path: '/',
    name: 'home',
  component: HomeView
},
  {
    path: '/crear',
    name: 'crear',
    component: CrearUsuario
  },
  {
    path: '/ListarEntidad',
    name: 'ListarEntidad',
    component: ListarEntidad
  },
  {
    path: '/ListarUsuario',
    name: 'ListarUsuario',
    component: ListarUsuario
  },
  {
    path: '/editar/:id',
    name: 'editar',
    component: EditarView
  },
  {
    path: '/operations',
    name: 'operations',
    component: operationsView
  },
  {
    path: '/CrearEntidad',
    name: 'CrearEntidad',
    component: CrearEntidad
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
