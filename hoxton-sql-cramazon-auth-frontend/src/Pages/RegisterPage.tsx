import { useNavigate } from "react-router-dom";
import Form from "../components/loginRegisterForms/Form";
type Props ={
    setCurrentUser: Function
}

type RegisterData = {
    name: string,
    email: string,
    password: string
}

export default function RegisterPage({setCurrentUser}:Props){

    const navigate = useNavigate()

    function register(registerData: RegisterData){
        fetch('http://localhost:4000/register', {
            method: "POST",
            headers:{
                "content-type": "application/json"
            },
            body: JSON.stringify(registerData)
        })
        .then(resp => resp.json())
        .then(data => {
            console.log(registerData)
            localStorage.setItem("token", data.token)
            setCurrentUser(data.createdUser)
            navigate(-1)
        })
    }
    return <Form formSubmit={register} formTitle={"register"} />
    
}