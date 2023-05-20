<template>
  <div class="p-5">
    <h1 class="text-2xl font-bold mb-5">Personel Listesi</h1>
    <table class="mb-5 border-separate border-spacing-x-16 border table-auto">
      <thead>
        <tr>
          <th>SN</th>
          <th>Adı Soyadı</th>
          <th>Çalıştığı Birim</th>
          <th>Medeni Durumu</th>
          <th>Kan Grubu</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="value in employeeData" :key="value">
          <td>{{ value.id }}</td>
          <td>{{ value.name }} {{ value.surname }}</td>
          <!-- <td>{{ jobStationData[value.jobStationId].name }}</td> -->
          <!-- <td>{{ martialStatusData[value.martialStatusId].name }}</td> -->
          <!-- <td>{{ bloodGroupData[value.bloodGroupId].name }}</td> -->
        </tr>
      </tbody>
    </table>
    <div class="mb-5 space-x-3 font-semibold">
      <span>Toplam Personel Sayısı: </span>
      <span>{{ employeeData.length }}</span>
    </div>

    <select class="rounded-md p-1 m-auto">
      <option v-for="value in jobStationData" :key="value">
        {{ value.name }}
      </option>
    </select>

    <select class="rounded-md p-1 m-auto">
      <option v-for="value in martialStatusData" :key="value">
        {{ value.name }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { inject, ref } from 'vue'

const appAxios = inject('appAxios')
const employeeData = ref({})
const jobStationData = ref([])
const martialStatusData = ref([])
const bloodGroupData = ref([])

appAxios.get('/employee', employeeData.value).then((response) => {
  employeeData.value = response?.data || []
})

appAxios.get('/jobStation', jobStationData.value).then((response) => {
  jobStationData.value = response?.data || []
})

appAxios.get('/martialStatus', martialStatusData.value).then((response) => {
  martialStatusData.value = response?.data || []
})

appAxios
  .get('/bloodGroup', bloodGroupData.value)
  .then((response) => [(bloodGroupData.value = response?.data || [])])
</script>
