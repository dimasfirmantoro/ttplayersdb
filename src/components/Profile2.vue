<script setup>
import {computed, ref, watch} from 'vue'
import { useDisplay } from 'vuetify'
import VueApexCharts from "vue3-apexcharts";

const { mobile } = useDisplay()

const props = defineProps(["player"])


console.log(mobile.value)

const search = ref("")
const mytab = ref(0)
watch(mytab, (newtab) => {
  console.log(newtab)
})

const tabs = [
  "Profile",  "Stats", "Jejak"
]

function avatarUrl(pic) {
  return "/" + pic + ".jpg"
}

const getAge = ((yob) => {
  if (!yob) return "-"

  const d = new Date();
  let year = d.getFullYear();
  return (year-yob)
})

function pstyleIcon(icon) {
  let mdiicon = ""
  switch (icon) {
    case "attack":
      mdiicon = "sword"
      break;
    case "defend":
      mdiicon = "security"
      break; 
    default:
      mdiicon = "cached"
      break;
  }
  return mdiicon
}

const chartdata = {
  series: [
    {
      name: '',
      data: [
        props.player.stats.spin, 
        props.player.stats.chop, 
        props.player.stats.block, 
        props.player.stats.speed, 
        props.player.stats.backhand,
        props.player.stats.forehand 
      ],
    }
  ],
  chartOptions: {
    chart: {
      height: 350,
      type: 'radar',
    },
    title: {
      text: 'Kemampuan sesuai divisi'
    },
    yaxis: {
      stepSize: 1,
      max: 5,
      min: 0
    },
    xaxis: {
      categories: ['Spin', 'Push/Chop', 'Block', 'Speed', 'Backhand', "Forehand"]
    }
  }
}

</script>

<template>
  <v-sheet v-if="Object.keys(player).length" class="px-5" color="grey-lighten-3">
    <v-container class="header mt-3 pa-0">
      <v-row align="start">
        <v-col cols="auto">
          <v-avatar size="75"><v-img :src="avatarUrl(player.picture)"></v-img></v-avatar>
        </v-col>
        <v-col class="my-auto">
          <div class="name font-weight-bold">{{ player.name }}</div>
          <div v-if="player.aliases">{{ player.aliases.join(",") }}</div>
          <div>{{ player.clubs? player.clubs.sort().toString():"" }}</div>
        </v-col>
      </v-row>
    </v-container>

    <v-item-group mandatory v-model="mytab">
      <v-container class="px-0">
        <v-row no-gutters>
          <v-col v-for="tab in tabs" :key="tab" cols="4">
            <v-item v-slot="{ isSelected, toggle }">
              <v-card
                color="green"
                class="align-center"
                flat
                rounded=0
                :variant="isSelected ? 'flat' : 'tonal'"
                @click="toggle"
              >                
                <div class="text-center">{{tab}}</div>               
              </v-card>
            </v-item>
          </v-col>
        </v-row>
      </v-container>
    </v-item-group>
  
    <v-sheet v-if="mytab==0" class="stats pa-4" color="grey-lighten-2">
      <v-container class="pa-1">
        <v-row>
          <v-col class="pa-1">
            <v-sheet class="stat-box elevation-1 text-center py-3" color="grey-lighten-3">
              <div class="text-caption">Umur</div>
              <div class="text-body-1 text-green-darken-4 font-weight-bold mt-1 mb-2">{{ getAge(player.yob) }} thn</div>
            </v-sheet>
          </v-col>
          <v-col class="pa-1">
            <v-sheet class="stat-box elevation-1 text-center py-3" color="grey-lighten-3">
              <div class="text-caption">Divisi</div>
              <div class="text-body-1 text-green-darken-4 font-weight-bold mt-1 mb-2">{{ player.division? player.division.division.join(","):"" }}</div>
            </v-sheet>
          </v-col>
          <v-col class="pa-1">
            <v-sheet class="stat-box elevation-1 text-center py-3" color="grey-lighten-3">
              <div class="text-caption">Permainan</div>
              <div class="text-body-1 text-green-darken-4 font-weight-bold mt-1 mb-2"><v-icon>mdi-{{ pstyleIcon(player.playstyle) }}</v-icon></div>
            </v-sheet>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="pa-1">
            <v-sheet class="stat-box elevation-1 text-center py-3" color="grey-lighten-3">
              <div class="text-caption">Pegangan</div>
              <div class="text-body-1 text-green-darken-4 font-weight-bold mt-1 mb-2">{{ player.style }}</div>
            </v-sheet>
          </v-col>
          <v-col class="pa-1">
            <v-sheet class="stat-box elevation-1 text-center py-3" color="grey-lighten-3">
              <div class="text-caption">Sisi tangan</div>
              <div class="text-body-1 text-green-darken-4 font-weight-bold mt-1 mb-2">{{ player.handedness.charAt(0).toUpperCase() + player.handedness.slice(1) }}</div>
            </v-sheet>
          </v-col>
          <v-col class="pa-1">
            <v-sheet class="stat-box elevation-1 text-center py-3" color="grey-lighten-3">
              <div class="text-caption">Divisi</div>
              <div class="text-body-1 text-green-darken-4 font-weight-bold mt-1 mb-2">{{ player.division?player.division.division.join(","):"" }}</div>
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
          <div class="text-caption">Raket/Bet</div>
          <div class="text-h6">{{ player.equipment.racket? player.equipment.racket : "-" }}</div>
          <v-divider class="my-2"></v-divider>
          <div class="text-caption">Karet (forehand)</div>
          <div class="text-h6">{{ player.equipment.rubber_forehand? player.equipment.rubber_forehand : "-" }}</div>
          <v-divider class="my-2"></v-divider>
          <div class="text-caption">Karet (backhand)</div>
          <div class="text-h6">{{ player.equipment.rubber_backhand? player.equipment.rubber_backhand : "-" }}</div>
          <div class="mt-6 text-caption text-right">Data terakhir: Januari 2024</div>
        </v-card-text>
      </v-card>      
    </v-sheet>

    
  </v-sheet>
  
  <v-sheet v-if="mytab==1" class="stats pa-4" >
    <div id="chart">
      <VueApexCharts type="radar" height="350" :options="chartdata.chartOptions" :series="chartdata.series"></VueApexCharts>
    </div>
  </v-sheet>

  <v-sheet class="text-center mt-2" v-else>Empty</v-sheet>
  
</template>

<style scoped>
#header {
  border-radius: 1rem;
}
.name {
  font-size: 1.25em;

}
.stats {
  border-top-left-radius: 0.3rem !important;
  border-top-right-radius: 0.3rem !important;
}
.stat-box {
  border-radius: 0.2rem;
}
#equipments .v-col {
  border-right:1px solid rgb(228, 228, 228);
}
</style>
