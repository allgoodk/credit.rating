<template>
    <div>
        <div class="wrapper-20"></div>
        <div class="container">
            <form method="post" id="auth_form" v-on:submit.prevent="doLogin">
                <div class="row">
                    <div class="column">
                        <h1>Авторизация</h1>
                    </div>
                </div>
                <div class="row">
                    <div class="columns three"></div>
                    <div class="columns six">
                        <label for="login">Мобильный телефон, логин или почта</label>
                        <input v-model="user.username" id="login" type="text" placeholder="" class="big">
                    </div>
                </div>
                <div class="row">
                    <div class="columns three"></div>
                    <div class="columns six">
                        <label for="password">Пароль</label>
                        <input v-model="user.password" id="password" type="password" placeholder="" class="big"
                               value="">
                    </div>
                    <div class="columns three"></div>
                </div>
                <div class="row">
                    <div class="columns three"></div>
                    <div class="columns six checkbox">
                        <input type="checkbox" name="strange-computer" value="1" id="strange-computer">
                        <label for="strange-computer"><span></span>Чужой компьютер</label>
                    </div>
                    <div class="columns three"></div>
                </div>
                <div class="row">
                    <div class="columns three"></div>
                    <div class="columns six center">
                        <button id="auth-button">Войти</button>
                        <br>
                        <p>
                            <em>
                                Забыли логин или пароль? <a href="#" onclick="" class="gray dashed-rarr"><span>Восстановить</span></a>
                                <br>
                                Впервые на Webbankir? <a href="#" onclick="" class="gray dashed-rarr"><span>Получить деньги</span></a>
                            </em>
                        </p>
                    </div>
                    <div class="columns three"></div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
  import auth from '../auth'

  export default {
    data () {
      return {
        user: {
          login: '',
          password: ''
        },
        error: ''
      }
    },
    mounted: function () {
      console.log(' я родился')
      if (this.$store.getAuthorized) {
        console.log('1111')
        this.$router.go('/credit')
      }
    },
    methods: {
      doLogin: function () {
        const creds = {
          login: this.user.username,
          password: this.user.password
        }
        auth.login(this, creds, 'credit')
      }
    }
  }
</script>

<style scoped lang="sass">
    h1
        text-align: center

        .wrapper-20
            background-color: #f7f6f6
            height: 20px

        .center
            text-align: center
</style>