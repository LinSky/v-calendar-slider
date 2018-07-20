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
                            <div class="day" :class="{'not_current_month': !day.isCurrentMonth}">
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
        },
        'getEvents': {
            type: Function
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
        console.log(this.getWeeksDates('2018-08-01'));
    },
    methods: {
        getWeeksDates (date) {
            let vm = this,
                now = new Date (),
                current = new Date(date),
                startDate = new Date(date),
                startWeekDay = startDate.getDay()

            startDate.setDate(startDate.getDate() - startWeekDay)
            let calendar = []
            for (var i = 0; i < 6; i++) {
                var week = []
                for (var k = 0; k < 7; k++) {
                    week.push({
                        theDay: startDate.getDate(),
                        isToday: now.toDateString() == startDate.toDateString(),
                        isCurrentMonth: current.getFullYear() === startDate.getFullYear() && current.getMonth() === startDate.getMonth(),
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
        transform: translateY(100%);
        &:first-child{
            transform: translateY(0);
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
                color: #999;
            }
        }
        .days{
            height: 90%;
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
                &.not_current_month{
                    .date{
                        opacity: .3;
                    }
                }
                .date{
                    font-size: 12px;
                    color: #333;
                    padding: 0 10px; line-height: 24px;
                }
            }
        }
    }
}
</style>
