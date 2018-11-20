<template>
    <div id="app" class="app">
        <calendar-slider :events="events" @monthChanged="monthChangedHandle" @dateClick="dateClickHandle"></calendar-slider>
    </div>
</template>

<script>
export default {
    name: 'app',
    data () {
        return {
            events: [
                {
                    date: '2018-11-22',
                    number: 100
                },
                {
                    date: '2018-11-25',
                    number: 2
                }
            ]
        }
    },
    created () {

    },
    methods: {
        monthChangedHandle (currentMonth) {
            setTimeout(()=>{
                this.events = [
                    {
                        date: '2018-12-22',
                        number: 2
                    },
                    {
                        date: '2018-12-26',
                        number: 2
                    }
                ]
            }, 100)
        },

        dateClickHandle (date) {
            console.log(date);
        }


    }
}
</script>

<style>
</style>
