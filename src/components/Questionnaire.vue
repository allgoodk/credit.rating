<template>
    <div class="content">
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

            <div class="row">
                <div class="column h-block-l"><h3>Паспортные данные</h3></div>
            </div>
            <div class="row">
                <div class="columns four">
                    <label for="serie-and-number">Серия+Номер</label>
                    <masked-input :mask="[/\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/ , /\d/, /\d/, /\d/ ]"
                                  name="serie-and-number" id="serie-and-number" v-model="seriesNumber"/>
                </div>
                <div class="columns four">
                    <label for="division-code">Код подразделения</label>
                    <masked-input id="division-code" v-model="user.p_code"
                                  :mask="[/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/ ]"
                                  placeholder="___-___"></masked-input>
                </div>
                <div class="columns four">
                    <label for="date-of-issue">Дата выдачи</label>
                    <date-picker name="date-of-issue" id="date-of-issue" v-model="user.p_date" format="dd.MM.yyyy"/>
                </div>
            </div>
            <div class="row">
                <div class="columns four">
                </div>
                <div class="columns eight">
                    <label for="issued-by">Кем выдан</label>
                    <input name="issued-by" id="issued-by" v-model="user.p_from"/>
                </div>
            </div>

            <div class="row">
                <div class="column h-block-l"><h3>Информация о работе и доходе</h3></div>
            </div>
            <div class="row">
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
                    <label for="strange-computer"><span></span>Я даю согласие на <a href="#" class="dashed gray">обработку и хранение</a>
                        моих персональных данных</label>
                </div>
            </div>
            <div class="row marg-b-10">
                <div class="column center">
                    <button class="green button-img check-mark" @click="goToPay" :disabled="!agree">Перейти к оплате
                    </button>
                </div>
            </div>
            <div class="row marg-b-10">
            </div>
        </div>
    </div>
</template>
<script>
  import MaskedInput from 'vue-text-mask'
  import config from '../config/index'
  import DatePicker from 'vuejs-datepicker'
  import Dadata from '../utils/Dadata'

  export default {
    components: {
      Dadata,
      MaskedInput,
      DatePicker
    },
    data: function () {
      return {
        user: {
          city: '',
          last_name: '',
          first_name: '',
          middle_name: '',
          male: '',
          p_number: '',
          p_serie: '',
          p_from: '',
          p_code: '',
          p_date: '',
          obr: '',
          profit_month: '',
          from_where: '',
          mobile_phone: '',
          work_sphere: '',
          work_vid: ''
        },
        errors: {},
        agree: false
      }
    },
    computed: {
      seriesNumber: {
        get: function () {
          return this.user.p_serie + ' ' + this.user.p_number
        },
        set: function (value) {
          const trimmedValue = value.replace(/\s/g, '')
          this.user.p_serie = trimmedValue.slice(0, 4)
          this.user.p_number = trimmedValue.slice(4, 10)
        }
      }
    },
    watch: {
      'user.p_code': function (value) {
        const trimValue = value.replace(/_/g, '')
        if (trimValue.length === 7) {
          this.getPFrom()
        }
      }
    },
    methods: {
      getPFrom: function () {
        this.$http.get(
          config.OLD_API + '/passport?action=get&code=' + this.user.p_code,
        ).then(response => {
          this.user.p_from = response.body.data.title
        }).catch((error) => console.log(error))
      },
      goToPay: function () {
        const creds = this._.pickBy(this.user, (property, propertyName) => property !== '')
        this.$http.post('shop/createuser', creds)
          .then(response => console.log(response.body))
          .catch(() => console.log(config.API)
          )
      },
      setUserValues: function (values) {
        console.log('house obj', values)
        this.user = {...this.user, ...values}
      }
    }
  }
</script>

<style scoped lang="sass">
    .error
        margin-top: -10px
        color: red
        h1
            text-align: center

            .wrapper-20
                background-color: #f7f6f6
                height: 20px

            .center
                text-align: center
</style>
