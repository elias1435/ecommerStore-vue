<script setup>
import { products } from '../store/products';
import { onBeforeMount } from 'vue';
const store = products();

onBeforeMount(()=>{
    store.isLoader = true;
    store.getProducts()
});

</script>

<template>
    <div class="bg-white h-full">
        <div class="w-full p-2">
            <div class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                <!-- skeleton loader -->
                <div v-for="i in 12" :key="i" class="group relative shadow-lg animate-pulse" v-if="store.isLoader">
                    <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                        <div class="h-full w-full object-cover object-center lg:h-full lg:w-full"></div>
                    </div>
                    <div class="mt-3 flex justify-between p-4">
                        <div class="space-y-4"> 
                            <div class=" p-2 bg-slate-200 rounded w-16 "></div>
                            <div class="p-2 bg-slate-200 rounded w-16 "></div>
                        </div>
                        <div class="h-4 bg-slate-200 rounded w-20 "></div>
                    </div>
                </div>
                
                <div v-for="product in store.products" :key="product.id" class="group relative shadow-lg" v-else>
                    <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                        <router-link :to="{name: 'productDetails', params:{id:product.id}}">
                            <img :src="product.imageUrl" :alt="product.imageUrl" class="h-full w-full object-cover object-center lg:h-full lg:w-full" />
                        </router-link>
                    </div>
                    <div class="mt-4 flex justify-between p-4">
                        <div>
                            <h3 class="text-sm text-gray-700">
                                <router-link :to="{name: 'productDetails', params:{id:product.id}}">
                                    <span aria-hidden="true" class="absolute inset-0" />
                                    {{ product.name }}
                                </router-link>
                            </h3>
                            <p class="mt-1 text-sm text-gray-500">{{ product.brand }}</p>
                        </div>
                        <p class="text-sm font-medium text-gray-900">{{ product.price }}</p>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<style scoped>

</style>