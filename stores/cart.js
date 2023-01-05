import { defineStore } from 'pinia'

export const useCart = defineStore('cart', () => {

    let items = ref([])
    let total = ref(0)


    let addToCart =  (item) => {

        let inCart = items.value.some(i => i.id === item.id)


        if(inCart) {
            items.value = items.value.map(i => i.id === item.id? {...i, qty: i.qty + 1} : i)

        } else {
            items.value.unshift({...item, qty: 1})
        }

        updateTotal()
    }


    let removeFromCart = (id) => {
        items.value = items.value.filter(i => i.id !== id)
        updateTotal()
    }

    let reduceQty = (id) => {
        let item = items.value.find(i => i.id === id)

        if(item.qty === 1) {
            removeFromCart(id)
        } else {
            items.value = items.value.map(i => i.id === id? {...i, qty: i.qty - 1}: i)
            updateTotal()
        }
    }


    let updateTotal = () => {
        total.value = items.value.reduce((a, i) => {
            let {price, qty} = i
            let totalPrice = Number(price) * Number(qty)
            return a + totalPrice
        }, 0)
    }



    return { items, total, addToCart, removeFromCart, reduceQty }
})