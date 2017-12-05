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
    <div v-if="address.street == null || address.street == 'wb_not_street'" id="empty_street_checkbox"
         class="row checkbox">
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
          <br>1. Начните вводить адрес и выберите из списка.<br>2. В случае, если в вашем населенном пункте (деревне,
          селе) улица существует, но вы преднамеренно не указали её, по заявке будет отказ!
        </p>
      </div>
    </div>
    <div class="row">
      <div class="columns four relative" data="form-error">
        <div class="form-field">
                         <span class="float-label-container">
              <div>Дом</div>
                <input
                  :id="prefix + 'house'"
                  :name="prefix + 'house'"
                  v-model="address.house"
                  autocomplete=off
                  @input="onInputHouse($event.target.value)"
                  @keyup.esc="isOpenHouse = false"
                  @blur="isOpenHouse = false"
                  @keydown.down="moveDownHouse"
                  @keydown.up="moveUpHouse"
                  @keydown.enter.prevent="selectHouse"
                  type="text"
                  class="big form-control"
                  style=" box-sizing: border-box;"
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
                          <div>Индекс</div>
                  <input :id="prefix + 'index'" :name="prefix + 'index'" v-model="address.index" type="text"
                         class="big form-control" value="">
                          <p class="hidden"></p>
                       </span>
        </div>
      </div>
      <div class="columns two dispensable" data="form-error">
        <div class="form-field">
               <span class="float-label-container">
                            <div>Корпус</div>
                            <input :id="prefix+'corpus'" :name="prefix+'corpus'" v-model="address.corpus" type="text"
                                   class="big form-control" tabindex="14" value="">
                            <p class="hidden" style=""></p>
                        </span>
        </div>
      </div>
      <div class="columns two dispensable" data="form-error">
        <div class="form-field">
                                        <span class="float-label-container">
                            <div>Строение</div>
                         <input :id="prefix+'stroenie'" :name="prefix+'stroenie'" v-model="address.stroenie" type="text"
                                class="big form-control" tabindex="15" value="">
                          <p class="hidden" style=""></p>
            </span>

        </div>
      </div>
      <div class="columns two" data="form-error">
        <div class="form-field">
                  <span class="float-label-container">
                          <div>Квартира</div>
                          <input :id="prefix + 'flatnumber'" :name="prefix + 'flatnumber'" v-model="address.flatnumber"
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
        noStreet: false,
        address: {
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
          subject_district_city_street: ''
        }
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
          let address = this.address
          address.geo_lat = this.currentChoice.data.geo_lat ? this.currentChoice.data.geo_lat : null
          address.geo_lon = this.currentChoice.data.geo_lon ? this.currentChoice.data.geo_lon : null
          address.geo_qc = this.currentChoice.data.qc_geo
          address.city = address.city_value = this.currentChoice.data.city
          address.city_guid = this.currentChoice.data.city_fias_id
          address.subject = this.currentChoice.data.region
          address.subject_value = this.currentChoice.data.region_kladr_id.substring(0, 2)
          address.subject_guid = this.currentChoice.data.region_fias_id
          address.district = address.district_value = this.currentChoice.data.area
          address.district_guid = this.currentChoice.data.area_fias_id
          address.city2 = address.city2_value = this.currentChoice.data.settlement
          address.city2_guid = this.currentChoice.data.settlement_fias_id
          address.street = address.street_value = this.currentChoice.data.street
          address.street_guid = this.currentChoice.data.street_fias_id
          address.index = this.currentChoice.data.postal_code
          address.subject_district_city_street = this.currentChoice.data.value
          // заполнение корпуса и строения
          if (this.currentChoice.data.block_type === 'к') {
            const buildingIndex = this.currentChoice.data.block.indexOf(' стр ')
            if (buildingIndex > -1) {
              address.corpus = this.currentChoice.data.block.substring(0, buildingIndex)
              address.stroenie = this.currentChoice.data.block.substring(buildingIndex + 5)
            } else {
              address.corpus = this.currentChoice.data.block
            }
          } else if (this.currentChoice.data.block_type === 'стр' || this.currentChoice.data.block_type === 'сооружение') {
            address.stroenie = this.currentChoice.data.block
          }

          // тащщим странную логику написания поселения в поле город
          if (address.city === null && address.city2 !== null) {
            address.city = address.city_value = address.city2
            address.city_guid = address.city2_guid
            address.city2 = address.city2_guid = address.city2_value = ''
          }
        } catch (e) {
          return false
        }
      },
      address: {
        handler: function () {
          this.$emit('selectAddress', this.address)
        },
        deep: true
      },
      noStreet: function () {
        if (this.noStreet) {
          this.address.street = this.address.street_value = this.address.street_guid = 'wb_not_street'
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
        }).catch(err => console.log(err))
      },
      moveDown () {
        if (!this.isOpen && !this.isOpenHouse) {
          return false
        }
        this.selectedItem = (this.selectedItem + 1) % this.suggestions.length
        this.keyword = this.suggestions.length > 1 ? (this.suggestions[this.selectedItem].value) : null
      },
      moveUp () {
        if (!this.isOpen && !this.isOpenHouse) {
          return
        }
        this.selectedItem = this.selectedItem - 1 < 0 ? this.suggestions.length - 1 : this.selectedItem - 1
        this.keyword = this.suggestions.length > 1 ? (this.suggestions[this.selectedItem].value) : null
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
        this.address.house = this.address.house_value = this.suggestions[this.selectedItem].data.house
      },
      onInputHouse (value) {
        this.selectedItem = 0
        if ((this.address.street === null || this.address.street === 'wb_not_street') && this.noStreet) {
          this.address.house = value
          this.address.street = this.address.street_guid = this.address.street_value = 'wb_not_street'
          return
        }
        this.isOpenHouse = !!value
        const data = {
          locations: [
            {
              street_fias_id: this.address.street_guid === 'wb_not_street' ? this.address.city2_guid : this.address.street_guid
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
        this.$http.post(this.url, JSON.stringify(data))
          .then((response) => {
            this.houseSuggestions = []
            response = JSON.parse(JSON.stringify(response))
            this.suggestions = response.body.suggestions
            this.suggestions.forEach((item) => {
              this.houseSuggestions.push(item.data.house)
            })
          }).catch(err => console.log(err))
      },
      moveDownHouse () {
        if (!this.isOpen && !this.isOpenHouse) {
          return
        }
        this.selectedItem = (this.selectedItem + 1) % this.suggestions.length
        this.address.house = this.suggestions.length > 1 && this.suggestions[this.selectedItem].data.house !== undefined ? (this.suggestions[this.selectedItem].data.house) : null
      },
      moveUpHouse () {
        if (!this.isOpen && !this.isOpenHouse) {
          return
        }
        this.selectedItem = this.selectedItem - 1 < 0 ? this.suggestions.length - 1 : this.selectedItem - 1
        this.address.house = this.suggestions.length > 1 ? (this.suggestions[this.selectedItem].data.house) : null
      },
      suggest: async function (query) {
        this.$http.post(this.url, JSON.stringify(query)).then((response) => {
          response = JSON.parse(JSON.stringify(response))
          this.currentChoice = response.body.suggestions[0]
          if (this.currentChoice !== undefined) {
            this.keyword = this.currentChoice.value
          }
        }).catch(err => console.log(err))
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
