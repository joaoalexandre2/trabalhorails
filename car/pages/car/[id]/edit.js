import { useRouter } from "next/router"

function EditCar() {

    const router = useRouter()
    const { id } = router.query
    return (  
        <p>Página de Edição do Carro: {id} </p>
    );
}

export default EditCar;