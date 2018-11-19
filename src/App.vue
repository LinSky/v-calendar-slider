<template>
    <div id="app" class="app">
        <calendar-slider url="http://localhost:9527/events"></calendar-slider>
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
        beforeGenerateDateHandler (date) {
            // setTimeout(()=>{
                return [
                    {
                        date: '2018-11-10',
                        number: 3
                    },
                    {
                        date: '2018-11-20',
                        number: 15
                    },
                ]
            // }, 200)
        }


    }
}
</script>

<style>
</style>
