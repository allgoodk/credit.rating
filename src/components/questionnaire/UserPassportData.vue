<template>
  <div>
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
  </div>
</template>

<script>
  import MaskedInput from 'vue-text-mask'
  import DatePicker from 'vuejs-datepicker'

  export default {
    name: 'user-passport-data',
    components: {
      MaskedInput,
      DatePicker
    },
    data: function () {
      return {
        user: {
          p_date: '',
          p_code: '',
          p_serie: '',
          p_number: '',
          p_from: ''
        }
      }
    },
    watch: {
      'user.p_code': function (value) {
        const trimValue = value.replace(/_/g, '')
        if (trimValue.length === 7) {
          this.getPFrom()
        }
      },
      user: {
        handler: function () {
          this.$emit('inputUserPassportData', this.user)
        },
        deep: true
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
    methods: {
      getPFrom: function () {
        const code = {
          code: this.user.p_code
        }
        this.$http.post('suggest/passportcode', code)
          .then(response => {
            this.user.p_from = response.body.data.title
            console.log(this.user.p_from)
          }).catch((error) => console.log(error))
      }
    }
  }
</script>

<style scoped>

</style>
