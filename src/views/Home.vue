<template>
  <v-container fluid>
    <v-row align="center">
      <v-col
        class="d-flex"
        cols="12"
      >
        <v-select
          color="#6d2080"
          v-model="defaultSelected"
          :items="items"
          label="Escolha uma opção"
        ></v-select>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import HelloWorld from '../components/HelloWorld'

  export default {
    name: 'Home',

    components: {
      HelloWorld,
    },
    data: () => ({
      defaultSelected: 'País',
      items: ['Região', 'Capital', 'Lingua', 'País', 'Código'],
    }),
  }
</script>
