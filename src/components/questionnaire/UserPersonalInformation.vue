<template>
  <div>
  <div class="row">
    <div class="columns four">
      <label for="surname">Фамилия</label>
      <input name="surname" id="surname" v-model="user.last_name"/>
    </div>
    <div class="columns four">
      <label for="name">Имя</label>
      <input name="name" id="name" v-model="user.first_name"/>
    </div>
    <div class="columns four">
      <label for="patronymic">Отчество</label>
      <input name="patronymic" id="patronymic" v-model="user.middle_name"/>
    </div>
  </div>
  <div class="row">
    <div class="columns four">
      <label for="birthday">Дата рождения</label>
      <date-picker name="birthday" id="birthday" v-model="user.birthday" format="dd.MM.yyyy"/>
    </div>
    <div class="columns two">
      <label>Пол</label>
      <select data-placeholder="" v-model="user.male">
        <option value="1">Мужской</option>
        <option value="2">Женский</option>
      </select>
    </div>
  </div>
  </div>
</template>

<script>
  import DatePicker from 'vuejs-datepicker'

  export default {
    components: {
      DatePicker
    },
    data: function () {
      return {
        user: {
          last_name: '',
          first_name: '',
          middle_name: '',
          birthday: '',
          male: ''
        }
      }
    },
    watch: {
      user: {
        handler: function () {
          this.$emit('inputUserPersonalInformation', this.user)
        },
        deep: true
      }
    },
    mounted: function () {
      const savedUser = this.$store.getters.getUser
      this.user = {...this.user, ...savedUser}
    }
  }
</script>

<style scoped>

</style>
