<template>
    <div class="calendar_slider">
        <template v-for="month in calendars">
            <div class="slider_item">
                <div class="month">{{month[1][0].date.substr(0, 7)}}</div>
                <div class="weeks">
                    <div v-for="week in weeks">{{week}}</div>
                </div>
                <div class="days">
                    <template v-for="week in month">
                        <template v-for="day in week">
                            <div class="day" :class="{'not_current_month': !day.isCurrentMonth}">
                                <div class="date">{{day.date.split('-')[2]}}</div>
                                <div class="event_num" v-if="day.eventNum">{{day.eventNum}}</div>
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
        url: {
            type: String
        }
    },
    data () {
        return {
            weeks: ['日', '一', '二', '三', '四', '五', '六'],
            calendars: []
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
        for (var i = 0; i < this.startDates.length; i++) {
            this.getWeeksDates(this.startDates[i])
        }

    },
    methods: {
        getWeeksDates (date) {
            let vm = this,
                now = new Date (),
                current = new Date(date),
                startDate = new Date(date),
                startWeekDay = startDate.getDay()

            startDate.setDate(startDate.getDate() - startWeekDay)
            if (vm.url) {
                monthUtil.fetch({
                    method: 'get',
                    url: vm.url,
                    data: {month: date}
                }).then((res)=>{
                    let calendar = []
                    for (var i = 0; i < 6; i++) {
                        var week = []
                        for (var k = 0; k < 7; k++) {
                            week.push({
                                theDay: startDate.getDate(),
                                isToday: now.toDateString() == startDate.toDateString(),
                                isCurrentMonth: current.getFullYear() === startDate.getFullYear() && current.getMonth() === startDate.getMonth(),
                                weekDay: k,
                                date: monthUtil.date2str(startDate),
                                eventNum: vm.markEvent(res, monthUtil.date2str(startDate))
                            })
                            startDate.setDate(startDate.getDate() + 1)
                        }
                        calendar.push(week)
                    }
                    vm.calendars.push(calendar)
                })
            }
        },
        markEvent (events, date) {
            for (var i = 0; i < events.length; i++) {
                if (events[i].date == date) {
                    return events[i].number
                }
            }
        }
    }
}
</script>
<style lang="less" scoped>
.calendar_slider{
    height: 100vh;
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
        transform: translateY(0);
        &:first-child{
            transform: translateY(-100%);
        }
        &:last-child{
            transform: translateY(100%);
        }
        .month{
            line-height: 6vh;
            text-align: center;
            font-size: 14px;
        }
        .weeks{
            display: flex; border-bottom: #ddd solid 1px;
            div{
                line-height: 4vh;
                flex: 1;
                text-align: center;
                font-size: 12px;
                color: #999;
            }
        }
        .days{
            height: 90vh;
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            align-items: stretch;
            align-content: flex-start;
            .day{
                height: 16.66%;
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
                    font-size: 14px;
                    color: #333;
                    padding: 0 10px; line-height: 24px;
                }
                .event_num{
                    position: absolute;
                    bottom: 5px;
                    right: 5px;
                    font-size: 12px;
                    width: 24px;
                    height: 24px;
                    background-color: #dd3629;
                    color: #FFF;
                    text-align: center;
                    line-height: 24px;
                    border-radius: 50%;
                }
            }
        }
    }
}
</style>
