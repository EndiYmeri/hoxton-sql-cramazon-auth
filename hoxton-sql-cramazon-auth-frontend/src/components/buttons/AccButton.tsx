import { useNavigate } from "react-router-dom"

type Prop ={
    buttonClass: string,
    buttonName: string,
    navigateLoc?: string,
    logOut?: Function
}

export default function AccButton({buttonClass, buttonName,navigateLoc="", logOut}:Prop){
    const navigate = useNavigate()

    return(
        <button 
        className={`button ${buttonClass}-button`}
        onClick={()=>{
            logOut? logOut()
            : navigate(`/${navigateLoc}`)
        }
        }
        >{buttonName}</button>
    )
}