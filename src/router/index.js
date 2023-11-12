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
import ListarCriterios from '../components/ListarCriterios.vue'
import ListarCriteriosAdmin from '../components/ListarCriteriosAdmin.vue'
import LoginView from '../components/LoginView.vue'


const routes = [
{
    path: '/',
    name: 'home',
  component: HomeView,
  meta: { hasSidebar: true, requiresAuth: true }
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
meta: { hasSidebar: true, requiresAuth: true }
},
  {
    path: '/crear/:id',
    name: 'crear',
    component: CrearUsuario,
    meta: { hasSidebar: true, requiresAuth: true }
  },
  {
    path: '/EditarUsuario/:id/:entity',
    name: 'EditarUsuario',
    component: EditarUsuario,
    meta: { hasSidebar: true, requiresAuth: true }
  },
  {
    path: '/EditarEntidad/:id',
    name: 'EditarEntidad',
    component: EditarEntidad,
    meta: { hasSidebar: true, requiresAuth: true }
  },
  {
    path: '/EditarEstandar/:idServ/:idEst',
    name: 'EditarEstandar',
    component: EditarEstandar,
    meta: { hasSidebar: true, requiresAuth: true }
  },
  {
    path: '/EditarServicio/:entity/:idServ',
    name: 'EditarServicio',
    component: EditarServicio,
    meta: { hasSidebar: true, requiresAuth: true }
  },
  {
    path: '/EditarCriterio/:idCrit/:servicio/:StandardId',
    name: 'EditarCriterio',
    component: EditarCriterio,
    meta: { hasSidebar: true, requiresAuth: true }
  },
  {
    path: '/ListarEntidad',
    name: 'ListarEntidad',
    component: ListarEntidad,
    meta: { hasSidebar: true, requiresAuth: true }
  },
  {
    path: '/ListarUsuario/:id',
    name: 'ListarUsuario',
    component: ListarUsuario,
    meta: { hasSidebar: true, requiresAuth: true }
  },
  {
    path: '/ListarUsTenan',
    name: 'ListarUsTenan',
    component: ListarUsTenan,
    meta: { hasSidebar: true, requiresAuth: true }
  },

  {
    path: '/ListarServicios/:id',
    name: 'ListarServicios',
    component: ListarServicios,
    meta: { hasSidebar: true, requiresAuth: true }
  },
  {
  path: '/ListarEstandares/:id',
    name: 'ListarEstandares',
    component: ListarEstandares,
    meta: { hasSidebar: true, requiresAuth: true }
  },
  {
    path: '/ListarCriterios/:id/:servicio', //recibe id estandar y id servicio
    name: 'ListarCriterios',
    component: ListarCriterios,
    meta: { hasSidebar: true }
  },
  {
    path: '/ListarCriteriosAdmin/:id/:servicio', //recibe id estandar y id servicio
    name: 'ListarCriteriosAdmin',
    component: ListarCriteriosAdmin,
    meta: { hasSidebar: true }
  },

{
    path: '/operations',
    name: 'operations',
    component: operationsView,
    meta: { hasSidebar: true, requiresAuth: true }
  },
  {
    path: '/CrearEntidad',
    name: 'CrearEntidad',
    component: CrearEntidad,
    meta: { hasSidebar: true, requiresAuth: true }
  },
  {
    path: '/CrearServicio/:entityId',
    name: 'CrearServicio',
    component: CrearServicio,
    meta: { hasSidebar: true, requiresAuth: true }
  },
  {
    path: '/CrearEstandar/:ServiceId',
    name: 'CrearEstandar',
    component: CrearEstandar,
    meta: { hasSidebar: true, requiresAuth: true }
  },
  {
    path: '/CrearCriterio/:StandardId/:servicio',
    name: 'CrearCriterio',
    component: CrearCriterio,
    meta: { hasSidebar: true, requiresAuth: true }
  },

  {
    path: '/about',
    name: 'about',
    meta: { hasSidebar: true, requiresAuth: true },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited. HOLAA
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("user");

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'LoginView' }); // Redirige al inicio de sesión si no está autenticado
  } else {
    next(); // Permite el acceso a la ruta
  }
});



export default router
