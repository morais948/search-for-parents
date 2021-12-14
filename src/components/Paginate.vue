<template>
    <v-pagination
        v-model="$store.state.page"
        :length="$store.state.totalPages"
    ></v-pagination>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'Paginate',
    props: [
        'itemForPage'
    ],
    computed: {
        totalPages(){
            return Math.ceil(this.$store.state.countries.length / this.itemForPage) > 0 ? Math.ceil(this.$store.state.countries.length / this.itemForPage) : 1
        },
        ...mapState(['countries'])
    },
    watch: {
        countries: function(){
            this.$store.dispatch('setTotalPage', this.totalPages).then(async _ => {
                let paginat = []
                let offSet = 0
                for (let index = 0; index < this.totalPages; index++) {
                    paginat.push([...Array(10).keys()].map(i => {
                        return (this.$store.state.countries[offSet++])
                    }))
                }
                for (const i in paginat) {
                    paginat[i] = paginat[i].filter(el => el !== undefined)
                }
                await this.$store.dispatch('setPagination', paginat)
            })
        }
    },
}
</script>

<style>

</style>