<script setup>
import {ref} from 'vue'
import { useDisplay } from 'vuetify'

const { mobile } = useDisplay()

console.log(mobile.value)
const search = ref("")
const players = ref([
  {
    id: 1,
    name: "Dimas Firmantoro",
    clubs: "D'Durian, Cemara 39",
    division: [
      9,
      10
    ],
    last_event: "DTT Cup II, 2024",
    picture: "dimas"
  },
  {
    id: 2,
    name: "Mutaqim",
    clubs: "D'Durian, Cemara 39",
    division: [10],
    last_event: "DTT Cup II, 2024"
  },
  {
    id: 3,
    name: "Hengky",
    clubs: "D'Durian, Cemara 39",
    division: [9],
    last_event: "DTT Cup II, 2024",
    picture: "hengky"
  },

])

function showPlayer(id) {
  console.log(id)
}

function avatarUrl(pic) {
  return "/src/assets/" + pic + ".jpg"
}
</script>

<template>
  <v-text-field
    v-model="search"
    label="Search"
    prepend-inner-icon="mdi-magnify"
    single-line
    variant="outlined"
    hide-details
  ></v-text-field>
  <v-data-table v-if="!mobile" :items="players" :search="search">    
  </v-data-table>

  <v-sheet class="mt-3" v-if="mobile">    
    <v-list>
      <v-list-item v-for="player in players" :key="player.id" class="py-4" :title="player.name" :subtitle="player.clubs" @click="showPlayer(player.id)">
        <template v-slot:prepend>
          <v-avatar color="grey-darken-3"><v-img :src="avatarUrl(player.picture)"></v-img></v-avatar>
        </template>
        <template v-slot:append>
          <div>
            <p class="text-primary text-right text-body-2">Div</p><p class="text-right text-caption"><span>{{ player.division.join("/") }}</span></p>
          </div>
        </template>
      </v-list-item>
    </v-list>
  </v-sheet>
</template>

<style scoped>
.v-list-item {
  border-bottom-width: 1px;
}
</style>
