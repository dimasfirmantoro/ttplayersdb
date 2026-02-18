<script setup>
import {ref} from 'vue'
const value = ref(2)
const emit = defineEmits(['page'])

function showPage(page, index) {
    value.value = index
    emit("page", page, index)
}
</script>

<template>
  <v-layout class="overflow-visible" style="height: 56px;">
    <v-bottom-navigation
      v-model="value"
      active
      color="primary"
      grow
    >
      <v-btn @click="showPage('home', 0)">
        <v-icon>mdi-home</v-icon>

        Home
      </v-btn>

      <v-btn @click="showPage('rank', 1)">
        <v-icon>mdi-chart-box-outline</v-icon>

        Peringkat
      </v-btn>

      <v-btn @click="showPage('players', 2)">
        <v-icon>mdi-account-group</v-icon>

        Pemain
      </v-btn>
      
      <v-btn @click="showPage('profile', 3)">
        <v-icon>mdi-account-box</v-icon>

        <span>Profile</span>
      </v-btn>
    </v-bottom-navigation>
  </v-layout>
</template>

<style scoped>
.v-bottom-navigation {
  position: fixed !important
}
</style>
