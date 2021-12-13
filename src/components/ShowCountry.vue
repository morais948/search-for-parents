<template>
    <div class="d-flex justify-center align-center flex-column">
        <v-img
            v-for="(item, i) in countries"
            :key="i"
            max-height="150"
            max-width="250"
            contain
            :lazy-src="item.coatOfArms.png"
            :src="item.coatOfArms.png"
        ></v-img>
    </div>
</template>
<script>
export default {
    name: 'ShowCountry',
    props: [
        'countries'
    ]
}
</script>