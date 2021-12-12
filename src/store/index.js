import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    baseUrl: 'https://restcountries.com/v3.1',
    data: [],
    countries: null,
  },
  mutations: {
    getData(state, res){
      state.data = res
    },
    setCountries(state, res){
      state.countries = res
    }
  },
  actions: {
    async getData({ commit }){
      if(!localStorage.getItem('filters')){
        let data = await axios.get(`${this.state.baseUrl}/all`)
        localStorage.setItem('filters', JSON.stringify(data.data))
        commit('getData', data.data)
      }else{
        let data = JSON.parse(localStorage.getItem('filters'))
        commit('getData', data)
      }
    },
    setCountries({ commit }, data){
      commit('setCountries', data)
    }
  },
  modules: {
  }
})
