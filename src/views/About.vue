<template>
    <v-container>
        <v-row>
            <v-col sm="12" md="6" class="d-flex justify-center align-center flex-column">
                <v-container class="px-4 d-flex justify-center justify-md-end">
                    <v-img
                        max-width="500px"
                        class="mt-4 px-5"
                        contain
                        :lazy-src="$store.state.selectedCountry.flags.png"
                        :src="$store.state.selectedCountry.flags.png"
                    ></v-img>
                </v-container>
            </v-col>
            <v-col sm="12" md="6" class="px-4 d-flex justify-end align-start flex-column">
                <v-container class="px-4 d-flex justify-center align-sm-center align-md-start flex-column about">
                    <p>Nome: {{ $store.state.selectedCountry.name.common }}</p>
                    <p v-if="$store.state.selectedCountry.capital">Capital: {{ $store.state.selectedCountry.capital[0] }}</p>
                    <p 
                        @click="selectRegionGoToHome($store.state.selectedCountry.region)" 
                        style="text-decoration: underline; text-decoration-color: blue; cursor: pointer;"
                    >
                        Região: {{ $store.state.selectedCountry.region }}
                    </p>
                    <p>Sub-região: {{ $store.state.selectedCountry.subregion }}</p>
                    <p>População: {{ $store.state.selectedCountry.population }}</p>
                    <p>Linguas: {{ languages }}</p>
                </v-container>
            </v-col>
        </v-row>
        <strong v-if="this.$store.state.selectedCountry.borders" class="mt-4 d-flex justify-center">Paízes Vizinhos:</strong>
        <strong v-else class="mt-4 d-flex justify-center">Sem Paízes Vizinhos</strong>
        <v-row>
            <v-col col="12" class="d-flex justify-center">
                <ShowCountry />
            </v-col>
        </v-row>
        <v-row>
            <v-col col="12">
                <Paginate />
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios'
import ShowCountry from "../components/ShowCountry";
import Paginate from "../components/Paginate";

export default {
    name: 'About',
    components: {
        ShowCountry,
        Paginate
    },
    computed: {
        languages(){
            let names = ''
            const obj = this.$store.state.selectedCountry.languages
            for(let key in obj){
                names += `/${obj[key]}`
            }
            names = names.replace('/', '')
            names = names.length > 30 ? names.substring(0, 31) + '...' : names
            return names
        },
        ...mapState([
            'baseUrl',
        ]),
    },
    methods: {
        selectRegionGoToHome(region){
            region && this.$router.push({ name: 'Home', params: { region } })
        }
    },
    mounted(){
        this.$store.dispatch('loadingNeighboringCountries')
    },
}
</script>
<style scoped lang="scss">
    @import '../sass/about.scss';
</style>