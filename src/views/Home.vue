<template>
  <v-container fluid>
    <v-row align="center">
      <v-col class="d-flex justify-center align-center flex-column" cols="12">
        <Search />
      </v-col>
    </v-row>
    <v-row>
      <v-col col="12" class="d-flex justify-center">
        <ShowCountry />
      </v-col>
    </v-row>
    <v-row>
      <v-col col="12" class="d-flex justify-center">
        <Paginate :item-for-page="10" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Search from "../components/Search";
import ShowCountry from "../components/ShowCountry";
import Paginate from "../components/Paginate";

export default {
  name: "Home",
  components: {
    Search,
    ShowCountry,
    Paginate,
  },
};
</script>
