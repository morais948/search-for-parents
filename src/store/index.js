import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        baseUrl: 'https://restcountries.com/v3.1',
        data: [],
        countries: [],
        page: 1,
        totalPages: 1,
        pagination: [],
        selectedCountry: null,
    },
    mutations: {
        getData(state, res) {
            state.data = res
        },
        setCountries(state, res) {
            state.countries = res
        },
        setPage(state, res) {
            state.page = res
        },
        setTotalPage(state, res) {
            state.totalPages = res
        },
        setPagination(state, res){
            state.pagination = res
        },
        setSelectedCountry(state, res){
            state.selectedCountry = res
        },
    },
    actions: {
        async getData({ commit }) {
            if (!localStorage.getItem('filters')) {
                let data = await axios.get(`${this.state.baseUrl}/all`)
                localStorage.setItem('filters', JSON.stringify(data.data))
                commit('getData', data.data)
            } else {
                let data = JSON.parse(localStorage.getItem('filters'))
                commit('getData', data)
            }
        },
        setCountries({ commit }, data) {
            commit('setCountries', data)
        },
        setPage({ commit }, data) {
            commit('setPage', data)
        },
        setTotalPage({ commit }, data) {
            commit('setTotalPage', data)
        },
        setPagination({ commit }, data){
            commit('setPagination', data)
        },
        setSelectedCountry({ commit }, data){
            commit('setSelectedCountry', data)
        },
    },
    modules: {
    }
})
