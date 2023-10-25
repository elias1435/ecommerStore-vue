<script setup>
    import {Icon} from '@iconify/vue';
    import {cart} from '../store/cart';
    import { userAuth } from '../store/auth';
    import {order} from '../store/order'
    import toastr from '../utilities/toastr'

    const cartStore = cart();
    const authStore = userAuth();
    const orderStore = order();


    function CheckOut(){
        if(authStore.token){
            orderStore.isLoading = true
            cartStore.sendToOrder();
        }else{
            toastr.error('You have to login before Checkout')
        }
    }



</script>

<template>
    <div class="bg-white h">
        <div class="w-full  p-2">
            <div class="flex justify-center items-center ">
                <div class="bg-base-900 w-10/12 shadow-xl rounded-md shadow-indigo-100 p-5 space-y-3">
                    <div class="title p-3 mb-6 border-b-2 border-indigo-400">
                        <h1 class="text-xl text-indigo-500 font-semibold">Cart List </h1>
                    </div>

                    <div class="space-y-8">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th class="w-20 text-sm">#</th>
                                    <th class="w-99 text-sm">Title</th>
                                    <th class="w-60 text-sm">Quantity</th>
                                    <th class="w-36 text-sm">Price</th>
                                    <th class="w-36 text-sm">Subtotal</th>
                                    <th class="w-20 text-sm">Action</th>
                                </tr>
                            </thead>
                            <tbody v-if="Object.keys(cartStore.cartItems).length > 0">
                                <tr class="hover" v-for="(item, index) in cartStore.cartItems" :key="index">
                                    <th>{{ index }}</th>
                                    <td>
                                    <div class="flex items-center space-x-3">
                                        <div class="avatar">
                                            <div class="mask mask-squircle w-12 h-12">
                                                <img :src="item.product.imageUrl" alt="" />
                                            </div>
                                        </div>
                                        <div>
                                            <div class="font-bold">{{item.product.name}}</div>
                                        </div>
                                    </div>
                                    </td>
                                    <td><input type="number" v-model="item.quantity" placeholder="Input Quantity"
                                            class="input border-indigo-400 focus:border-none input-info w-full max-w-xs">
                                    </td>
                                    <td>{{ item.product.price }}</td>
                                    <td>{{ item.quantity * item.product.price }}</td>
                                    <td><Icon @click="cartStore.removeCartItem(index)" icon="jam:delete" class="text-red-500 transition duration-400 hover:scale-125" width="32" /></td>
                                </tr>
                            </tbody>

                            <tbody v-else>
                                <tr><td colspan="6" class="text-center text-sm font-semibold">No cart item found</td></tr>
                            </tbody>

                            <tfoot v-if="Object.keys(cartStore.cartItems).length > 0">
                                <tr class="hover">
                                    <td colspan="4" class="text-right text-lg font-semibold">Total =</td>
                                    <td colspan="2" class="text-sm">{{ cartStore.totalAmmount }}</td>
                                </tr>
                            </tfoot>
                        </table>

                        <div class="btn-wrapper" v-if="Object.keys(cartStore.cartItems).length > 0">
                            <button @click="CheckOut" class="btn btn-primary"><Icon v-if="!orderStore.isLoading" icon="mdi:check-circle-outline" width="28" /><span v-if="orderStore.isLoading" class="loading loading-spinner loading-md"></span>CheckOut</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>