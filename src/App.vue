<script setup>
import MenuView from "@/views/MenuView.vue";
import ContentView from "@/views/ContentView.vue";
</script>

<template>
  <v-container id="container">
    <v-row id="main">
      <v-col cols="3" id="menu">
        <MenuView />
      </v-col>
      <v-col cols="9">
        <ContentView />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "app",
};
</script>

<style lang="scss">
.v-container {
  // padding-top: 3rem !important;
  // min-height: 800px;

  // #main {
  //   padding: 0;
  // }

  // #menu {
  //   height: auto;
  //   padding-left: 1em;
  //   padding-right: 3em;
  // }
}
</style>