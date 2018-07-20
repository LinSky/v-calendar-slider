<template>
    <div id="app" class="app">
        <calendar-slider :getEvents="getEventsHandler"></calendar-slider>
    </div>
</template>

<script>
export default {
    name: 'app',
    data () {
        return {

        }
    },
    methods: {
        getEventsHandler (date) {
            console.log(date);
            return [
                {
                    date: '2018-06-05',
                    number: 3
                },
                {
                    date: '2018-06-10',
                    number: 3
                }
            ]
        }
    }
}
</script>

<style>
html,body{
    height: 100%;
}
.app{
    height: 100%;
}
</style>
