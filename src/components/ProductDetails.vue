<script setup>
import { products } from '../store/products';
import { cart } from '../store/cart';
import { onBeforeMount } from 'vue';
import {useRoute} from 'vue-router'

const store = products();
const cartStore = cart();
const route = useRoute();

const id = `${route.params.id}`
onBeforeMount(()=>{
    store.isLoader = true;
    store.getProductDetails(id)
});


</script>

<template>
    <div class="bg-white h-full">
        <div class="p-2 flex justify-center">
            <!-- skeleton loader -->
            <div class="card lg:card-side bg-base-100 shadow-xl animate-pulse" v-if="store.isLoader">
                <figure><div class="bg-slate-200 h-96 w-96 "></div></figure>
                <div class="card-body space-y-5">
                    <div class="space-y-5">
                        <div class="h-6 bg-slate-200 rounded"></div>
                        <div class="h-4 w-32 bg-slate-200 rounded"></div>
                        <div class="h-4 bg-slate-200 rounded w-32 "></div>
                    </div>
                    <div class="space-y-3">
                        <div class="h-2 bg-slate-200 rounded w-96 "></div>
                        <div class="h-2 bg-slate-200 rounded w-96 "></div>
                        <div class="h-2 bg-slate-200 rounded w-96 "></div>
                    </div>
                    <div class="flex items-end justify-end h-full ">
                        <div class="p-5 bg-slate-200 rounded w-28 "></div>
                    </div>
                </div>
            </div>

            <div class="card lg:card-side bg-base-100 shadow-xl" v-else>
                <figure><img :src="store.productDetails.imageUrl" alt="Album"/></figure>
                <div class="card-body">
                    <h2 class="card-title">Title : {{ store.productDetails.name }}</h2>
                    <div class="space-y-3">
                        <p class="font-semibold">Catgory : {{ store.productDetails.category }}</p>
                        <p class="font-semibold ">Price : {{ store.productDetails.price }}</p>
                    </div>
                    <div class="shrink w-96">
                        <p>{{ store.productDetails.description }}</p>
                    </div>
                    <div class="flex items-end justify-end h-full ">
                    <button @click="cartStore.addToCart(store.productDetails)" class="btn btn-primary">Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>