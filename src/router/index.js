import { createRouter, createWebHistory } from 'vue-router'
import LayoutMain from '../components/layout/LayoutMain.vue'
import Error from '../views/Error.vue'
import Home from '../views/Home.vue'
import PokemonList from '../views/pokemons/PokemonList.vue'
import PokemonDetail from '../views/pokemons/PokemonDetail.vue'

const mainRoutes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/pokemons',
    name: 'pokemon:list',
    component: PokemonList,
    children: [
      {
        path: ':name',
        name: 'pokemon:detail',
        component: PokemonDetail,
      },
    ],
  },
]

const routes = [
  {
    path: '/error',
    alias: '/:pathMatch(.*)*',
    name: 'Error',
    props: true,
    component: Error,
  },
  {
    path: '/',
    component: LayoutMain,
    children: mainRoutes,
  },
]

export default function initializeRouter(app) {
  const router = createRouter({
    history: createWebHistory(),
    routes,
  })

  app.use(router)

  return router
}
