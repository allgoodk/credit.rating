<template>
    <div class="container">
        <form v-on:submit.prevent="sendToApi">
            <hr>
            <label><b>last name</b></label>
            <input id="last_name" name="last_name" type="text" v-model="user.last_name"/>
            <p v-if="errors.last_name" class="error">{{ errors.last_name }}</p>

            <label><b>first_name</b></label>
            <input id="first_name" name="last_name" type="text" v-model="user.first_name">
            <p v-if="errors.first_name" class="error">{{ errors.first_name }}</p>
            <label>middle_name</label>
            <input type="text" v-model="user.middle_name">
            <p v-if="errors.middle_name" class="error">{{ errors.middle_name }}</p>

            <label>p_number</label>
            <input type="text" v-model="user.p_number">
            <p v-if="errors.p_number" class="error">{{ errors.p_number }}</p>

            <label>p_serie</label>
            <input type="text" v-model="user.p_serie">
            <p v-if="errors.p_serie" class="error">{{ errors.p_serie }}</p>

            <label>p_from</label>
            <input type="text" v-model="user.p_from">
            <p v-if="errors.p_from" class="error">{{ errors.p_from }}</p>

            <label>p_code</label>
            <input type="text" v-model="user.p_code">
            <p v-if="errors.p_code" class="error">{{ errors.p_code }}</p>

            <label>p_date</label>
            <input type="text" v-model="user.p_date">
            <p v-if="errors.p_date" class="error">{{ errors.p_date }}</p>

            <label>a_reg_subject</label>
            <input type="text" v-model="user.a_reg_subject">
            <p v-if="errors.a_reg_subject" class="error">{{ errors.a_reg_subject }}</p>

            <label>a_reg_city</label>
            <input type="text" v-model="user.a_reg_city">
            <p v-if="errors.a_reg_city" class="error">{{ errors.a_reg_city }}</p>

            <label>work_subject</label>
            <input type="text" v-model="user.work_subject">
            <p v-if="errors.work_subject" class="error">{{ errors.work_subject }}</p>

            <label>mobile_phone</label>
            <input type="text" v-model="user.mobile_phone">
            <p v-if="errors.mobile_phone" class="error">{{ errors.mobile_phone }}</p>

            <label>email</label>
            <input type="text" v-model="user.email">
            <p v-if="errors.email" class="error">{{ errors.email }}</p>

            <label>phone_check</label>
            <input type="text" v-model="user.phone_check">
            <p v-if="errors.phone_check" class="error">{{ errors.phone_check }}</p>

            <label>a_reg_index</label>
            <input type="text" v-model="user.a_reg_index">
            <p v-if="errors.a_reg_index" class="error">{{ errors.a_reg_index }}</p>

            <button>send to api</button>
        </form>
    </div>
</template>
<script>
  export default {
    data: function () {
      return {
        user: {
          last_name: '',
          first_name: '',
          middle_name: '',
          p_number: '',
          p_serie: '',
          p_from: '',
          p_code: '',
          p_date: '',
          a_reg_subject: '',
          a_reg_city: '',
          work_subject: '',
          mobile_phone: '',
          a_reg_index: '',
          phone_check: '',
          email: '',
          id: 1
        },
        errors: {}
      }
    },
    methods: {
      sendToApi: function () {
        const creds = this._.pickBy(this.user, (property, propertyName) => { return property !== '' })
        console.log(creds)
        this.$http.post('http://webbankir.zend/shop/createuser', creds).then(response => {
          console.log(response.body)
          this.errors = response.body.errors ? response.body.errors : ''
        })
          .catch(error => console.log(error))
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