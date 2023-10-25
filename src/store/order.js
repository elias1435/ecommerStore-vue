import {defineStore} from 'pinia'
import axios from 'axios'
import {ref,reactive} from 'vue'
import { userAuth } from './auth';
import {cart} from './cart'
import toastr from '../utilities/toastr.js'

const order = defineStore('order',()=>{

    const isLoading = ref(false);

    async function OrderPlace(items, total){

        const product_id = Object.values(items).map(item => item.product.id);
        const quantity = Object.values(items).map(item => item.quantity);
        const price = Object.values(items).map(item => item.product.price);
        const sub_total = Object.values(items).map(item => item.product.price * item.quantity);

        const payload= {
            product_id  : product_id,
            quantity    : quantity,
            price       : price,
            sub_total   : sub_total,
            total       : total.value
        }

        const auth = userAuth();
        const token = auth.token;

        let res = await axios.post(`http://localhost:8000/api/order`,payload,{
            headers :{
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${token}`
            }
        })

        
        if(res.data.status == 200){
            toastr.success('Order Place Successfully')
            isLoading.value = false
            localStorage.removeItem('cart');
        }
    }


    return {OrderPlace, isLoading}
});


export {order}