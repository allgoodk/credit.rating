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
                <div class="column bread-crumbs">
                    <a href="#">Главная</a>
                    &rarr;
                    Кредитный рейтинг
                </div>
            </div>
            <div class="row navigation">
                <div class="column">
                    <a href="#" class="nav-item nav1 success">Заполнение анкеты</a>
                    <span class="nav-item nav2 active">Оплата</span>
                    <span class="nav-item nav3">Кредитный рейтинг</span>
                </div>
            </div>
            <div class="row">
                <div class="column h-block-l"><h3>Личные данные</h3></div>
            </div>
            <div class="row">
                <div class="columns four">
                    <label for="surname">Фамилия</label>
                    <input name="surname" id="surname" type="text" placeholder=""/>
                </div>
                <div class="columns four">
                    <label for="name">Имя</label>
                    <input name="name" id="name" type="text" placeholder=""/>
                </div>
                <div class="columns four">
                    <label for="patronymic">Отчество</label>
                    <input name="patronymic" id="patronymic" type="text" placeholder=""/>
                </div>
            </div>
            <div class="row">
                <div class="columns four">
                    <label for="birthday">Дата рождения</label>
                    <input name="birthday" id="birthday" type="text" placeholder=""/>
                </div>
                <div class="columns four checkbox">
                    <span class="label">Пол</span>
                    <input type="radio" name="gender" id="gender-male"/>
                    <label for="gender-male"><span></span>мужчина</label>
                    <input type="radio" name="gender" id="gender-female"/>
                    <label for="gender-female"><span></span>женщина</label>
                </div>
            </div>

            <div class="row">
                <div class="column h-block-l"><h3>Паспортные данные</h3></div>
            </div>
            <div class="row">
                <div class="columns four">
                    <label for="serie-and-number">Серия+Номер</label>
                    <input name="serie-and-number" id="serie-and-number" type="text" placeholder=""/>
                </div>
                <div class="columns four">
                    <label for="division-code">Код подразделения</label>
                    <input name="division-code" id="division-code" type="text" placeholder=""/>
                </div>
                <div class="columns four">
                    <label for="date-of-issue">Дата выдачи</label>
                    <input name="date-of-issue" id="date-of-issue" type="text" placeholder=""/>
                </div>
            </div>
            <div class="row">
                <div class="columns four">
                </div>
                <div class="columns eight">
                    <label for="issued-by">Кем выдан</label>
                    <input name="issued-by" id="issued-by" type="text" placeholder=""/>
                </div>
            </div>

            <div class="row">
                <div class="column h-block-l"><h3>Информация о работе и доходе</h3></div>
            </div>
            <div class="row">
                <div class="columns four">
                    <label>Вид занятости</label>
                    <select data-placeholder="&nbsp;" class="selector-block">
                        <option value="">&nbsp;</option>
                        <option value="1">Наемный сотрудник</option>
                        <option value="2">Индивидуальный предприниматель</option>
                        <option value="3">Учредитель/участник ООО</option>
                        <option value="4">Пенсионер</option>
                        <option value="5">Студент</option>
                        <option value="6">Безработный</option>
                    </select>
                </div>
                <div class="columns four">
                    <label for="scope-of-the-company">Сфера деятельности организации</label>
                    <input name="scope-of-the-company" id="scope-of-the-company" type="text" placeholder=""/>
                </div>
                <div class="columns four">
                    <label for="monthly-income">Ежемесячный доход</label>
                    <input name="monthly-income" id="monthly-income" type="text" placeholder=""/>
                </div>
            </div>

            <div class="row">
                <div class="column h-block-l"><h3>Дополнительно</h3></div>
            </div>
            <div class="row marg-b-10">
                <div class="columns four">
                    <label for="SNILS">СНИЛС</label>
                    <input name="SNILS" id="SNILS" type="text" placeholder=""/>
                </div>
                <div class="columns four">
                    <label for="education">Образование</label>
                    <input name="education" id="education" type="text" placeholder=""/>
                </div>
                <div class="columns four">
                    <label for="information-source">Откуда вы о нас узнали?</label>
                    <input name="information-source" id="information-source" type="text" placeholder=""/>
                </div>
            </div>

            <div class="row marg-b-10">
                <div class="column center checkbox">
                    <input type="checkbox" name="strange-computer" value="male" id="strange-computer"/>
                    <label for="strange-computer"><span></span>Я даю согласие на <a href="#" class="dashed gray">обработку и хранение</a> моих персональных данных</label>
                </div>
            </div>

            <div class="row marg-b-10">
                <div class="column center">
                    <button class="green button-img check-mark">Перейти к оплате</button>
                </div>
            </div>


        </div>
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