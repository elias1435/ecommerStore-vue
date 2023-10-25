<script setup>
import { Icon } from '@iconify/vue';
import {ref} from 'vue'
import { userAuth } from '../../store/auth';
import { cart } from '../../store/cart';
const auth = userAuth();
const cartStore = cart();

const sideBarisActive = ref(true);

</script>

<template>
  <div class="wrapper">

      <div class="flex">
        <aside class="flex">
            <div class="h-screen overflow-y-auto sm:w-64 bg-white border-l border-r transition duration-500 dark:bg-gray-900 dark:border-gray-700" :class="sideBarisActive ? 'sidebarActive' : 'sidebarInActive'">
                
              <div class="w-full p-8 shadow-lg">
                <h1 class="text-xl font-medium  text-gray-500 dark:text-white text-center">
                  <span v-show="sideBarisActive">Ecommerce</span>
                  <span v-show="!sideBarisActive">Ecom</span>
                </h1>
              </div>

                <ul class="menu w-full space-y-2 mt-3">
                  <li><router-link to="/" :class="{actived: $route.name == 'home'}" class="py-2 text-lg"><Icon icon="mdi:home" width="28" /><span v-if="sideBarisActive">Home</span></router-link></li>
                  <li><router-link :class="{actived: $route.name == 'products'}" :to="{name:'products'}" class="py-2 text-lg"><Icon icon="mdi:alpha-p-box" width="28" /><span v-if="sideBarisActive">Products</span></router-link></li>
                  <li v-if="!auth.token"><router-link :class="{actived: $route.name == 'register'}" :to="{name:'register'}" class="py-2 text-lg"><Icon icon="mdi:register" width="28" /><span v-if="sideBarisActive">Register</span></router-link></li>
                  <li v-if="!auth.token"><router-link :class="{actived: $route.name == 'login'}" :to="{name:'login'}" class="py-2 text-lg"><Icon icon="mdi:login-variant" width="28" /><span v-if="sideBarisActive">Login</span></router-link></li>
                  <li><router-link :class="{actived: $route.name == 'cart'}" :to="{name:'cart'}" class="py-2 text-lg"><Icon icon="mdi:cart-outline" width="28" />
                    <span v-if="sideBarisActive">
                      Cart
                      <div class="badge bg-indigo-400 text-white border-none">{{ cartStore.totalCartItem }}</div>
                    </span></router-link>
                  </li>
                  

              </ul>
            </div>
        </aside>


        <main class="bg-gray-100 w-full">

          <!-- topbar start -->
          <div class="py-6 pr-8 border bg-white  shadow-md">
            <div class="flex justify-between">
              
              <button @click="sideBarisActive = !sideBarisActive"><Icon icon="akar-icons:three-line-horizontal" width="40" color="gray" /></button>

              <div class="user flex space-x-3">
                <h3 class="text-md text-indigo-700 mt-2">{{ auth.authUser?.name}}</h3>
                <div class="dropdown dropdown-end">
                
                <img tabindex="0" class="w-10 rounded-full ring-2" src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60" alt="">

                <ul tabindex="0" class="dropdown-content z-[1] menu p-2 mt-2 shadow-md shadow-indigo-200 bg-base-100 rounded-md w-52">
                  <li><a>Profile</a></li>
                  <li><a>Settings</a></li>
                  <li><button @click="auth.Logout()">Logout</button></li>
                </ul>

              </div>
              </div>
            </div>
          </div>
    <!-- topbar end -->
          
          <div class="p-8 m-5 shadow-lg rounded-md bg-white h-full ">
            <slot></slot>
          </div>
        </main>
    </div>
  </div>
</template>

<style scoped>

 .sidebarActive{
  width: 256px;
 }

 .sidebarInActive{
  width: 80px;
 }

 .actived{
  background-color: #bdbcbc;
  
 }
</style>
