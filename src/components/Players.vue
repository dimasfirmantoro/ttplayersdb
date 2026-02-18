<script setup>
import {ref} from 'vue'
import { useDisplay } from 'vuetify'


const { mobile } = useDisplay()

const search = ref("")
const tableHeaders = [
  { title: "Nama", key: "name" },
  { title: "PTM", key: "clubs" },
  { title: "Divisi", key: "division" },
  { title: "Terlihat terakhir", key: "last_event" }
]

const players = [
  {
    id: 1,
    name: "Dimas Firmantoro",
    aliases: ["Dimas"],
    clubs: [ "Cemara 39" ],
    yob: 1978,
    division: {
      division: [
        9
      ],
      updated: "2024-03"
    },
    playstyle: "allround",
    style: "SH",
    handedness: "right",
    equipment: {
      racket: "Yinhe V-14 Pro",
      rubber_forehand: "Nittaku Fastarc G1",
      rubber_backhand: "Donic Rasanter R42",
      updated: "2024-03"
    },
    stats: {
      spin: 4,
      chop: 4,
      block: 3,
      speed: 3,
      forehand: 3,
      backhand: 4
    },
    last_event: "DTT Cup II, 2024",
    picture: "dimas"
  },
  {
    id: 2,
    name: "Mutaqim",
    clubs: [ "Cemara 39" ],
    yob: 1978,
    division: {
      division: [ 10 ],
      updated: "2024-03"
    },
    playstyle: "defend",
    style: "shakehand",
    handedness: "right",
    equipment: {
      racket: "",
      rubber_forehand: "",
      rubber_backhand: "",
      updated: "2024-03"
    },
    last_event: "DTT Cup II, 2024",
    picture: "mutaqim"
  },
  {
    id: 3,
    name: "Hengky",
    aliases: ["Hengky", "Constantine"],
    clubs: [ "Synergy", "Cemara 39", "Ogel-Ogel" ],
    yob: 1978,
    division: {
      division: [ 8 ],
      updated: "2024-03"
    },
    playstyle: "allround",
    style: "PH",
    handedness: "right",
    equipment: {
      racket: "",
      rubber_forehand: "",
      rubber_backhand: "",
      updated: "2024-03"
    },
    last_event: "DTT Cup II, 2024",
    picture: "hengky"
  },
  {
    id: 4,
    name: "Sastra",
    clubs: [ "Cemara 39" ],
    yob: null,
    division: {
      division: [ 10 ],
      updated: "2024-03"
    },
    style: "shakehand",
    equipment: {
      racket: "Viscaria",
      rubber_forehand: "",
      rubber_backhand: "",
      updated: "2024-03"
    },
    last_event: "DTT Cup II, 2024",
    picture: "sastra"
  },

]

const emit = defineEmits(['selectedPlayer'])

function showPlayer(id, index) {
  emit("selectedPlayer", id, index)
}

function avatarUrl(pic) {
  return "/" + pic + ".jpg"
}
</script>

<template>
  <v-sheet class="mt-4 px-2">
    <v-text-field
      v-model="search"
      label="Search"
      prepend-inner-icon="mdi-magnify"
      single-line
      variant="outlined"
      density="compact"
      hide-details
    ></v-text-field>
    <v-data-table v-if="!mobile" :items="players" :headers="tableHeaders" :search="search">    
    </v-data-table>
  
    <v-data-iterator v-if="mobile" :items="players" :search="search">
      <template v-slot:default="{ items }">
        <v-list-item v-for="player in items" :key="player.id" class="py-4" :title="player.raw.name" @click="showPlayer(player.raw, 2)">
          <template v-slot:prepend>
            <v-avatar color="grey-darken-3"><v-img :src="avatarUrl(player.raw.picture)"></v-img></v-avatar>
          </template>
          <template v-slot:append>
            <div>
              <p class="text-primary text-right text-body-2">Div</p><p class="text-right text-caption"><span>{{ player.raw.division.division.join("/") }}</span></p>
            </div>
          </template>
          <template v-slot:subtitle>
            {{ player.raw.clubs.join(" | ") }}
          </template>
        </v-list-item>      
      </template>
    </v-data-iterator>
  </v-sheet>

</template>

<style scoped>
.v-list-item {
  border-bottom-width: 1px;
}
</style>
