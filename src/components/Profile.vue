<script setup>
import {computed, ref} from 'vue'
import { useDisplay } from 'vuetify'

const { mobile } = useDisplay()

defineProps(["player"])

console.log(mobile.value)
const search = ref("")
const tableHeaders = [
  { title: "Nama", key: "name" },
  { title: "PTM", key: "clubs" },
  { title: "Divisi", key: "division" },
  { title: "Terlihat terakhir", key: "last_event" }
]

// const player = {
//   id: 1,
//   name: "Dimas Firmantoro",
//   clubs: [ "D'Durian", "Cemara 39" ],
//   division: {
//     division: [
//       9,
//       10
//     ],
//     updated: "2024-03"
//   },
//   last_event: "DTT Cup II, 2024",
//   picture: "dimas"
// }

function avatarUrl(pic) {
  return "/src/assets/" + pic + ".jpg"
}

const getAge = ((yob) => {
  if (!yob) return "-"

  const d = new Date();
  let year = d.getFullYear();
  return (year-yob)
})

</script>

<template>
  <v-sheet class="px-7" color="grey-lighten-3">
    <v-sheet id="header" class="mt-4 mb-6 px-2 py-4 text-center" color="grey-darken-4">
      <div class="text-center mt-4 mb-3">
        <v-avatar color="grey-darken-3" size="110"><v-img :src="avatarUrl(player.picture)"></v-img></v-avatar>
      </div>
      <div class="text-h6 mb-2 font-weight-bold">{{ player.name }}</div>
      <div class="text-subtitle-2 text-grey-darken-1">PTM</div>    
      <div class="text-subtitle-1 mb-2 text-grey-lighten-3">{{ player.clubs.sort().toString() }}</div>    
    </v-sheet>
    <v-sheet class="stats pa-4" color="grey-darken-4">
      <v-container class="pa-0">
        <v-row>
          <v-col>
            <v-sheet class="stat-box elevation-2 text-center py-3" color="green-accent-3">
              <div class="text-green-darken-4 font-weight-bold">Umur</div>
              <div class="text-h3 font-weight-bold mt-1 mb-2">{{ getAge(player.yob) }}</div>
            </v-sheet>
          </v-col>
          <v-col>
            <v-sheet class="stat-box elevation-2 text-center py-3" color="green-accent-3">
              <div class="text-green-darken-4 font-weight-bold">Divisi</div>
              <div class="text-h3 font-weight-bold mt-1 mb-2">{{ player.division.division.join(",") }}</div>
            </v-sheet>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-sheet class="stat-box elevation-2 text-center py-3" color="green-accent-3">
              <div class="text-green-darken-4 font-weight-bold">Grip Style</div>
              <div class="text-h3 font-weight-bold mt-1 mb-2">{{ player.style }}</div>
            </v-sheet>
          </v-col>
          <v-col>
            <v-sheet class="stat-box elevation-2 text-center py-3" color="green-accent-3">
              <div class="text-green-darken-4 font-weight-bold">Prestasi</div>
              <div class="text-h3 font-weight-bold mt-1 mb-2">-</div>
            </v-sheet>
          </v-col>
        </v-row>        
      </v-container>
      <v-card
        class="mx-auto rounded-lg mt-5"
        color="blue-grey-lighten-4"
        max-width="400"
        prepend-icon="mdi-table-tennis"
        theme="dark"
        title="Equipments"
      >
        <template v-slot:prepend>
          <v-icon size="x-large"></v-icon>
        </template>

        <v-card-text class="py-2">
          <div class="text-body-2">Raket/Bet</div>
          <div class="text-h6">{{ player.equipment.racket? player.equipment.racket : "-" }}</div>
          <v-divider class="my-2"></v-divider>
          <div class="text-body-2">Karet (forehand)</div>
          <div class="text-h6">{{ player.equipment.rubber_forehand? player.equipment.rubber_forehand : "-" }}</div>
          <v-divider class="my-2"></v-divider>
          <div class="text-body-2">Karet (backhand)</div>
          <div class="text-h6">{{ player.equipment.rubber_backhand? player.equipment.rubber_backhand : "-" }}</div>
          <div class="mt-6 text-caption text-right">Data terakhir: Januari 2024</div>
        </v-card-text>
      </v-card>      
    </v-sheet>
  </v-sheet>

</template>

<style scoped>
#header {
  border-radius: 1rem;
}
.stats {
  border-top-left-radius: 1rem !important;
  border-top-right-radius: 1rem !important;
}
.stat-box {
  border-radius: 1rem;
}
#equipments .v-col {
  border-right:1px solid rgb(228, 228, 228);
}
</style>
