import { defineStore } from 'pinia'

export const useSubscribeStore = defineStore("subscribeStore", ()=> {
    const isSubscribe = ref(false)

    const handleSubscribe = () => {
        isSubscribe.value = true
        console.log(121)
    }

    return {
        isSubscribe,
        handleSubscribe
    }
})