<template>
    <div class="calendar_slider">
        <template v-for="startDate in startDates">
            <div class="slider_item">
                <div class="month">{{startDate.substr(0, 7)}}</div>
                <div class="weeks">
                    <div v-for="week in weeks">{{week}}</div>
                </div>
                <div class="days">
                    <template v-for="weekArr in getWeeksDates(startDate)">
                        <template v-for="day in weekArr">
                            <div class="day">
                                <div class="date">{{day.date.split('-')[2]}}</div>
                            </div>
                        </template>
                    </template>
                </div>
            </div>
        </template>
    </div>
</template>

<script>

import monthUtil from './monthUtil.js'
console.log(monthUtil);
export default {
    name: 'calendarSlider',
    props: {
        defaultMonth: {
            type: String,
            default: monthUtil.getDefaultMonthStr()
        }
    },
    data () {
        return {
            weeks: ['日', '一', '二', '三', '四', '五', '六']
        }
    },
    computed: {
        startDates () {
            let vm = this
            let arr = []
            arr.push(
                monthUtil.getPrevMonthStartStr(vm.defaultMonth),
                monthUtil.getNowMonthStartStr(vm.defaultMonth),
                monthUtil.getNextMonthStartStr(vm.defaultMonth)
            )
            return arr
        }
    },
    watch: {

    },
    created () {
        console.log(this.getWeeksDates(this.startDates[1]));
    },
    methods: {
        getWeeksDates (date) {
            let vm = this,
                now = new Date (),
                startDate = new Date(date),
                startWeekDay = startDate.getDay()

            startDate.setDate(startDate.getDate() - startWeekDay)
            let calendar = []
            for (var i = 0; i < 6; i++) {
                var week = []
                for (var k = 0; k < 7; k++) {
                    console.log(startDate);
                    week.push({
                        theDay: startDate.getDate(),
                        isToday: now.toDateString() == startDate.toDateString(),
                        weekDay: k,
                        date: monthUtil.date2str(startDate)
                    })
                    startDate.setDate(startDate.getDate() + 1)
                }
                calendar.push(week)
            }
            return calendar
        }
    }
}
</script>
<style lang="less" scoped>
.calendar_slider{
    height: 100%;
    position: relative;
    background-color: #FFF;
    overflow: hidden;
    .slider_item{
        width: 100%;
        height: 100%;
        display: block;
        position: absolute;
        left: 0;
        top: 0;
        -webkit-transition: all 0.5s ease-out;
        transition: all 0.5s ease-out;
        &:first-child{
            transform: translateY(-100%);
        }
        &:last-child{
            transform: translateY(100%);
        }
        .month{
            line-height: 36px;
            text-align: center;
            font-size: 14px;
        }
        .weeks{
            display: flex; border-bottom: #ddd solid 1px;
            div{
                line-height: 24px;
                flex: 1;
                text-align: center;
                font-size: 12px;
                color: #333;
            }
        }
        .days{
            height: 84%;
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            align-items: stretch;
            align-content: flex-start;
            .day{
                height: 16.2%;
                width: 14.28%;
                border-bottom: #ddd solid 1px;
                border-right: #ddd solid 1px;
                box-sizing: border-box;
                position: relative;
                &:nth-child(7n){
                    border-right: none;
                }
                .date{
                    font-size: 12px;
                    color: #666;
                    text-align: center;
                }
            }
        }
    }
}
</style>
