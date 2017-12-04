<template>
  <form v-on:submit.prevent="goToPay">
    <div class="container content-wrapper-20">
      <div class="row">
        <div class="columns eight">
        </div>
      </div>
    </div>
    <div class="container credit-history-form ">
      <div class="row">
        <div class="column h-block"><h3>Кредитный рейтинг</h3></div>
      </div>
      <div class="row">
        <div class="column h-block-l"><h3>Личные данные</h3></div>
      </div>
      <user-personal-information @inputUserPersonalInformation="setUserValues"></user-personal-information>
      <div class="row">
        <div class="column h-block-l"><h3>Паспортные данные</h3></div>
      </div>
      <user-passport-data @inputUserPassportData="setUserValues"></user-passport-data>
      <div class="row">
        <div class="column h-block-l"><h3>Информация о работе и доходе</h3></div>
      </div>
      <div class="row">
        <user-work-information @inputUserWorkInformation="setUserValues"></user-work-information>
      </div>
      <div class="row">
        <div class="column h-block-l"><h3>Адрес регистрации</h3></div>
      </div>
      <dadata prefix="a_reg_" @selectAddress="setUserValues">
      </dadata>
      <div class="row">
        <div class="column h-block-l"><h3>Дополнительно</h3></div>
      </div>
      <div class="row marg-b-10">
        <div class="columns four">
          <label for="education">Образование</label>
          <input name="education" id="education" v-model="user.obr"/>
        </div>
        <div class="columns four">
          <label for="information-source">Откуда вы о нас узнали?</label>
          <input name="information-source" id="information-source" v-model="user.from_where"/>
        </div>
      </div>
      <div class="row marg-b-10">
        <div class="column center checkbox">
          <input type="checkbox" id="strange-computer" value="male" v-model="agree"/>
          <label for="strange-computer"><span></span>Я даю согласие на <a href="#" class="dashed gray">обработку и
            хранение</a>
            моих персональных данных</label>
        </div>
      </div>
      <div class="row marg-b-10">
        <div class="column center">
          <button class="green button-img check-mark" :disabled="!agree">Перейти к оплате
          </button>
        </div>
      </div>
      <div class="row marg-b-10">
      </div>
    </div>
  </form>
</template>
<script>
  import MaskedInput from 'vue-text-mask'
  import DatePicker from 'vuejs-datepicker'
  import Dadata from '../utils/Dadata'
  import UserPassportData from './User/UserPassportData'
  import UserPersonalInformation from './User/UserPersonalInformation'
  import UserWorkInformation from './User/UserWorkInfromation'

  export default {
    components: {
      UserWorkInformation,
      Dadata,
      UserPersonalInformation,
      MaskedInput,
      DatePicker,
      UserPassportData
    },
    data: function () {
      return {
        user: {},
        errors: {},
        agree: false
      }
    },
    methods: {
      goToPay: function () {
        const creds = this._.pickBy(this.user, (property, propertyName) => property !== '' && property !== null)
        console.log(creds)
        this.$http.post('shop/createuser', creds)
          .then(response => console.log(response.body))
          .catch(() => console.log(creds)
          )
      },
      setUserValues: function (values) {
        this.user = {...this.user, ...values}
      }
    }
  }
</script>

<style scoped lang="sass">
</style>
