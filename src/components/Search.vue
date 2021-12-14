<template>        
    <v-container>
        <v-row>
            <v-col col="12" class="d-flex justify-center align-center flex-column">
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
            </v-col>
        </v-row>
    </v-container>

</template>
<script>
    import { mapState } from 'vuex'
    import axios from 'axios'

    export default {
        name: 'Search',
        data: () => ({
            defaultFilter: null,
            filtersLabel: ['Região', 'Capital', 'Lingua', 'País', 'Código de ligação'],

            defaultValue: null,
            values: [],
            path: null,
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
                this.values = this.values.sort()
            },
            async requestCountry(path, value){
                let res = await axios.get(`${this.baseUrl}/${path}/${value}`)
                await this.$store.dispatch('setCountries', res.data)
            },
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
        mounted() {
            //montar a lógica aqui
            /*
            if(this.$router.currentRoute.params.region){
                this.defaultFilter = "Região"
                this.defaultValue = this.$router.currentRoute.params.region
            }
            */
        },
    }
</script>
