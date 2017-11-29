<template>
    <div v-if="$store.state.authorized" class="desktop-menu">
        <div class="center">
            <a href="/" class="logotype"></a>
            <button>Погасить займ</button>
        </div>
        <div class="menu">
            <a href="#" class="loan active">Мой займ</a></li>
            <a href="#" class="personal-data">Моя анкета</a></li>
            <a href="#" class="my-accounts">Мои счета</a>
            <a href="#" class="my-bonus">Бонусные рубли</a>
            <a href="#" class="loan-history">История займов</a>
            <a href="#" class="services">Услуги</a>
            <hr/>
            <a @click="logout" class="exit">Выход</a>
        </div>
    </div>
</template>

<script>
  import auth from '../auth'

  export default {
    methods: {
      logout: function () {
        auth.logout()
        this.$router.go('/')
      }
    }
  }
</script>

<style lang="sass">
    .lk-header
        width: 100%
        padding: 65px 0 50px 0
        box-sizing: border-box
        .container
            max-width: 1320px

        .a-image
            max-width: 100%
            height: auto

        .desktop-menu
            display: inline-block
            width: 380px
            margin: 0 0 0 -380px
            position: absolute
            padding: 40px 0 0
            left: 380px
            float: left
            z-index: 2
            button
                margin-bottom: 60px
            .menu
                a
                    display: block
                    text-decoration: none
                    font-size: 16px
                    font-weight: 500
                    color: #323c47
                    position: relative
                    padding: 20px 50px 20px 100px
                    margin: 0
                    background: no-repeat 65px 20px
                    .active &:hover
                .loan
                    background-image: url("/static/img/head/desktop-menu/loan.png")
                .personal-data
                    background-image: url("/static/img/head/desktop-menu/personal-data.png")
                .my-accounts
                    background-image: url("/static/img/head/desktop-menu/accounts.png")
                .my-bonus
                    background-image: url("/static/img/head/desktop-menu/bonus.png")
                .loan-history
                    background-image: url("/static/img/head/desktop-menu/history.png")
                .services
                    background-image: url("/static/img/head/desktop-menu/services.png")
                .bell
                    background-image: url("/static/img/head/desktop-menu/bell.png")
                .exit
                    background-image: url("/static/img/head/desktop-menu/exit.png")

</style>