export const settings = reactive({
    statsForNerds: false,
    safeMode: true
})

watch(settings, (v) => {
    console.log(v)
    // if (v.stats) {
    //     alert('You are using this. Therefore you are a nerd.')
    // }
})