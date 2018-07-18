import calendarSlider from './src/calendarSlider.vue'

const install = function(Vue, opts = {}) {
    Vue.component(calendarSlider.name, calendarSlider);
}

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export default {
    install,
    calendarSlider
}
