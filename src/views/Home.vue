<template>
  <v-container fluid>
    <v-row align="center">
      <v-col
        class="d-flex"
        cols="12"
      >
        <Search />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import Search from '../components/Search';

  export default {
    name: 'Home',
    components: {
      Search
    },
  }
</script>
