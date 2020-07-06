import React, {useEffect, useState} from 'react'
import styled from "@emotion/styled";
import Error from "./Error"

import useMoneda from "../hooks/useMoneda";
import useCriptomoneda from "../hooks/useCriptomoneda";

import axios from 'axios';


const Boton = styled.input`
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66a2fe;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #FFF;
    transition: background-color 0.3s ease;

        &:hover{
            background-color: #326ac0;
            cursor: pointer
        }
`;

const Formulario = ({guardarCriptomoneda, guardarMoneda}) => {

    // State del listado de criptomonedas

    const [ listacritpo, guardarCriptomonedas ] = useState([]);
    const [ error, guardarError] = useState(false);


    const Monedas = [
        {codigo: "USD", nombre: "Dolar de Estados Unidos"},
        {codigo: "MXN", nombre: "Peso Mexicano"},
        {codigo: "ARG", nombre: "Peso Argentina"},
        {codigo: "EUR", nombre: "Euro"},
        {codigo: "GBP", nombre: "Libra Esterlina"}
    ]


    // utilizar useMoneda
    const [moneda, SelectMonedas] = useMoneda("Elige tu Moneda ", "", Monedas);

    // Utilizamos useCriptomoneda2
    const [criptomoneda, SelectCripto] = useCriptomoneda("Elige tu criptomoneda", "", listacritpo);

    // Ejecturar llamado a la Api

    useEffect(() => {
        const consultarApi = async () => {
            const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";

            const resultado = await axios.get(url);

            guardarCriptomonedas(resultado.data.Data);

        }
        consultarApi()
       
    }, [])

    // Cunado el usuario hace Submit

    const cotizarMoneda = (e) =>{
        e.preventDefault();

        // Validar si ambos campos estan llenos
        if(moneda === "" || criptomoneda=== "" || moneda === "---Selecione la Moneda---" || criptomoneda === "---Selecione la Criptomoneda ---"){
            guardarError(true);
            return
        }else{
            // Pasar los datos al componente principal
            guardarError(false);
            guardarMoneda(moneda);
            guardarCriptomoneda(criptomoneda);
        }

    }


    return ( 
        <form
            onSubmit = {cotizarMoneda}
        >
            {error ? <Error mensaje= "Todos los campos son obligatorios" /> : null}

            <SelectMonedas />
            <SelectCripto />

            
            <Boton 
                type= "submit"
                value= "Calular"
            />
        </form>
     );
}
 
export default Formulario;