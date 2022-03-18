import { useForm } from "react-hook-form";

type FormData = {
    name?: string
    email: string,
    password: string
}

type Props ={
    formSubmit: Function,
    formTitle: string,
    wrongCredentials? : string
}

export default function Form({formSubmit, formTitle, wrongCredentials = ""}:Props){
    const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>();
    const onSubmit = handleSubmit( data => {
        console.log(data)
        formSubmit(data)
    })

    // console.log(watch("example"), watch("exampleRequired")); // watch input value by passing the name of it
    return (
        <div className={`${formTitle}-page`}>
            <h2>{formTitle} Page</h2>
            <form className={`form ${formTitle}-form`} onSubmit={onSubmit}>
                {
                    formTitle === "register"
                    ? <input placeholder="Name..." {...register("name", { required:true })} />
                    : null
                }
                <input placeholder="Email..." {...register("email", { required: true }) } />
                <input placeholder="Password..." type="password" {...register("password", { required: true })} />

                {(errors?.name || errors.email || errors.password) && <span>This field is required</span>}
                { wrongCredentials && <span>{wrongCredentials}</span> }
                <input type="submit"/>
            </form>
        </div>
      );
    
}