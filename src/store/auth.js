import {defineStore} from 'pinia'
import {ref,reactive} from 'vue'
import axios from 'axios'
import router from '../router/router'


const userAuth = defineStore('auth',()=>{
    
    const authUser = ref(JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')) : null);
    const token = ref(localStorage.getItem('token') ? localStorage.getItem('token') : null);

    const isLoading = ref(false);

    const Register = async (input) =>{
        let res = await axios.post(`http://localhost:8000/api/register`,input)

        if(res.data.status == 200){
            isLoading.value = false
            router.push('/login')
        }
    }

    const Login = async (cred)=>{
        let res = await axios.post(`http://localhost:8000/api/login`,cred)

        if(res.data.status == 200){
            localStorage.setItem('token',res.data.token)
            token.value = localStorage.getItem('token');
            localStorage.setItem('user',JSON.stringify(res.data.user))
            authUser.value = JSON.parse(localStorage.getItem('user'))
            isLoading.value = false
            router.push('/products')
        }
    }

    const Logout = () =>{
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        authUser.value = null
        router.push('/login')
        token.value = ''
    }

    return {authUser,Login,Logout,Register,isLoading, token}
});

export {userAuth}