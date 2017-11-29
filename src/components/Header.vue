<template>
    <div class="lk-header" xmlns="http://www.w3.org/1999/html">
        <div class="container">
            <div class="row logo-button">
                <div class="columns four">
                    <a href="/"><img src="/static/img/head/logo.png" alt="" class="a-image h-logo"></a>
                </div>
            </div>
            <div class="row">
            </div>
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
        background: #333333
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