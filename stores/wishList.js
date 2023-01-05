import { defineStore } from 'pinia'

export const useWishList = defineStore('wishList', () => {

    let items = ref([])


    let addToWishList =  (item) => {

        let inWishList = items.value.some(i => i.id === item.id)


        if(!inWishList) {
            items.value.push(item)
        }

    }


    let removeFromWishList = (id) => {
        items.value = items.value.filter(i => i.id !== id)
    }



    return { items, addToWishList, removeFromWishList }
})