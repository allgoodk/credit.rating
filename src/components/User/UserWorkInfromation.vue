<template>
  <div>
    <div class="columns four">
      <label>Вид занятости</label>
      <select data-placeholder="&nbsp;" class="selector-block" v-model="user.work_vid">
        <option value="1">Наемный сотрудник</option>
        <option value="2">Индивидуальный предприниматель</option>
        <option value="3">Учредитель/участник ООО</option>
        <option value="4">Пенсионер</option>
        <option value="5">Студент</option>
        <option value="6">Безработный</option>
      </select>
    </div>
    <div class="columns four" v-if="user.work_vid == 1">
      <label for="scope-of-the-company">Сфера деятельности организации</label>
      <input name="scope-of-the-company" id="scope-of-the-company" v-model="user.work_sphere"/>
    </div>
    <div class="columns four">
      <label for="monthly-income">Ежемесячный доход</label>
      <input name="monthly-income" id="monthly-income" v-model="user.profit_month"/>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'user-work-infromation',
    data: function () {
      return {
        user: {
          work_vid: '',
          work_sphere: '',
          profit_month: ''
        }
      }
    },
    watch: {
      user: {
        handler: function () {
          this.$emit('inputUserWorkInformation', this.user)
        },
        deep: true
      }
    }
  }
</script>

<style scoped>

</style>
