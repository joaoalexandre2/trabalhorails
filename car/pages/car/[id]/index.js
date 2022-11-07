import { useRouter } from "next/router"
import {useEffect } from "react";

function ShowCar() {

    const router = useRouter()
    const { id } = router.query

    useEffect(() => {
       console.log("ROUTE", router)
    }, [])

    return ( 
        <p>Exibindo o Carro: {id}</p>
     );
}

export default ShowCar;