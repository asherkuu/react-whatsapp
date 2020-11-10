import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:5000",
});

export default instance;

/*
   "proxy" : "http://localhost:5000" 대신 사용가능 
   대신 axios 사용시에 가능하며 
   import axios from 'axios'; 대신
   현제 이 작성된 파일을 import 해야한다.
*/
