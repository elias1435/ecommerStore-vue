import {defineStore} from 'pinia'
import {ref,reactive} from 'vue'
import axios from 'axios'

const products = defineStore('products',()=>{
    
    const products = ref([]);
    const productDetails = ref(null);
    const isLoader = ref(true)

    async function getProducts(){
        let res = await axios.get(`http://localhost:8000/api/products`)
        products.value = res.data
        isLoader.value = false
    }

    async function getProductDetails(id){
        let res = await axios.get(`http://localhost:8000/api/products/${id}`)
        productDetails.value = res.data
        console.log(res.data)
        isLoader.value = false
    }

    return {products, getProducts,productDetails,getProductDetails, isLoader}
});


export {products}