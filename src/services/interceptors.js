import API from "@/Utils/API.js";
import Axios from "axios";
import router from "@/router/index.js";

Axios.defaults.baseURL = API.URL;

Axios.interceptors.request.use(function (request){
    if(sessionStorage.getItem('isLogged') == 'true')
        request.headers.Authorization = 'Bearer ' + sessionStorage.getItem('token');
    return request;
});

Axios.interceptors.response.use(response => {
    return response;
},error => {
    if(error.response.status === 401 && router.currentRoute.value.fullPath !='/')
    {
        console.log("Reponse interceptee");
        sessionStorage.removeItem('token');
        sessionStorage.setItem('isLogged', false);
        router.push('/');
    }
    return Promise.reject(error);

})

export default Axios;