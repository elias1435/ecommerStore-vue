import {defineStore} from 'pinia'
import {ref,reactive, computed} from 'vue'
import toastr from '../utilities/toastr'
import { order } from './order';


const cart = defineStore('cart',()=>{
    const cartItems = ref({});

    const totalAmmount = computed(()=>{
        let total = 0;
        for (let id in cartItems.value) {
            total += cartItems.value[id].product.price * cartItems.value[id].quantity
        }

        return parseFloat(total.toFixed(2));
    });

    const totalCartItem = computed(()=>{
        let total = 0;
        for(let id in cartItems.value){
            total += cartItems.value[id].quantity
        }

        return total;
    })
    

    function addToCart(product){
        if(!cartItems.value[product.id]){
            cartItems.value[product.id] = {
                product,
                quantity:1
            }
        }else{
            cartItems.value[product.id].quantity++
        }

        storeCartInLocalstorage()
    }

    function removeCartItem(index){
        delete cartItems.value[index];
        storeCartInLocalstorage()
        toastr.success('Item remove successfully from cart')
    }

    function sendToOrder(){
        const orderStore = order();
        orderStore.OrderPlace(cartItems.value, totalAmmount);
    }

    function storeCartInLocalstorage(){
        localStorage.setItem('cart', JSON.stringify(cartItems.value));
    }

    function getCartFromLocalStorage(){
        cartItems.value = JSON.parse(localStorage.getItem('cart'));
    }

    if(localStorage.getItem('cart')){
        getCartFromLocalStorage();
    }
    

    return {cartItems, addToCart, totalAmmount, totalCartItem, removeCartItem, sendToOrder,getCartFromLocalStorage}
});


export {cart}