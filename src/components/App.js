import React, { Component } from 'react'
import Header from './Header'
import Formulario from './Formulario'
import Resumen from './Resumen'
import Resultado from './Resultado'
import { obtenerDiferenciaAnio, calcularMarca, obtenerPlan } from '../helper'

export default class App extends Component {

  state = {
    resultado : '',
    datos: {
      marca: '',
      year: '',
      plan: ''
    }
  }
  
  cotizarSeguro = (datos) => {
    const {marca, plan, year} = datos

    //Agregar una base de 2000
    let resultado = 2000

    //obtener la diferencia de años y 
    const diferencia = obtenerDiferenciaAnio(year)
    
    //por cada año restar 3%
    resultado -= ((diferencia * 3) * resultado ) / 100
    //americano 15%, Asiatico 5% y Europeo 30% de incremento del valor actual
    resultado = calcularMarca(marca) * resultado


    // el plan del auto, el basico aumenta el valor en 20% y el completo 50%
    resultado = parseFloat(obtenerPlan(plan) * resultado).toFixed(2)  
    console.log(resultado)

    const datosAuto = {
      marca: marca,
      year: year,
      plan: plan
    }
    
    this.setState({
      resultado: resultado,
      datos: datosAuto
    })

  }

  render() {
    return (
      <div className="contenedor">
        <Header 
          title="Cotizador de Seguros de Autos"
        />

        <div className="contenedor-formulario">
          <Formulario 
            cotizarSeguro={this.cotizarSeguro}/> 
        </div>

        <div className="contenedor-resumen">
          <Resumen 
            datos={this.state.datos}
          />
        </div>

        <div className="contenedor-resultado">
          <Resultado 
            resultado={this.state.resultado}
          />
        </div>

      </div>
    )
  }
}
