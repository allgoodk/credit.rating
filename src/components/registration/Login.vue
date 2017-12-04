<template>
  <div class="content">
    <form v-on:submit.prevent="requestVerificationCode">
      <div class="row">
        <div class="columns three"></div>
        <div class="columns six">
          <div>
            <div>Ваш мобильный телефон</div>
            <masked-input id="mobile_phone"
                          v-model="user.mobile_phone"
                          @blur="$v.user.mobile_phone.$touch"
                          :mask="['8','(', /[9]/, /\d/, /\d/, ')',/\d/, /\d/, /\d/, '-', /\d/, /\d/,  '-', /\d/, /\d/]"
                          placeholder="8(___) ___-__-__"></masked-input>
            <p v-if="errors.phoneNumber" class="red">Проверьте корректность ввода номера</p>
            <span class="red" v-if="!$v.user.mobile_phone.required&&$v.user.mobile_phone.$error">Обязательное поле</span>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="columns three"></div>
        <div class="columns six">
          <div>
            <div>Фамилия</div>
            <input name="last_name" id="last_name"
                   v-model="user.last_name"
                   @blur="$v.user.last_name.$touch"
            />
            <p v-if="errors.last_name" class="red">Проверьте корректность ввода фамилии</p>
            <span class="red" v-if="!$v.user.last_name.required&&$v.user.last_name.$error">Обязательное поле</span>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="columns three"></div>
        <div class="columns six">
          <div>
            <div>Имя</div>
            <input name="first_name" id="first_name"
                   v-model="user.first_name"
                   @blur="$v.user.first_name.$touch"
            >
            <p v-if="errors.first_name" class="red">Проверьте корректность ввода имени</p>
            <span class="red" v-if="!$v.user.first_name.required&&$v.user.first_name.$error">Обязательное поле</span>

          </div>
        </div>
      </div>
      <div class="row">
        <div class="columns three"></div>
        <div class="columns six">
          <div>
            <div>Отчество</div>
            <input name="middle_name" id="middle_name" placeholder="" value=""
                   v-model="user.middle_name"
                   @blur="$v.user.middle_name.$touch"
            >
            <p v-if="errors.middle_name" class="red">Проверьте корректность ввода отчества</p>
            <span class="red" v-if="!$v.user.middle_name.required&&$v.user.middle_name.$error">Обязательное поле</span>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="columns three"></div>
        <div class="columns six">
          <div>Электронная почта</div>
          <input name="email" id="email" autocomplete="off"
                 v-model.trim="user.email"
                 @blur="$v.user.email.$touch"
          >
          <span class="red" v-if="!$v.user.email.required&&$v.user.email.$error">Обязательное поле</span>
          <span class="red" v-if="!$v.user.email.email">Убедитесь в корректности ввода email</span>
        </div>
      </div>
      <div class="row marg-b-10" id="buttonStepBlock" v-if="!codeRequested">
        <div class="column center">
          <button id="buttonStep" class="green button-img check-mark has-spinner">Продолжить</button>
        </div>
      </div>
    </form>
    <div v-if="codeRequested">
      <div class="row">
        <div class="column h-block"><h3>Подтверждение номера телефона</h3></div>
      </div>
      <div class="row">
        <div class="column center">
          <p>Мы отправили вам код подтверждения на номер: <strong>{{ user.mobile_phone}}</strong> [ <a
            @click="codeRequested=!codeRequested" class="dashed">изменить</a> ]</p>
        </div>
      </div>
      <div class="row">
        <div class="columns three"></div>
        <div class="columns six center">
          <div>
            <input name="password" id="password" placeholder="" type="password" v-model="verificationCode">
            <div>Код из СМС</div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="column center">
          <p><a href="#" class="dashed gray">Запросить код повторно</a> можно будет через <strong>45</strong>
            секунд.</p>
        </div>
      </div>
      <div class="row">
        <div class="center checkbox">
          <input type="checkbox" name="registration-address" id="registration-address" v-model="agree"/>
          <label for="registration-address"><span></span>Я ознакомлен(а) и принимаю <a href="#"
                                                                                       class="dashed gray">правила
            обработки личной информации</a></label>

        </div>
      </div>
      <div class="row marg-b-10">
        <div class="column center">
          <button class="green button-img check-mark" :disabled="!(agree && verificationCode.length >= 4)"
                  @submit="verifySms">
            Продолжить
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import MaskedInput from 'vue-text-mask'
  import { required, email } from 'vuelidate/lib/validators'

  export default {
    components: {MaskedInput},
    data: function () {
      return {
        user: {},
        hash: '',
        codeRequested: false,
        agree: false,
        verificationCode: '',
        smsType: '',
        errors: {
        }
      }
    },
    validations: {
      user: {
        email: {
          required,
          email
        },
        last_name: {
          required
        },
        first_name: {
          required
        },
        middle_name: {
          required
        },
        mobile_phone: {
          required
        }
      }
    },
    methods: {
      requestVerificationCode: function () {
        const requestData = {
          phoneNumber: this.user.mobile_phone
        }
        this.$emit('requestVerificationCode')
        this.$http.post(`phoneVerification/send`, JSON.stringify(requestData))
          .then(response => {
            this.$store.commit('setUserValues', this.user)
            this.hash = response.body.hash
            this.smsType = response.body.mode
            this.codeRequested = true
          })
          .catch((error) => {
            this.errors = {...this.errors, ...error.body.errors.detail}
            console.log((this.errors.phoneNumber))
          })
      },
      verifySms: function () {
        const postData = {
          phoneNumber: this.user.mobile_phone,
          code: this.verificationCode,
          sms_type: this.smsType,
          hash: this.hash
        }
        this.$http.post('phoneVerification/verify', postData)
          .then(response => {
            // обработка
            if (response['user-have-loans']) {
              console.log('здесь будем отправлять на авторизацию в лк')
            }
            if (response['user-have-craitings']) {
              console.log('здесь делаем логику если пользователь вернулся за кредитным рейтингом')
            }
            this.$store.commit('setAuthorized')
            this.$router.push('Questionnaire')
          })
          .catch(err => console.log(err))
      }
    }
  }
</script>
