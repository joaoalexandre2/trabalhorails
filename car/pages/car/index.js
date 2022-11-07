import React, { Component } from 'react';
import CarsHelpers from '../../helpers/carsHelpers';


class CarssView extends Component {

        constructor() {
            super();
            this.state ={
                cars_id:null, 
                cars_model:"", 
                cars_year:"",
                cars_brand_id: null,
                veiculos: [],
            };
            this.handleChangeCars_id = this.handleChangeCars_id.bind(this);
            this.handleChangeCars_model = this.handleChangeCars_model.bind(this);
            this.handleChangeCars_year = this.handleChangeCars_year.bind(this);
            this.handleChangeCars_brand_id = this.handleChangeCars_brand_id.bind(this);
            this.saveCars = this.saveCars.bind(this);
            this.loadCars = this.loadCars.bind(this);
            this.editCars = this.editCars.bind(this);
            this.handleChangeCars_brand_id = this.handleChangeCars_brand_id.bind(this);
          }
        componentDidMount() {
            this.loadCars();
        }
        handleChangeCars_id(event) {
            this.setState({cars_id: event.target.value});
        }
        handleChangeCars_model(event) {
            this.setState({cars_model: event.target.value});
        }
        handleChangeCars_year(event) {
            this.setState({cars_year: event.target.value});
        }
        handleChangeCars_brand_id(event) {
            this.setState({cars_brand_id: event.target.value});
        }
        saveCars(event) {
            event.preventDefault();
            if(
                this.state.cars_id!=null
                &&
                this.state.cars_id.length!=0
            ){
                CarsHelpers.update(
                    this.state.cars_id,
                    this.state.cars_model,
                    this.state.cars_year,
                    this.state.cars_brand_id
                ).then(res => {
                    console.log(res.data);
                }).catch(function (error) {
                    
                    console.log(JSON.stringify(error))
                });
            }
            else{
                CarsHelpers.create(
                    this.state.cars_model,
                    this.state.cars_year,
                    this.state.cars_brand_id
                ).then(res => {
                    console.log(res.data);
                }).catch(function (error) {
                    
                    console.log(JSON.stringify(error))
                });
            }

            this.loadCars();
        }   
        loadCars() {
            CarsHelpers.all().then(res => {
                this.setState({ veiculos: res.data });
            }).catch(function (error) {
    
                console.log(JSON.stringify(error))
            });
            this.forceUpdate();
        }
        editCars(id,event) {
           CarsHelpers.get(id).then(res => {
                console.log(res.data);
                this.setState({ cars_id: res.data.id });
                this.setState({ cars_model: res.data.model });
                this.setState({ cars_year: res.data.year });
                this.setState({ cars_brand_id: res.data.brand_id });
            }).catch(function (error) {
                console.log(JSON.stringify(error))
            });
        }
        deleteCars(id,event) {
            CarsHelpers.delete(id).then(res => {
                console.log(res.data);
            }).catch(function (error) {
                console.log(JSON.stringify(error))
            });
            this.loadCars();
        }
        render() {
            let rows = [];
            this.state.veiculos.forEach(element => {
                rows.push(
                    <tr class="w-100">
                        <th scope="row" style={{ "min-width": "50px"}}>{element.id}</th>
                        <td style={{ "width": "33%"}}>{element.brand_id}</td>
                        <td style={{ "width": "33%"}}>{element.model}</td>
                        <td style={{ "width": "33"}}>{element.year}</td>
                        <td style={{ "min-width": "170px"}} >
                            <button type="submit" class="btn btn-primary me-2" onClick={(e) => this.editCars(element.id,e)}>Editar</button>                
                            <button type="submit" class="btn btn-danger ms-2" onClick={(e) => this.deleteCars(element.id,e)}>Excluir</button>                
                        </td>
                    </tr>
                );
                
            });
            return (
                <>
                    <div class="h-100- w-100 d-flex flex-wrap justify-content-start  align-items-center bg-dark" style = {{height:"100vh"}}>
                        <div class="d-flex flex-wrap align-self-center col-md-6 mx-auto px-4 pb-3 pt-2 bg-light text-secondary">
                            <h1>Lista De veiculos</h1>
                            <form class="w-100" onSubmit={this.saveCars}>
                                <div class="form-group w-100">
                                    <label for="exampleInputnome1">Marca</label>
              
                                     <input type="text" class="form-control" placeholder="Digite a  marca do veiculo:" value={this.state.cars_brand_id} onChange={this.handleChangeCars_brand_id}/>
                                     <br></br>
                                     <label for="exampleInputnome1">Modelo</label>
                                    <input type="text" class="form-control" placeholder="Digite o nome do Carro" value={this.state.cars_model} onChange={this.handleChangeCars_model}/>
                                    
                                </div>
                                <div class="form-group w-100 pt-1">
                                    <label for="exampleInputnome1">Ano</label>
                                    <input type="text" class="form-control"  value={this.state.cars_year} onChange={this.handleChangeCars_year}/>
                                   
                                </div>
                                <div class="form-group w-100 pt-2">
                                    <button type="submit" class="btn btn-success">Salvar</button>                
                                </div>
                            </form>
                            <hr class="w-100 "/>
                            <table class="table table-striped w-100 ">
                                <thead class="thead-dark w-100 d-flex" >
                                    <tr class="w-100 ">
                                        <th scope="col" style={{ "min-width": "50px"}}>#</th>
                                        <th scope="col " style={{ "width": "33%"  }}>Marca</th>
                                        <th scope="col " style={{ "width": "33%"}}>Modelo</th>
                                        <th scope="col" style={{ "width": "33%"}} >Ano</th>
                                        <th scope="col" style={{ "min-width": "px"}} >Acões</th>
                                    </tr>
                                </thead>
                                <tbody class="w-100 d-flex flex-wrap " style={{ "min-height":"250px",height:"200px","min-width":"100%","overflow-y":"scroll"}}>
                                    {rows}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>

            )
        }
  }
  
  export default CarssView