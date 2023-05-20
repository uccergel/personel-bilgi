<template>
  <div class="h-screen p-20">
    <div class="text-xl font-bold mb-5 flex space-x-5">
      <h1 class="text-2xl font-bold mb-5">Yeni Personel Ekleme</h1>
    </div>

    <div class="mb-5 space-x-2">
      <div>
        <!-- Kişisel Bilgiler Kısmı -->
        <div>
          <div>
            <h1 class="title-heading text-lg">Kişisel Bilgiler</h1>
            <div class="flex mb-4 space-x-10">
              <div class="flex flex-col space-y-4 my-auto">
                <p class="font-semibold">Adı:</p>
                <p class="font-semibold">Soyadı:</p>
                <p class="font-semibold">TC Kimlik Numarası:</p>
                <p class="font-semibold">Doğum Tarihi:</p>
                <!-- Tarih şeklinde yapılacak -->
                <p class="font-semibold">Kan Grubu:</p>
                <!-- Liste şeklinde yapılacak -->
                <p class="font-semibold">Telefon Numarası:</p>
                <p class="font-semibold">E-Posta Adresi:</p>
                <p class="font-semibold">Adresi:</p>
                <p class="font-semibold">Medeni Durumu:</p>
                <!-- Liste şeklinde yapılacak -->
              </div>
              <form class="flex flex-col space-y-4 my-auto rounded-xl">
                <input
                  v-model="userData.name"
                  placeholder="Adınızı Yazınız"
                  type="text"
                />
                <input
                  v-model="userData.surname"
                  placeholder="Soyadınızı Yazınız"
                  type="text"
                />
                <input
                  v-model="userData.tckn"
                  placeholder="TCKN Yazınız"
                  type="text"
                />
                <input
                  v-model="userData.birthDate"
                  placeholder="Doğum Tarihinizi Giriniz"
                  type="text"
                />
                <select class="rounded-md p-1 m-auto">
                  <option disabled value="">Birini Seçiniz</option>
                  <option v-for="value in bloodGroupData" :key="value">
                    {{ value.name }}
                  </option>
                </select>
                <input
                  v-model="userData.phoneNumber"
                  placeholder="Telefon Numaranızı Yazınız"
                  type="text"
                />
                <input
                  v-model="userData.eMail"
                  placeholder="E-Mail Adresinizi Yazınız"
                  type="text"
                />
                <input
                  v-model="userData.address"
                  placeholder="Adresinizi Yazınız"
                  type="text"
                />
                <select class="rounded-md p-1 m-auto">
                  <option disabled value="">Birini Seçiniz</option>
                  <option v-for="value in martialStatusData" :key="value">
                    {{ value.name }}
                  </option>
                </select>
              </form>
            </div>
          </div>
          <hr class="border-black mb-5" />
        </div>
        <!-- Eğitim Bilgileri -->
        <!-- İş Bilgileri -->
        <div>
          <h1 class="title-heading text-lg">Çalışma Bilgileri</h1>
          <div class="flex mb-4 space-x-10">
            <div class="flex flex-col space-y-4 my-auto">
              <p class="font-semibold">Çalıştığı Birim</p>
            </div>
            <form class="flex flex-col space-y-4 my-auto rounded-xl">
              <select class="rounded-md p-1 m-auto">
                <option disabled value="">Birini Seçiniz</option>
                <option v-for="value in jobStationData" :key="value">
                  {{ value.name }}
                </option>
              </select>
            </form>
          </div>
        </div>
      </div>
    </div>

    <button
      @click="onSave"
      class="bg-[#3C6E71] text-white rounded-md p-1 mr-72"
    >
      Oluştur
    </button>
  </div>
</template>

<script setup>
import { ref, inject } from 'vue'
import { useRouter } from 'vue-router'
import router from '../router'
import UserPlusIcon from '../components/icons/UserPlusIcon.vue'
const martialStatusData = ref([])
const bloodGroupData = ref([])
const jobStationData = ref([])
const appAxios = inject('appAxios')
const userData = ref({
  name: null,
  surname: null,
  jobStation: null,
  // imageUrl: null,
  // phoneNumber: null,
  // address: null,
  // birthDate: null,
  // anotherPhoneNumber: null,
  // tckn: null,
  // education: null,
  // eMail: null,
  // startDateOfContactCenter: null,
  // startDateOfEmployment: null,
  martialStatus: null,
  bloodGroup: null,
  // emergencyContactPersonKindship: null,
  // emergencyContactPersonName: null,
  // emergencyContactPersonSurname: null,
  // emergencyContactPersonPhoneNumber: null
})

appAxios.get('/martialStatus', martialStatusData.value).then((response) => {
  martialStatusData.value = response?.data || []
})

appAxios.get('/bloodGroup', bloodGroupData.value).then((response) => {
  bloodGroupData.value = response?.data || []
})

appAxios.get("/jobStation", jobStationData.value).then((response)=>{
  jobStationData.value = response?.data || []
})

const onSave = () => {
  appAxios
    .post('/employee', { ...userData.value })
    .then((created_employee_response) => {
      console.log(created_employee_response)
      router.push({ name: 'PersonListPage' })
    })
}
</script>
