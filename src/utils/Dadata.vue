<template>
    <div class="row form-field " data="form-error">
        <span class="float-label-container">
           <div class="floating-label" :class="[keyword !== '' ? 'focus' : '']">Район, населенный пункт, улица
           </div>
           <input v-model="keyword" class="big form-control" autocomplete=off
                  @input="onInput($event.target.value)"
                  :name="prefix + 'subject_district_city_street'"
                  :id="prefix + 'subject_district_city_street'"
                  @keyup.esc="isOpen = false"
                  @blur="isOpen = false"
                  @keydown.down="moveDown"
                  @keydown.up="moveUp"
                  @keydown.enter.prevent="select"
           >
<p class="hidden" style=""></p>
<ul v-show="isOpen" class="options-list">
<li v-for="(option, index) in streetOptions" :class="{'highlighted': index === selectedItem}"
    @mouseenter="selectedItem = index" @mousedown="select"> {{ option.value}}
<slot name="item"
      :title="option.value"></slot>
 </li>
</ul>
</span>

        <div class="row hidden">
            <input :id="prefix + 'geo_lat'" :name="prefix + 'geo_lat'" type="hidden" v-model="geo_lat"
                   value="">
            <input :id="prefix + 'geo_lon'" :name="prefix + 'geo_lon'" type="hidden" v-model="geo_lon"
                   value="">
            <input :id="prefix + 'geo_qc'" :name="prefix + 'geo_qc'" type="hidden" v-model="geo_qc"
                   value="">
            <input :id="prefix + 'subject_value'" :name="prefix + 'subject_value'" type="hidden"
                   v-model="subject_value" value="">
            <input :id="prefix + 'subject_guid'" :name="prefix + 'subject_guid'" type="hidden"
                   v-model="subject_guid" value="">
            <input :id="prefix + 'district'" :name="prefix + 'district'" type="hidden" v-model="district"
                   value="">
            <input :id="prefix + 'district_value'" :name="prefix +'district_value'" type="hidden"
                   v-model="district_value" value="">
            <input :id="prefix + 'district_guid'" :name="prefix +'district_guid'" type="hidden"
                   v-model="district_guid" value="">
            <input :id="prefix + 'city'" :name="prefix + 'city'" type="hidden" v-model="city" value="">
            <input :id="prefix +'city_value'" :name="prefix +'city_value'" type="hidden"
                   v-model="city_value" value="">
            <input :id="prefix + 'city_guid'" :name="prefix + 'city_guid'" type="hidden" v-model="city_guid"
                   value="">
            <input :id="prefix +'subject'" :name="prefix +'subject'" type="hidden" v-model="subject"
                   value="">
            <input :id="prefix +'city2'" :name="prefix +'city2'" type="hidden" v-model="city2" value="">
            <input :id="prefix + 'city2_value'" :name="prefix + 'city2_value'" type="hidden"
                   v-model="city2_value" value="">
            <input :id="prefix +'city2_guid'" :name="prefix +'city2_guid'" type="hidden"
                   v-model="city2_guid" value="">
            <input :id="prefix +'street'" :name="prefix +'street'" type="hidden" v-model="street" value="">
            <input :id="prefix +'street_guid'" :name="prefix +'street_guid'" type="hidden"
                   v-model="street_guid" value="">
            <input :id="prefix +'street_value'" :name="prefix +'street_value'" type="hidden"
                   v-model="street_value" value="">
            <input :id="prefix + 'house_value'" :name="prefix + 'house_value'" type="hidden"
                   autocomplete=off                         v-model="house_value" value="">
            <input :id="prefix +'house_guid'" :name="prefix + 'house_guid'" type="hidden"
                   v-model="house_guid" value="">
        </div>
        <div v-if="street == null || street == 'wb_not_street'" id="empty_street_checkbox" class="row checkbox">
            <input type="checkbox" id="noStreet"
                   v-model="noStreet"
                   name="empty_street_checkbox">
            <label for="noStreet"
                   class="">
                <span></span>
                Я подтверждаю, что по моему адресу регистрации
                <strong class="red">отсутствует улица</strong>.
            </label>
        </div>
        <div class="row">
            <div class="columns twelwe  street-text-block" id="street_block">
                <p><strong class="red">Внимание!</strong>
                    <br>1. Начните вводить адрес и выберите из списка.<br>2. В случае, если в вашем населенном пункте (деревне, селе) улица существует, но вы преднамеренно не указали её, по заявке будет отказ!
                </p>
            </div>
        </div>
        <div class="row">
            <div class="columns four relative" data="form-error">
                <div class="form-field">
                         <span class="float-label-container">
              <div class="floating-label" :class="[house === '' ? '': 'filled']">Дом</div>
                <input
                        :id="prefix + 'house'"
                        :name="prefix + 'house'"
                        v-model="house"
                        autocomplete=off
                        @input="onInputHouse($event.target.value)"
                     @keyup.esc="isOpenHouse = false"
                @blur="isOpenHouse = false"
                     @keydown.down="moveDownHouse"
                   @keydown.up="moveUpHouse"
                      @keydown.enter.prevent="selectHouse"
                     type="text"
                        class="big form-control"
                      style=" box-sizing: border-box
                         ;"
                  >
                          <p class="hidden" style=""></p>
         <ul v-show="isOpenHouse" class="options-list">
              <li v-for="(house, index) in houseSuggestions" :class="{
                'highlighted': index === selectedItem}" @mouseenter="selectedItem = index"
                  @mousedown="selectHouse"> {{ house}}</li>
     </ul>
   </span>
                </div>
            </div>
            <div class="columns two relative" data="form-error">
                <div class="form-field">
                                        <span class="float-label-container">
                          <div class="floating-label" :class="[index == null ? '': 'filled']">Индекс</div>
                  <input :id="prefix + 'index'" :name="prefix + 'index'" v-model="index" type="text"
                         class="big form-control" value="">
                          <p class="hidden"></p>
                       </span>
                </div>
            </div>
            <div class="columns two dispensable" data="form-error">
                <div class="form-field">
               <span class="float-label-container">
                            <div class="floating-label" :class="[corpus == '' ? '': 'filled']">Корпус</div>
                            <input :id="prefix+'corpus'" :name="prefix+'corpus'" v-model="corpus" type="text"
                                   class="big form-control" tabindex="14" value="">
                            <p class="hidden" style=""></p>
                        </span>
                </div>
            </div>
            <div class="columns two dispensable" data="form-error">
                <div class="form-field">
                                        <span class="float-label-container">
                            <div class="floating-label" :style="[stroenie === '' ? '': 'filled']">Строение</div>
                         <input :id="prefix+'stroenie'" :name="prefix+'stroenie'" v-model="stroenie" type="text"
                                class="big form-control" tabindex="15" value="">
                          <p class="hidden" style=""></p>
            </span>

                </div>
            </div>
            <div class="columns two" data="form-error">
                <div class="form-field">
                  <span class="float-label-container">
                          <div class="floating-label" :style="[flatnumber == null ? '': 'filled']">Квартира</div>
                          <input :id="prefix + 'flatnumber'" :name="prefix + 'flatnumber'" v-model="flatnumber"
                                 type="text" class="big form-control" value="">
                          <p class="hidden" style=""></p>
                      </span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
  import config from '../config/index'

  export default {
    data () {
      return {
        url: config.API + '/suggest/address',
        keyword: '',
        suggestions: [],
        houseSuggestions: [],
        isOpenHouse: false,
        isOpen: false,
        selectedItem: 0,
        rowCount: 5,
        currentChoice: null,
        geo_qc: '',
        subject: '',
        subject_value: '',
        subject_guid: '',
        geo_lat: '',
        geo_lon: '',
        district: '',
        district_value: '',
        district_guid: '',
        city: '',
        city_guid: '',
        city_value: '',
        city2: '',
        city2_value: '',
        city2_guid: '',
        street: '',
        street_value: '',
        street_guid: '',
        house: '',
        house_value: '',
        house_guid: '',
        index: '',
        flatnumber: '',
        corpus: '',
        stroenie: '',
        subject_district_city_street: '',
        noStreet: false

      }
    },
    computed: {
      streetOptions () {
        return this.suggestions
      }
    },
    props:
      ['prefix'],
    watch: {
      currentChoice: function () {
        try {
          this.geo_lat = this.currentChoice.data.geo_lat ? this.currentChoice.data.geo_lat : null
          this.geo_lon = this.currentChoice.data.geo_lon ? this.currentChoice.data.geo_lon : null
          this.geo_qc = this.currentChoice.data.qc_geo
          this.city = this.city_value = this.currentChoice.data.city
          this.city_guid = this.currentChoice.data.city_fias_id
          this.subject = this.currentChoice.data.region
          this.subject_value = this.currentChoice.data.region_kladr_id.substring(0, 2)
          this.subject_guid = this.currentChoice.data.region_fias_id
          this.district = this.district_value = this.currentChoice.data.area
          this.district_guid = this.currentChoice.data.area_fias_id
          this.city2 = this.city2_value = this.currentChoice.data.settlement
          this.city2_guid = this.currentChoice.data.settlement_fias_id
          this.street = this.street_value = this.currentChoice.data.street
          this.street_guid = this.currentChoice.data.street_fias_id
          this.index = this.currentChoice.data.postal_code
          this.subject_district_city_street = this.currentChoice.data.value
          // заполнение корпуса и строения
          if (this.currentChoice.data.block_type === 'к') {
            const buildingIndex = this.currentChoice.data.block.indexOf(' стр ')
            if (buildingIndex > -1) {
              this.corpus = this.currentChoice.data.block.substring(0, buildingIndex)
              this.stroenie = this.currentChoice.data.block.substring(buildingIndex + 5)
            } else {
              this.corpus = this.currentChoice.data.block
            }
          } else if (this.currentChoice.data.block_type === 'стр' || this.currentChoice.data.block_type === 'сооружение') {
            this.stroenie = this.currentChoice.data.block
          }

          // тащщим странную логику написания поселения в поле город
          if (this.city === null && this.city2 !== null) {
            this.city = this.city_value = this.city2
            this.city_guid = this.city2_guid
            this.city2 = this.city2_guid = this.city2_value = ''
          }
        } catch (e) {
          return
        }
      },
      noStreet: function () {
        if (this.noStreet) {
          this.street = this.street_value = this.street_guid = 'wb_not_street'
        }
      }
    },
    methods: {
      onInput (value) {
        this.selectedItem = 0
        this.isOpen = !!value
        const data = {
          count: this.rowCount,
          query: this.keyword,
          to_bound: {
            value: 'street'
          }
        }
        this.$http.post(this.url, JSON.stringify(data)).then((response) => {
          response = JSON.parse(JSON.stringify(response))
          this.suggestions = response.body.suggestions
        })
      },
      moveDown () {
        if (!this.isOpen && !this.isOpenHouse) {
          return
        }
        this.selectedItem = (this.selectedItem + 1) % this.suggestions.length
        this.suggestions.length > 1 ? this.keyword = (this.suggestions[this.selectedItem].value) : null
      },
      moveUp () {
        if (!this.isOpen && !this.isOpenHouse) {
          return
        }
        this.selectedItem = this.selectedItem - 1 < 0 ? this.suggestions.length - 1 : this.selectedItem - 1
        this.suggestions.length > 1 ? this.keyword = (this.suggestions[this.selectedItem].value) : null
      },
      select () {
        this.isOpen = false
        const query = {
          count: 1,
          query: this.suggestions[this.selectedItem].value,
          to_bound: {
            value: 'street'
          }
        }
        this.suggest(query)
      },
      selectHouse () {
        this.isOpenHouse = false
        this.house = this.house_value = this.suggestions[this.selectedItem].data.house
      },
      onInputHouse (value) {
        this.selectedItem = 0
        if ((this.street === null || this.street === 'wb_not_street') && this.noStreet) {
          this.house = value
          this.street = this.street_guid = this.street_value = 'wb_not_street'
          return
        }
        this.isOpenHouse = !!value
        const data = {
          locations: [
            {
              street_fias_id: this.street_guid === 'wb_not_street' ? this.city2_guid : this.street_guid
            }
          ],
          query: value,
          from_bound: {
            value: 'house'
          },
          to_bound: {
            value: 'house'
          },
          restrict_value: true
        }
        this.$http.post(this.url, JSON.stringify(data)).then((response) => {
          this.houseSuggestions = []
          response = JSON.parse(JSON.stringify(response))
          this.suggestions = response.body.suggestions
          this.suggestions.forEach((item) => {
            this.houseSuggestions.push(item.data.house)
          })
        })
      },
      moveDownHouse () {
        if (!this.isOpen && !this.isOpenHouse) {
          return
        }
        this.selectedItem = (this.selectedItem + 1) % this.suggestions.length
        this.suggestions.length > 1 && this.suggestions[this.selectedItem].data.house !== undefined ? this.house = (this.suggestions[this.selectedItem].data.house) : null
      },
      moveUpHouse () {
        if (!this.isOpen && !this.isOpenHouse) {
          return
        }
        this.selectedItem = this.selectedItem - 1 < 0 ? this.suggestions.length - 1 : this.selectedItem - 1
        this.suggestions.length > 1 ? this.house = (this.suggestions[this.selectedItem].data.house) : null
      },
      suggest (query) {
        this.$http.post(this.url, JSON.stringify(query)).then((response) => {
          response = JSON.parse(JSON.stringify(response))
          this.currentChoice = response.body.suggestions[0]
          if (this.currentChoice !== undefined) {
            this.keyword = this.currentChoice.value
          }
        })
      },
      getPreparedField (str, reg) {
        const res = str.split(', ').filter(element => !element.search(reg)).join('').replace(reg, '')
        return res
      }
    },
    mounted: function () {
      const fullAddress = localStorage.getItem('wb_full_address')
      if (fullAddress !== undefined) this.keyword = fullAddress
    }
  }
</script>

<style>
</style>