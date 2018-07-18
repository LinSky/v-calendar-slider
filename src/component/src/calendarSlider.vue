<template>
    <div class="calendar_slider">
    </div>
</template>

<script>
import moment from 'moment'
export default {
    name: 'calendarSlider',
    props: {
        defaultMonth: {
            type: String,
            default: moment().format('YYYY-MM')
        }
    },
    data () {
        return {
        }
    },
    computed: {
        /**
        *根据传入的defaultMonth,计算出上月，与下月
        */
        months () {
            let vm = this
            let monArr = []
            monArr.push(
                moment(vm.defaultMonth).subtract(1, 'M').format('YYYY-MM-DD'), //上一个月
                moment(vm.defaultMonth).format('YYYY-MM-DD'),    //当月
                moment(vm.defaultMonth).add(1, 'M').format('YYYY-MM-DD') //下一个月
            )
            return monArr
        }
    },
    watch: {

    },
    created () {
        this.getWeekDates(this.months[1])
    },
    methods: {
        getWeekDates (date) {
            let vm = this,
                calendars = [],
                today = moment()
            console.log(today.weeks());

        }
    }
}
</script>
<style lang="less" scoped>

</style>
