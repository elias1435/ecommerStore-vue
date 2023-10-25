<script setup>
import { reactive } from 'vue';
import { userAuth } from '../store/auth';
import { Form, Field, ErrorMessage  } from 'vee-validate';
import * as yup from 'yup';

const auth = userAuth();

const inputCred = reactive({});

function LoginSubmit(){
    auth.isLoading = true
    auth.Login(inputCred);
}


const schema = yup.object({
    email : yup.string().required().email(),
    password : yup.string().required().min(4),
});

</script>

<template>
    <div class="bg-white h">
        <div class="w-full  p-2">
            <div class="flex justify-center items-center ">
                <div class="bg-base-900 w-4/12 shadow-xl rounded-md shadow-indigo-100 p-5 space-y-3">
                    <div class="title border-b-2 pb-3">
                        <h1 class="text-2xl text-gray-500 font-semibold">Login</h1>
                    </div>

                    <Form @submit="LoginSubmit()" :validation-schema="schema">
                        <div class="login-form ">
                            <div class="form-control">
                                <label class="label text-lg text-gray-600" for="email">Email</label>
                                <Field type="email" name="email" v-model="inputCred.email" class="input w-full input-bordered focus:border-none" id="email" placeholder="Email"/>
                                <ErrorMessage class="text-sm text-red-600 font-semibold" name="email" />
                            </div>
                            <div class="form-control">
                                <label class="label text-lg text-gray-600" for="password">Password</label>
                                <Field type="password" name="password" v-model="inputCred.password" class="input w-full input-bordered focus:border-none" id="password" placeholder="Password"/>
                                <ErrorMessage class="text-sm text-red-600 font-semibold" name="password" />
                            </div>
                            <div class="mt-5">
                                <button class="btn btn-primary"><span v-if="auth.isLoading" class="loading loading-spinner loading-md"></span>Login</button>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    </div>
</template>