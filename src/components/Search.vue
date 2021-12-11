<template>
    <v-select
        color="#6d2080"
        v-model="defaultSelected"
        :items="items"
        label="Escolha uma opção"
    ></v-select>
</template>
<script>
    import { mapState } from 'vuex'

    export default {
        name: 'Search',
        data: () => ({
            defaultSelected: 'País',
            items: ['Região', 'Capital', 'Lingua', 'País', 'Código de ligação'],
        }),
        computed: mapState([
            'baseUrl',
        ])
    }
</script>
