<template>        
    <v-container>
        <VRow>
            <VCol col="12" class="d-flex justify-center align-center flex-column">
                <v-container class="max-width">
                    <v-select
                        @change="chooseFilter($event)"
                        color="#6d2080"
                        v-model="defaultFilter"
                        :items="filtersLabel"
                        label="Filtrar por"
                    ></v-select>
                </v-container>

                <v-container class="max-width">
                    <v-select
                        v-if="defaultFilter"
                        color="#6d2080"
                        v-model="defaultValue"
                        :items="values"
                        :label="defaultFilter"
                    ></v-select>
                </v-container>

                
                <div v-if="pagination">      
                    <div v-for="(item, i) in pagination[`${page - 1}`]" :key="i">
                          <v-img
                            class="mt-4"
                            max-height="150"
                            max-width="250"
                            contain
                            :lazy-src="item.coatOfArms.png"
                            :src="item.coatOfArms.png"
                        ></v-img>
                    </div>
                </div>
                
            </VCol>
        </VRow>
        <VRow>
            <VCol col="12" class="d-flex justify-center">
                <v-pagination
                    v-model="page"
                    :length="totalPages"
                ></v-pagination>
            </VCol>
        </VRow>
    </v-container>

</template>
<script>
    import { mapState } from 'vuex'
    import axios from 'axios'
    import ShowCountry from './ShowCountry'

    export default {
        name: 'Search',
        components: {
            ShowCountry
        },
        data: () => ({
            defaultFilter: null,
            filtersLabel: ['Região', 'Capital', 'Lingua', 'País', 'Código de ligação'],

            defaultValue: null,
            values: [],
            path: null,

            page: 1,
            pagination: null,
            totalPages: 1
        }),
        computed: mapState([
            'baseUrl',
        ]),
        methods: {
            chooseFilter(value){
                this.values = []
                this.path = null

                for(let item of this.$store.state.data){
                    switch(value) {
                        case 'Região':
                            this.path = 'region'
                            item.region && this.values.push(item.region)
                            break;
                        case 'Capital':
                            this.path = 'capital'
                            item.capital && this.values.push(item.capital)
                            break;
                        case 'Lingua':
                            this.path = 'lang'
                            if(item.languages){
                                let lang = ''
                                for(let i in item.languages){
                                    lang += '/' + item.languages[i]
                                    this.values.push(lang.replace('/', ''))
                                }
                            }
                            break;
                        case 'País':
                            this.path = 'name'
                            item.name.common && this.values.push(item.name.common)
                            break;
                        case 'Código de ligação':
                            this.path = 'alpha'
                            item.tld && this.values.push(item.tld[0].replace('.', ''))
                            break;
                    }
                }
            },
            async requestCountry(path, value){
                let res = await axios.get(`${this.baseUrl}/${path}/${value}`)
                this.geratePagination(res.data)
                await this.$store.dispatch('setCountries', res.data)
            },
            geratePagination(data){
          
                let totalPages = Math.ceil(data.length / 10)
                let paginat = []
                let offSet = 0
                if(totalPages < 1){
                    totalPages = 1
                }
                for (let index = 0; index < totalPages; index++) {
                    paginat.push([...Array(10).keys()].map(i => {
                        return (data[offSet++])
                    }))
                }

                for (const i in paginat) {
                    paginat[i] = paginat[i].filter(el => el !== undefined)
                }
          
                this.totalPages = totalPages
                this.pagination = paginat
            }
        },
        watch: {
            defaultValue: function (newVal) {
                if(this.path == 'lang'){
                    this.requestCountry(this.path, newVal.split('/')[0])
                }else{
                    this.requestCountry(this.path, newVal)
                }
            }
        },
    }
</script>
