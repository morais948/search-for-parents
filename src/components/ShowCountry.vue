<template>
    <div v-if="$store.state.pagination">  
        <div v-for="(item, i) in $store.state.pagination[`${$store.state.page - 1}`]" :key="i">
            <v-container>
                <v-img
                    style="cursor: pointer"
                    v-if="item.flags.png"
                    @click="select(item)"
                    :class="`mt-4 animate__animated ${i % 2 === 0 ? 'animate__bounceInRight' : 'animate__bounceInLeft'}`"
                    contain
                    :lazy-src="item.flags.png"
                    :src="item.flags.png"
                ></v-img>
            </v-container>
        </div>
    </div>
</template>
<script>
export default {
    name: 'ShowCountry',
    methods: {
        async select(item){
            await this.$store.dispatch('setSelectedCountry', item)
            this.$router.push({ name: 'Country', params: { name: item.name.common } }).catch(el => alert('Você já está na rota desejada'))
        }
    },
}
</script>