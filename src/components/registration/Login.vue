<template>
  <div class="content">
    <form v-on:submit.prevent="getVerificationSms">
      <div class="row">
        <div class="columns three"></div>
        <div class="columns six">
          <div>
            <div>Ваш мобильный телефон</div>
            <masked-input id="tr_mobile_phone" v-model="user.mobile_phone"
                          :mask="['8','(', /[9]/, /\d/, /\d/, ')',/\d/, /\d/, /\d/, '-', /\d/, /\d/,  '-', /\d/, /\d/]"
                          placeholder="8(___) ___-__-__"></masked-input>
            <p></p>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="columns three"></div>
        <div class="columns six">
          <div>
            <div>Фамилия</div>
            <input name="tr_last_name" id="tr_last_name"
                   v-model="user.last_name"
            />
            <p style=""></p>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="columns three"></div>
        <div class="columns six">
          <div>
            <div>Имя</div>
            <input name="tr_first_name" id="tr_first_name" placeholder="" value="" v-model="user.first_name"
            >
            <p style=""></p>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="columns three"></div>
        <div class="columns six">
          <div>
            <div>Отчество</div>
            <input name="tr_middle_name" id="tr_middle_name" placeholder="" value=""
                   v-model="user.middle_name"
            >
            <p style=""></p>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="columns three"></div>
        <div class="columns six">
          <div>Электронная почта</div>
          <input name="tr_email" id="tr_email" placeholder="" value="" autocomplete="off"
                 v-model="user.email">
          <p></p>
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
                  @click="verifySms">
            Продолжить
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import MaskedInput from 'vue-text-mask'

  export default {
    components: {MaskedInput},
    data: function () {
      return {
        user: {},
        hash: '',
        codeRequested: false,
        agree: false,
        verificationCode: '',
        smsType: ''
      }
    },
    methods: {
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
            this.$router.push('questionnaire')
          })
          .catch(err => console.log(err))
      },
      getVerificationSms: function () {
        const requestData = {
          phoneNumber: this.user.mobile_phone
        }
        this.$http.post(`phoneVerification/send`, JSON.stringify(requestData))
          .then(response => {
            this.$store.commit('setUserValues', this.user)
            this.hash = response.body.hash
            this.smsType = response.body.mode
            this.codeRequested = true
          })
          .catch((error) => console.log(error))
      }
    }
  }
</script>
