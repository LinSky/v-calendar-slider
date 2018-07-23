<template>
    <div id="app" class="app">
        <calendar-slider :beforeGenerateDate="beforeGenerateDateHandler"></calendar-slider>
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
            
                return [
                    {
                        date: '2018-06-05',
                        number: 3
                    },
                    {
                        date: '2018-06-06',
                        number: 15
                    },
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
