//Paulina estuvo acá
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CrearUsuario from '../components/CrearUsuario.vue'
import CrearEntidad from '../components/CrearEntidad.vue'
import CrearEstandar from '../components/CrearEstandar.vue'
import CrearServicio from '../components/CrearServicio.vue'
import CrearCriterio from '../components/CrearCriterio.vue'
import ListarEntidad from '../components/ListarEntidad.vue'
import ListarUsuario from '../components/ListarUsuario.vue'
import ListarUsTenan from '../components/ListarUsTenan.vue'
import PruebaUsuario from '../components/PruebaUsuario.vue'
import EditarEntidad from '../components/EditarEntidad.vue'
import EditarUsuario from '../components/EditarUsuario.vue'
import EditarEstandar from '../components/EditarEstandar.vue'
import EditarServicio from '../components/EditarServicio.vue'
import EditarCriterio from '../components/EditarCriterio.vue'
import operationsView from '../components/operationsView.vue'
import ListarServicios from '../components/ListarServicios.vue'
import ListarEstandares from '../components/ListarEstandares.vue'
import LoginView from '../components/LoginView.vue'


const routes = [
{
    path: '/',
    name: 'home',
  component: HomeView,
  meta: { hasSidebar: true }
},
{
  path: '/login',
  name: 'LoginView',
component: LoginView
},
{
  path: '/PruebaUsuario',
  name: 'PruebaUsuario',
  component: PruebaUsuario,
  meta: { hasSidebar: true }
},
  {
    path: '/crear/:id',
    name: 'crear',
    component: CrearUsuario,
    meta: { hasSidebar: true }
  },
  {
    path: '/EditarUsuario/:id/:entity',
    name: 'EditarUsuario',
    component: EditarUsuario,
    meta: { hasSidebar: true }
  },
  {
    path: '/EditarEntidad/:id',
    name: 'EditarEntidad',
    component: EditarEntidad,
    meta: { hasSidebar: true }
  },
  {
    path: '/EditarEstandar/:idServ/:idEst',
    name: 'EditarEstandar',
    component: EditarEstandar,
    meta: { hasSidebar: true }
  },
  {
    path: '/EditarServicio/:entity/:idServ',
    name: 'EditarServicio',
    component: EditarServicio,
    meta: { hasSidebar: true }
  },
  {
    path: '/EditarCriterio',
    name: 'EditarCriterio',
    component: EditarCriterio,
    meta: { hasSidebar: true }
  },
  {
    path: '/ListarEntidad',
    name: 'ListarEntidad',
    component: ListarEntidad,
    meta: { hasSidebar: true }
  },
  {
    path: '/ListarUsuario/:id',
    name: 'ListarUsuario',
    component: ListarUsuario,
    meta: { hasSidebar: true }
  },
  {
    path: '/ListarServicios/:id',
    name: 'ListarServicios',
    component: ListarServicios,
    meta: { hasSidebar: true }
  },
  {
    path: '/ListarEstandares/:id',
    name: 'ListarEstandares',
    component: ListarEstandares,
    meta: { hasSidebar: true }
  },
  {
    path: '/ListarServicios/:id',
    name: 'ListarServicios',
    component: ListarServicios,
    meta: { hasSidebar: true }
  },
  {
  path: '/ListarEstandares/:id',
    name: 'ListarEstandares',
    component: ListarEstandares,
    meta: { hasSidebar: true }
  },
  {
    path: '/ListarUsTenan',
    name: 'ListarUsTenan',
    component: ListarUsTenan,
    meta: { hasSidebar: true }
  },

  {
    path: '/ListarServicios/:id',
    name: 'ListarServicios',
    component: ListarServicios,
    meta: { hasSidebar: true }
  },
  {
  path: '/ListarEstandares/:id',
    name: 'ListarEstandares',
    component: ListarEstandares,
    meta: { hasSidebar: true }
  },
{
    path: '/operations',
    name: 'operations',
    component: operationsView,
    meta: { hasSidebar: true }
  },
  {
    path: '/CrearEntidad',
    name: 'CrearEntidad',
    component: CrearEntidad,
    meta: { hasSidebar: true }
  },
  {
    path: '/CrearServicio/:entityId',
    name: 'CrearServicio',
    component: CrearServicio,
    meta: { hasSidebar: true }
  },
  {
    path: '/CrearEstandar/:ServiceId',
    name: 'CrearEstandar',
    component: CrearEstandar,
    meta: { hasSidebar: true }
  },
  {
    path: '/CrearCriterio',
    name: 'CrearCriterio',
    component: CrearCriterio,
    meta: { hasSidebar: true }
  },

  {
    path: '/about',
    name: 'about',
    meta: { hasSidebar: true },
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
