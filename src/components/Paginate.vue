<template>
    <v-pagination
        v-model="page"
        :length="3"
    ></v-pagination>
</template>
<script>
export default {
    name: 'ShowCountry',
    props: [
        'list'
    ],
    data() {
        return {
            page: 1,
            pagination: []
        }
    },
    computed: {
        listPaginate(){
            return this.list
        }
    },
}
</script>