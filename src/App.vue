<script setup>
import {ref} from 'vue'
import ButtomNavBar from "./components/ButtomNavBar.vue"
import Players from "./components/Players.vue"
import Profile from "./components/Profile2.vue"

const pageConfig = [
  { page: "home", menuIndex: 0, bgcolor: "grey-lighten-5" },
  { page: "rank", menuIndex: 1, bgcolor: "grey-lighten-5" },
  { page: "players", menuIndex: 2, bgcolor: "grey-lighten-5" },
  { page: "profile", menuIndex: 3, bgcolor: "#0f2049" },
]

const showPage = ref({
  page: "players",
  bgcolor: "grey-lighten-5"
})

const thePlayer = ref({})


function changePage(pagetoshow = "dimas", index=null) {
  showPage.value.page = pageConfig[index].page
  showPage.value.bgcolor = pageConfig[index].bgcolor
}

function playerProfile(player) {
  thePlayer.value = player
  changePage("profile", 3)
}

</script>

<template>
  <v-app>
    <v-app-bar :elevation="0" color="green-darken-4">
      <template v-slot:prepend v-if="showPage.page!='players'">
        <v-btn icon="mdi-arrow-left" variant="text"></v-btn>
      </template>
      <v-app-bar-title>Pingpongers</v-app-bar-title>
      <template v-slot:append>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
      </template>

    </v-app-bar>
    
    <v-main>
      <Players v-if="showPage.page=='players'" @selectedPlayer="(player) => playerProfile(player)" />
      <Profile :player="thePlayer" v-if="showPage.page=='profile'" />
    </v-main>
    <ButtomNavBar @page="(page, index) => changePage(page, index)" />
  </v-app>
</template>

<style scoped>
header {
  line-height: 1.5;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

}
</style>
