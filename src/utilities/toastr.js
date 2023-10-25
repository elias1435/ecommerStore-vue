import {reactive} from 'vue'

import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const toastr = reactive({
    success : function(message){
        toast.success(`${message}`)
    },

    info : function(message){
        toast.info(`${message}`)
    },

    warning : function(message){
        toast.warning(`${message}`)
    },

    error : function(message){
        toast.error(`${message}`)
    },
})

export default toastr