<template>
    <div class="content-block">
        <div class="container">
            <div class="margin-top-50"></div>
            <div class="row">
                <div class="columns nine">
                    <div class="content">
                        <h3 class="main-header">Оформление займа</h3>
                        <div class="white-block">
                            <div class="padding">
                                <h3>Заявление на предоставление микрозайма</h3>
                            </div>
                            <hr/>
                            <div class="padding">
                                <div class="range-slider">
                                    <div class="row">
                                        <div class="columns six">
                                            <div class="upper-header">Сумма займа:</div>
                                            <div class="row upper-text">
                                                <div class="columns seven big">
                                                    15 000.00 &#8381;
                                                </div>
                                                <div class="columns five small">
                                                    К возврату:
                                                    <strong>1 135.00 &#8381;</strong>
                                                </div>
                                            </div>
                                            <div class="slider">
                                                <div class="color" style="width: 50%;"></div>
                                                <div class="bumper"></div>
                                            </div>
                                            <div class="row">
                                                <div class="column liner"></div>
                                            </div>
                                            <div class="row range">
                                                <div class="columns six">
                                                    10 000
                                                </div>
                                                <div class="columns six right">
                                                    15 000
                                                </div>
                                            </div>
                                            <!--<div class="bottom-text">
                                                от 1 000 до 15 000 рублей
                                            </div>-->
                                        </div>
                                        <div class="columns six">
                                            <div class="upper-header">Срок возврата:</div>
                                            <div class="row upper-text">
                                                <div class="columns seven big">
                                                    15 дней
                                                </div>
                                                <div class="columns five small">
                                                    Дата возврата:
                                                    <strong>12 октября 2017</strong>
                                                </div>
                                            </div>
                                            <div class="slider">
                                                <div class="color" style="width: 25%;"></div>
                                                <div class="bumper"></div>
                                            </div>
                                            <div class="row">
                                                <div class="column liner"></div>
                                            </div>
                                            <div class="row range">
                                                <div class="columns six">
                                                    5
                                                </div>
                                                <div class="columns six right">
                                                    30
                                                </div>
                                            </div>
                                            <!--<div class="bottom-text">
                                                от 5 до 30 дней
                                            </div>-->
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="columns six">
                                        <label for="security-question">Контрольный вопрос</label>
                                        <select id="security-question" class="selector">
                                            <option value=""></option>
                                            <option value="1">Кличка домашнего животного</option>
                                            <option value="2" selected="true">Девичья фамилия матери</option>
                                            <option value="3">Свой вопрос</option>
                                        </select>
                                    </div>
                                    <div class="columns six">
                                        <!-- Это поле выводим после того, как юзер что-то выбрал в селекторе-->
                                        <label for="security-question-input">Ответ</label>
                                        <input type="text" name="security-question-input" id="security-question-input"
                                               placeholder="" value=""/>
                                    </div>
                                </div>
                                <div class="row hidden"> <!-- Этот блок выводим, если он выбрал вариант "Свой вопрос"-->
                                    <div class="columns six">
                                        <label for="security-question-own">Введите свой вопрос</label>
                                        <input type="text" name="security-question-own" id="security-question-own"
                                               placeholder="" value=""/>
                                    </div>
                                    <div class="columns six">
                                        <label for="security-question-own-input">Ответ</label>
                                        <input type="text" name="security-question-own-input"
                                               id="security-question-own-input" placeholder="" value=""/>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="columns six">
                                        <button class="blue negative-margin">Сохранить</button>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="columns six">
                                        <label for="choose-method">Способ получения</label>
                                        <select id="choose-method" class="selector">
                                            <option value=""></option>
                                            <option value="1" selected="true">4672 - 31** - **** - 1302</option>
                                            <option value="2">4672 - 31** - **** - 1302</option>
                                            <option value="3">4672 - 31** - **** - 1302</option>
                                            <option value="4">4672 - 31** - **** - 1302</option>
                                            <option value="5">Contact (получение наличными)</option>
                                            <option value="6">Яндекс.Деньги</option>
                                            <option value="7">Qiwi</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="column checkbox">
                                        <input type="checkbox" name="agree" id="agree"/>
                                        <label for="agree"><span></span>Я даю согласие на обработку и хранение моих персональных данных, я согласен на запрос и передачу моих персональных данных в бюро кредитных историй, я ознакомлен и согласен с правилами и информацией предоставления займа ООО МФК &laquo;ВЭББАНКИР&raquo;, я подтверждаю, что указанные мной мои данные в заявлении на предоставление микрозайма достоверны.</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="column">
                                <button>Продолжить</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="columns three right-block">
                    <div class="personal-percent">
                        <h3>Ваша персональная ставка</h3>
                        <hr/>
                        <div class="tachometer t12">
                            <span>1.1%</span><br/>
                            в день*
                        </div>
                        <div class="big">14 займов до<br/> минимальной ставки**</div>
                        <div class="gray">*  Персональная ставка 693.5% в год</div>
                        <div class="gray">** Минимальная ставка 438% в год</div>
                    </div>
                    <div class="warning">
                        <div class="close"></div>
                        <h3>Внимание!</h3>
                        <hr/>
                        <p>Корректировка данных возможна только при заполнении заявки на новый займ </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    mounted: () => console.log(1111)
  }
</script>