import { createRouter, createWebHistory } from 'vue-router'

const HomeView = () => import(/* webpackChunkName: "home" */'@/views/HomeView.vue')
const CompInfoLoL = () => import(/* webpackChunkName: "lol" */'@/components/informacoes/CompInfoLoL.vue')
const CompInfoFortnite = () => import(/* webpackChunkName: "fortnite" */'@/components/informacoes/CompInfoFortnite.vue')
const CompInfoSTF = () => import(/* webpackChunkName: "stf" */'@/components/informacoes/CompInfoSTF.vue')
const CompInfoGeral = () => import(/* webpackChunkName: "home" */'@/components/informacoes/CompInfoGeral.vue')
const TabelaLutasView = () => import(/* webpackChunkName: "lutas" */'@/views/TabelaLutasView.vue')
const CompEditar = () => import(/* webpackChunkName: "editar" */'@/components/CompEditar.vue')
const CompCadastro = () => import(/* webpackChunkName: "cadastro" */'@/components/CompCadastro.vue')

const routes = [
  {
    path: '/',
    name: 'home',
    alias: '/home',
    component: HomeView,
    children: [
      {
        path: '/',
        alias: '/home',
        name: 'home',
        component: CompInfoGeral
      },
      {
        path: 'lol',
        name: 'lol',
        component: CompInfoLoL
      },
      {
        path: 'fortnite',
        name: 'fortnite',
        component: CompInfoFortnite
      },
      {
        path: 'stf',
        name: 'stf',
        component: CompInfoSTF
      }
    ]
  },
  {
    path: '/cadastro',
    name: 'cadastro',
    component: CompCadastro
  },
  {
    path: '/lutas',
    name: 'lutas',
    component: TabelaLutasView
  },
  {
    path: '/lutas/:id',
    name: 'editar',
    component: CompEditar
  }
]

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior(to) {
      if(to.hash) {
          return { el: to.hash }
      }
  },
  routes: routes
})

export default router
