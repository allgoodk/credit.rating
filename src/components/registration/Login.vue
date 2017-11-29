<template>
    <div class="content">
        <form v-on:submit.prevent="getVerificationSms">
            <div class="row">
                <div class="columns three"></div>
                <div class="columns six">
                    <div>
                        <div>Ваш мобильный телефон</div>
                        <masked-input id="tr_mobile_phone" v-model="user.mobilePhone"
                                      :mask="['8','(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]" placeholder="8(___) ___-____"></masked-input>
                        <p></p>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="columns three"></div>
                <div class="columns six">
                    <div>
                        <div>Фамилия</div>
                        <input name="tr_last_name" id="tr_last_name" placeholder="" value="" v-model="user.lastName"
                        >
                        <p style=""></p>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="columns three"></div>
                <div class="columns six">
                    <div>
                        <div>Имя</div>
                        <input name="tr_first_name" id="tr_first_name" placeholder="" value="" v-model="user.firstName"
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
                               v-model="user.middleName"
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
            <div class="row marg-b-10" id="buttonStepBlock">
                <div class="column center">
                    <button id="buttonStep" class="green button-img check-mark has-spinner">Продолжить</button>
                </div>
            </div>

        </form>
    </div>
</template>

<script>
  import MaskedInput from 'vue-text-mask'

  export default {
    components: {MaskedInput},
    data: function () {
      return {
        user: {
          mobilePhone: '',
          lastName: '',
          firstName: '',
          middleName: '',
          email: ''
        }
      }
    },
    methods: {
      register: function () {

      },
      getVerificationSms: function () {
        console.log(this.user)
      }
    }
  }
</script>