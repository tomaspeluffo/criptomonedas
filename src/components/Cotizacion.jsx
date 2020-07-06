import React from 'react'
import styled from "@emotion/styled";


const ResultadoDiv = styled.div`
    color: #FFF;
    font-family: Arial, Helvetica, sans-serif;  

    span{
        font-weight: bold;
    }

`;

const Info = styled.p`
    color: #FFF;
    font-size: 18px;

`;

const Precio = styled.p`
    color: #FFF;
    font-size: 30px;

`;

const Cotizacion = ({resultado}) => {

    if(Object.keys(resultado).length === 0) return null;

    console.log(resultado);

    return ( 
        <ResultadoDiv>
            <Precio>El precio es: <span>{resultado.PRICE}</span></Precio>
            <Info>El precio mas alto del dia es : <span>{resultado.HIGHDAY}</span></Info>
            <Info>El precio mas bajo del dia es: <span>{resultado.LOWDAY}</span></Info>
            <Info>Variacion 24hs: <span>{resultado.CHANGEPCT24HOUR}</span></Info>
            <Info>Ultima Actualizacion: <span>{resultado.LASTUPDATE}</span></Info>


        </ResultadoDiv>

     );
}
 
export default Cotizacion;