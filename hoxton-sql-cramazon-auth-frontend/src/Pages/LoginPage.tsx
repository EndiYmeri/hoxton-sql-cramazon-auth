import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { UserType } from "../App"
import Form from "../components/loginRegisterForms/Form"

type Prop = {
    currentUser?: UserType
    setCurrentUser: Function
}

type LoginData ={
    email: string
    password: string
}

export default function LoginPage({ currentUser, setCurrentUser}:Prop){
    

    const navigate = useNavigate() 
    const [credentials, setCreadetianls] = useState("")


    function login(loginData : LoginData){
        fetch('http://localhost:4000/login',{
            method: "POST",
            headers:{
                "content-type": "application/json",
            },
            body: JSON.stringify(loginData)
        })
        .then(resp=> resp.json())
        .then(data => {
            if(data.message){
                setCreadetianls(data.message)
            }else{
                setCurrentUser(data)
                // localStorage.setItem("token", data.token)
                navigate(-1)
            }
        })
    }
    return <Form formSubmit={login} formTitle={"login"} wrongCredentials={credentials} />
}


