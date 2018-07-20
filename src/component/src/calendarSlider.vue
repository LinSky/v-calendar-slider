<template>
    <div class="calendar_slider">
    </div>
</template>

<script>
import getMonth from './getMonth.js'
export default {
    name: 'calendarSlider',
    props: {
        defaultMonth: {
            type: Date,
            default: function () {
                return new Date()
            }
        }
    },
    data () {
        return {
        }
    },
    computed: {
        startDates () {
            let vm = this
            return [getMonth(vm.defaultMonth, 1), ]
        }
    },
    watch: {

    },
    created () {

    },
    methods: {


    }
}
</script>
<style lang="less" scoped>

</style>
