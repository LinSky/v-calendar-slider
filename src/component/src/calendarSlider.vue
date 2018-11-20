<template>
    <div
        class="calendar_slider"
        ref="sliders"
        @touchstart="touchstartHandle"
        @touchmove="touchmoveHandle"
        @touchend="touchendHandle">
        <template v-for="(month, index) in calendars">
            <div class="slider_item" :style="getTransform(index)" @webkit-transition-end="onTransitionEnd(index)" @transitionend="onTransitionEnd(index)">
                <div class="month">{{month[1][0].date.substr(0, 7)}}</div>
                <div class="weeks">
                    <div v-for="week in weeks">{{week}}</div>
                </div>
                <div class="days">
                    <template v-for="week in month">
                        <template v-for="day in week">
                            <div class="day" :class="{'not_current_month': !day.isCurrentMonth}" @click.stop="dateClickHandle(day.date)">
                                <div class="date">{{day.date.split('-')[2]}}</div>
                                <div class="event_num" v-if="day.isCurrentMonth && day.eventNum">{{day.eventNum}}</div>
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
        defaultActiveMonth: {
            type: String,
            default: monthUtil.getDefaultMonthStr()
        },
        events: {
            type: Array,
            default: function () {
                return []
            }
        }
    },
    data () {
        return {
            weeks: ['日', '一', '二', '三', '四', '五', '六'],
            calendars: [],
            defaultMonth: this.defaultActiveMonth || monthUtil.getDefaultMonthStr(),
            direction: null,
            activeIndex: 1,
            start: {
                x: null,
                y: null,
            },
            end: {
                x: null,
                y: null
            },
            distan: {
                x: 0,
                y: 0
            },
            isAnimation: false,
            sliderHeight: 0,
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
        defaultMonth: {
            handler: function (newVal) {
                for (var i = 0; i < this.startDates.length; i++) {
                    this.getWeeksDates(this.startDates[i])
                }
            },
            deep: true
        },
        events: {
            handler: function (newVal) {
                this.calendars = []
                for (var i = 0; i < this.startDates.length; i++) {
                    this.getWeeksDates(this.startDates[i])
                }
            },
            deep: true
        }
    },
    mounted () {
        this.sliderHeight = this.$refs.sliders.offsetHeight
    },
    created () {
        for (var i = 0; i < this.startDates.length; i++) {
            this.getWeeksDates(this.startDates[i])
        }
    },
    methods: {
        dateClickHandle (date) {
            this.$emit('dateClick', date)
        },

        getTransform (index) {
            let vm = this
            let style = {}
            if (index === vm.activeIndex) {
                style['transform'] = 'translateY('+ vm.distan.y +'px)'
            }
            if (index < vm.activeIndex) {
                style['transform'] = 'translateY(-100%)'
            }
            if (index > vm.activeIndex) {
                style['transform'] = 'translateY(100%)'
            }
            style['transition'] = vm.isAnimation ? 'transform 0.5s ease-out' : 'none'
            return style
        },

        /**
        * @name getWeeksDates
        * @description 根据日期获取月数据
        * @param date {YYYY-MM-DD:String} 月开始日期
        */
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
                        date: monthUtil.date2str(startDate),
                        eventNum: vm.markEvent(vm.events, monthUtil.date2str(startDate))
                    })
                    startDate.setDate(startDate.getDate() + 1)
                }
                calendar.push(week)
            }
            vm.calendars.push(calendar)

        },

        /**
        * @name markEvent
        * @description 标记当前日期是否有事务
        * @param events {Array} 当前月的事务列表
        * @param date {YYYY-MM-DD:String} 日期
        */
        markEvent (events, date) {
            for (var i = 0; i < events.length; i++) {
                if (events[i].date == date) {
                    return events[i].number
                }
            }
        },

        /**
        * @name touchStartHandle
        * @description 滑动开始事件处理器
        */
        touchstartHandle (event) {
            let vm = this,
                touch = event.touches[0]
            vm.start.x = touch.pageX
            vm.start.y = touch.pageY
        },

        /**
        * @name touchmoveHandle
        * @description 滑动中事件处理器
        */
        touchmoveHandle (event) {
            let vm = this,
                touch = event.touches[0]
            vm.isAnimation = true
            vm.end.x = touch.pageX
            vm.end.y = touch.pageY
            vm.distan.x = vm.end.x - vm.start.x
            vm.distan.y = vm.end.y - vm.start.y
            let dom = vm.distan.y < 0 ? vm.$refs.sliders.children[2] : vm.$refs.sliders.children[0]
            if (vm.distan.y < 0) {
                dom.style['transform'] = 'translateY('+ (vm.sliderHeight + vm.distan.y) +'px)'
            }else {
                dom.style['transform'] = 'translateY('+ (-vm.sliderHeight + vm.distan.y) +'px)'
            }
        },

        /**
        * @name touchendHandle
        * @description 滑动结束事件处理器
        */
        touchendHandle (event) {
            let vm = this,
                touch = event.changedTouches[0]
            vm.isAnimation = true
            vm.end.x = touch.pageX
            vm.end.y = touch.pageY
            vm.distan.x = vm.end.x - vm.start.x
            vm.distan.y = vm.end.y - vm.start.y
            vm.getTouchDirection(vm.distan.x, vm.distan.y)
            if (vm.direction === 'top') {
                vm.activeIndex = 2
            } else if (vm.direction === 'bottom') {
                vm.activeIndex = 0
            } else {
                for (var i = 0; i < this.$refs.sliders.children.length; i++) {
                    this.$refs.sliders.children[i].style['transform'] = 'translateY('+ (i*100 - 100) +'%)'
                }
            }
            vm.distan.x = 0
            vm.distan.y = 0
            vm.direction = null
        },

        onTransitionEnd (index) {
            let vm = this
            vm.isAnimation = false
            if (index === 1 && this.activeIndex === 2) {
                vm.defaultMonth = vm.startDates[2].substr(0, 7)
                vm.activeIndex = 1
                vm.calendars = []
                vm.$emit('monthChanged', vm.defaultMonth)
            }else if (index === 1 && this.activeIndex === 0) {
                vm.defaultMonth = vm.startDates[0].substr(0, 7)
                vm.activeIndex = 1
                vm.calendars = []
                vm.$emit('monthChanged', vm.defaultMonth)
            }


        },

        /**
         * getAngle 计算角度
         */
        getAngle (x, y) {
            return Math.atan2(y, x) * 180 / Math.PI;
        },

        /**
         * getTouchDirection 获取滑动方向
         */
        getTouchDirection (x, y) {
            let vm = this
            if (Math.abs(y) > 20) {
                let angle = -vm.getAngle(x, y)
                if (angle >= 45 && angle < 135) {//向上
                    vm.direction = 'top'
                } else if (angle >= -135 && angle < -45) {//向下
                    vm.direction = 'bottom'
                }
            }
        },



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
        .month{
            line-height: 6vh;
            text-align: center;
            font-size: 16px;
            font-weight: bold;
            color: #333;
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
