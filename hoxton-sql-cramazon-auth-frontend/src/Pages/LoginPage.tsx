import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { UserType } from "../App"

type Prop = {
    currentUser?: UserType
    setCurrentUser: Function
}

export default function LoginPage({ currentUser, setCurrentUser}:Prop){
    

    const navigate = useNavigate() 
    const [credentials, setCreadetianls] = useState(true)
    // useEffect(()=>{
    //     if(currentUser){
    //         navigate(-1)
    //     }
    // })


    function login(email:string, password:string){
        fetch('http://localhost:4000/login',{
            method: "POST",
            headers:{
                "content-type": "application/json",
            },
            body: JSON.stringify({
                email, password
            })
        }).then(resp=> resp.json())
        .then(user => {
            if(user.message){
                setCreadetianls(false)
            }else{
                setCreadetianls(false)
                setCurrentUser(user)
                navigate(-1)
            }
        })
    }
    return (
        <div className="login-page">
            Log in
            <form 
                onSubmit={(e)=>{
                    e.preventDefault()
                    // @ts-ignore
                    const email = e.target.email.value
                    // @ts-ignore
                    const password = e.target.password.value
                    login(email, password)

            }} >
                <label htmlFor="email">
                    <input type="text" name="email" id="email" />
                </label>
                <label htmlFor="password">
                    <input type="password" name="password" id="password" />
                </label>
                <button type="submit">Log in</button>
            </form>
            {
                credentials? null
                : <span>Wrong user name or password</span>
            } 

        </div>
    )
}


