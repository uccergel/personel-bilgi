<template>
  <div class="p-5">
    <h1 class="text-2xl font-bold mb-5">Personel Listesi</h1>
    <table class="mb-5 border-separate border-spacing-x-16 border table-auto">
      <thead>
        <tr>
          <th>SN</th>
          <th>Adı Soyadı</th>
          <th>Çalıştığı Birim</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="value in employeeData">
          <td>{{ value.id }}</td>
          <td>{{ value.name }} {{ value.surname }}</td>
          <td>{{ jobStationData[value.jobStationId].name }}</td>
        </tr>
      </tbody>
    </table>
    <div class="mb-5 space-x-3 font-semibold">
      <span>Toplam Personel Sayısı: </span>
      <span>{{ employeeData.length }}</span>
    </div>
    <select v-model="selected">
      <span v-for="value in jobStationData"> {{ value.name }}</span>
    </select>
  </div>
</template>

<script setup>
import { inject, ref } from 'vue'

const appAxios = inject('appAxios')
const employeeData = ref({})
const jobStationData = ref([])

appAxios.get('/employee', employeeData.value).then((response) => {
  employeeData.value = response?.data || []
})

appAxios.get('/jobStation', jobStationData.value).then((response) => {
  jobStationData.value = response?.data || []
})
</script>
