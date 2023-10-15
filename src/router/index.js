//Paulina estuvo acá
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CrearUsuario from '../components/CrearUsuario.vue'
import ListarEntidad from '../components/ListarEntidad.vue'
import ListarUsuario from '../components/ListarUsuario.vue'
import ListarUsTenan from '../components/ListarUsTenan.vue'
import PruebaUsuario from '../components/PruebaUsuario.vue'
import EditarEntidad from '../components/EditarEntidad.vue'
import EditarUsuario from '../components/EditarUsuario.vue'
import operationsView from '../components/operationsView.vue'
import CrearEntidad from '../components/CrearEntidad.vue'
import CrearServicio from '../components/CrearServicio.vue'

const routes = [
{
    path: '/',
    name: 'home',
  component: HomeView
},
{
  path: '/PruebaUsuario',
  name: 'PruebaUsuario',
component: PruebaUsuario
},
  {
    path: '/crear/:id',
    name: 'crear',
    component: CrearUsuario
  },
  {
    path: '/EditarUsuario/:id/:entity',
    name: 'EditarUsuario',
    component: EditarUsuario
  },
  {
    path: '/EditarEntidad/:id',
    name: 'EditarEntidad',
    component: EditarEntidad
  },
  {
    path: '/ListarEntidad',
    name: 'ListarEntidad',
    component: ListarEntidad
  },
  {
    path: '/ListarUsuario/:id',
    name: 'ListarUsuario',
    component: ListarUsuario
  },
  {
    path: '/ListarUsTenan',
    name: 'ListarUsTenan',
    component: ListarUsTenan
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
    path: '/CrearServicio',
    name: 'CrearServicio',
    component: CrearServicio
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
