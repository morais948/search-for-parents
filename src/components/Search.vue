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
                    <div v-for="(item, i) in pagination[`page-${page}`]" :key="i">
                        <v-img
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
                let totalPages = Math.round(data.length / 10)
                let offSet = 0
                let limit = 10
                if(data.length < 10){
                    limit = data.length
                }

                if(totalPages === 0){
                    totalPages = 1
                }

                this.pagination = { }
                this.totalPages = totalPages

                for (let i = 0; i < totalPages; i++) {
                    if(this.pagination[`page-${i + 1}`]){
                        for(offSet; offSet < limit; offSet++){
                            this.pagination[`page-${i + 1}`].push(data[offSet])
                        }
                    }else{
                        this.pagination[`page-${i + 1}`] = []
                        for(offSet; offSet < limit; offSet++){
                            this.pagination[`page-${i + 1}`].push(data[offSet])
                        }
                    }
                    offSet *= 2
                    limit = offSet + 10
                }
                console.log(this.pagination)
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
