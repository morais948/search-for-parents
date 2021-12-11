import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    baseUrl: 'https://restcountries.com/v3.1/',
    mapPath: [
      //listar aqui os filtros com os path
      {
        filter: 'Região',
        path: 'name/'
      },
      {
        filter: 'Capital',
        path: 'name/'
      },
      {
        filter: 'Lingua',
        path: 'name/'
      },
      {
        filter: 'País',
        path: 'name/'
      },
      {
        filter: 'Código',
        path: 'alpha/'
      },
    ]
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
