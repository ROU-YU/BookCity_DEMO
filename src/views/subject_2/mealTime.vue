<template>
  <div class="form">
    <h1 class="str">
      {{ $t('plz_set_meals_time') }}
    </h1>
    <Row
      v-for="(day, index) in weekDayData"
      :key="`day-${index}`"
      class="row"
      justify="center"
      align="middle"
    >
      <Col span="2">
        <p>
          {{ filterWeekDay(day.day) }}
        </p>
      </Col>
      <Col span="2">
        <Switch
          v-model="day.open"
          @on-change="changeSwitch($event, index)"
        />
      </Col>
      <Col span="20">
        <p v-if="!day.open">
          {{ $t('no_food') }}
        </p>
        <Row
          v-else
          justify="space-around"
          :gutter="10"
          style="height: 120px"
        >
          <Col span="10">
            <Select
              v-model="day.startIndex"
              clearable
              :placeholder="$t('plz_choose_start_time')"
              @on-change="startTimeChange($event, index)"
            >
              <Option
                v-for="(obj, starTime) in day.starTimeData"
                :key="`opt-${starTime}`"
                :value="starTime"
                :disabled="obj.disabled"
              >
                {{ obj.time }}
              </Option>
            </Select>
          </Col>
          <Col span="10">
            <Select
              v-model="day.endIndex"
              clearable
              :placeholder="$t('plz_choose_start_time')"
              @on-change="endTimeChange($event, index)"
            >
              <Option
                v-for="(obj, eIndex) in day.endTimeData"
                :key="`endOpt-${eIndex}`"
                :value="eIndex"
                :disabled="obj.disabled"
              >
                {{ obj.time }}
              </Option>
            </Select>
          </Col>
        </Row>
      </Col>
    </Row>
      <Button class="ok-btn" type="primary" @click="handleOk">{{ $t('send') }}</Button>
  </div>
</template>
<script>
import { isBlank, isNil } from '@/libs/tools'

export default {
  components: {
  },
  data () {
    return {
      weekDayList: {
        'week_day0': '000000000000000000000000000000000000000000000000',
        'week_day1': '111111111111111111111111111111111111111111111111',
        'week_day2': '000000111111000000000000000000000000000000000000',
        'week_day3': '000000000000111111000000000000000000000000000000',
        'week_day4': '000000000000000000000000111111111111000000000000',
        'week_day5': '000000000000000000000000000000000000111111111111',
        'week_day6': '111111111111111111111111111111111111111111111111'
      },
      weekDayData: [],
      mealsForm: {}
    }
  },
  computed: {
    timeRangeData () {
      let array = []
      for (let i = 0; i < 24; i++) {
        if (i < 10) i = `0${i}`
        array.push(
          {
            time: `${i}:00`,
            disabled: false
          },
          {
            time: `${i}:30`,
            disabled: false
          }
        )
      }
      array.push({
        time: '23:59',
        disabled: false
      })
      return array
    },
    starTimeData () {
      return this.timeRangeData.filter(_ => _.time !== '23:59')
    },
    endTimeData () {
      return this.timeRangeData.filter(_ => _.time !== '00:00')
    }
  },
  methods: {
    filterWeekDay (weekDay) {
      let day = ''
      switch (weekDay) {
        case 'week_day0':
          day = this.$t('sunday')
          break
        case 'week_day1':
          day = this.$t('monday')
          break
        case 'week_day2':
          day = this.$t('tuesday')
          break
        case 'week_day3':
          day = this.$t('wednesday')
          break
        case 'week_day4':
          day = this.$t('thursday')
          break
        case 'week_day5':
          day = this.$t('friday')
          break
        case 'week_day6':
          day = this.$t('saturday')
          break
      }
      return day
    },
    changeSwitch (event, index) {
      //是否供餐
      this.weekDayData[index].open = event
      if (!event) {
        this.weekDayData[index].startIndex = ''
        this.weekDayData[index].endIndex = ''
      }
    },
    changeWeekDayList () {
      let obj = this.weekDayList
      let arr = []

      for (let key in obj) {
        let open = true
        if (obj[key].indexOf('1') === -1 ) open = false

        arr.push({
          open: open,
          day: key,
          startIndex: '',
          endIndex: '',
          starTimeData: this.starTimeData,
          endTimeData: this.endTimeData
        })
      }
      console.log('arr =>', arr)
      return arr
    },
    startTimeChange (event, index) {
      let endIndex = event - 1
      this.weekDayData.forEach((curr, currIndex) => {
        if (index === currIndex) {
          for (let i = 0; i < 48; i++) {
            if (!(endIndex < i)) {
              curr.endTimeData[i].disabled = true
            }
          }
        } else {
          return
        }
      })
    },
    endTimeChange (event, index) {
      let startIndex = event + 1
      this.weekDayData.forEach((curr, currIndex) => {
        if (index === currIndex) {
          for (let i = 0; i < 48; i++) {
            if (!(startIndex > i)) {
              curr.starTimeData[i].disabled = true
            }
          }
        }
      })
    },
    changeToStr (startIndex, endIndex) {
      let str = ''
      let arr = []
      for(let i = 0; i < 48; i++) {
        str += Math.floor(Math.random() * 0)
      }

      if (!(typeof startIndex === 'number') || !(typeof endIndex === 'number')) return str //沒有設定開始或結束時間
      arr = str.split('')
      for (let i = startIndex; i < endIndex + 1; i ++) {
        arr[i] = '1'
      }

      str = arr.join('')
      console.log('str', str)
      return str
    },
    handleOk () {
      //送出form
      let form = {}
      let arr = [ ...this.weekDayData ]

      arr.forEach(curr => {
        let key = curr.day
        form[key] = this.changeToStr(curr.startIndex, curr.endIndex)
      })
      //呼叫api，回傳form
      console.log('form =>', form)
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.weekDayData = this.changeWeekDayList()
    })
  }
}
</script>

<style>
.form {
  border: 1px;
  border-style: solid;
  border-color: black;
  background-color: palegoldenrod;
  width: 800px;
  margin: 10px auto 20px auto;
  padding: 10px 10px 10px 10px;
}

.str {
  font-size: 40px;
  margin: 0 0 10px 0;
  text-align: center;
  height: 50px;
}

.row {
  margin: 15px auto 15px auto;
  height: 50px;
}

.form-div {
  height: 200px;
}

.ok-btn {
  margin: 0 40%;
  width: 200px;
}
</style>