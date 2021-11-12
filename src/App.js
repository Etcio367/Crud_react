import React from "react";
import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Table,
  Button,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
} from "reactstrap";

const data = [
  { id: 1, Nombre: "Erck", ape_pa: "Domínguez", ape_ma: "Galán", pss: 1234},
  { id: 2, Nombre: "Jesus Uriel", ape_pa: "Domínguez", ape_ma: "Galán", pss: 5574},
  { id: 3, Nombre: "Ivette Guadalupe", ape_pa: "Galán", ape_ma: "Alanis", pss: 5534 },
  { id: 4, Nombre: "Rodrigo", ape_pa: "Hernandez", ape_ma: "Perez", pss: 5525 },
  { id: 5, Nombre: "Joshua", ape_pa: "hambrocio", ape_ma: "Reyes", pss: 5539},
  { id: 6, Nombre: "Oddete", ape_pa: "Epigmeo", ape_ma: "Cuevas", pss: 5589},
];

class App extends React.Component {
  state = {
    data: data,
    modalActualizar: false,
    modalInsertar: false,
    modalInformar: false,
    form: {
      id: "",
      Nombre: "",
      ape_pa: "",
      ape_ma: "",
      pss: "",
    },
  };

  mostrarInfo = (dato) => 
  {
    this.setState({
      form: dato,
      modalInformar: true,
    });
  };

  cerrarModalInformar = () =>{
    this.setState({modalInformar: false})
  };

  mostrarModalActualizar = (dato) => {
    this.setState({
      form: dato,
      modalActualizar: true,
    });
  };

  cerrarModalActualizar = () => {
    this.setState({ modalActualizar: false });
  };

  mostrarModalInsertar = () => {
    this.setState({
      modalInsertar: true,
    });
  };

  cerrarModalInsertar = () => {
    this.setState({ modalInsertar: false });
  };

  editar = (dato) => {
    var contador = 0;
    var arreglo = this.state.data;
    arreglo.map((registro) => {
      if (dato.id == registro.id) {
        arreglo[contador].Nombre = dato.Nombre;
        arreglo[contador].anime = dato.anime;
        arreglo[contador].apellido = dato.apellido;
      }
      contador++;
    });
    this.setState({ data: arreglo, modalActualizar: false });
  };

  eliminar = (dato) => {
    var opcion = window.confirm("Estás Seguro que deseas Eliminar el elemento "+dato.id);
    if (opcion == true) {
      var contador = 0;
      var arreglo = this.state.data;
      arreglo.map((registro) => {
        if (dato.id == registro.id) {
          arreglo.splice(contador, 1);
        }
        contador++;
      });
      this.setState({ data: arreglo, modalActualizar: false });
    }
  };

  insertar= ()=>{
    var valorNuevo= {...this.state.form};
    valorNuevo.id=this.state.data.length+1;
    var lista= this.state.data;
    lista.push(valorNuevo);
    this.setState({ modalInsertar: false, data: lista });
  }

  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  render() {
    
    return (
      <>
        <Container>
        <br />
          <Button color="success" onClick={()=>this.mostrarModalInsertar()}>Crear</Button>
          <br />
          <br />
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Apellido paterno</th>
                <th>Apellido materno</th>
                <th>Contraseña</th>
                <th>Acción</th>
              </tr>
            </thead>

            <tbody>
              {this.state.data.map((dato) => (
                <tr key={dato.id}>
                  <td>{dato.id}</td>
                  <td>{dato.Nombre}</td>
                  <td>{dato.ape_pa}</td>
                  <td>{dato.ape_ma}</td>
                  <td>{dato.pss}</td>
                  <td>
                    <Button color="primary" onClick={() => this.mostrarModalActualizar(dato)}>Editar</Button>{" "}
                    <Button color="danger" onClick={()=> this.eliminar(dato)}>Eliminar</Button>{" "}
                    <Button color="info" onClick={() => this.mostrarInfo(dato)}>Leer</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>

        <Modal isOpen={this.state.modalActualizar}>
          <ModalHeader>
           <div><h3>Editar Registro</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
               Id:
              </label>
            
              <input
                className="form-control"
                readOnly
                type= "text"
                value={this.state.form.id}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Nombre: 
              </label>
              <input
                className="form-control"
                name="Nombre"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.Nombre}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Apellido paterno: 
              </label>
              <input
                className="form-control"
                name="ape_pa"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.ape_pa}
              />
            </FormGroup>

            <FormGroup>
                <label>Apellido materno</label>
                <input 
                  className="form-control"
                  name="ape_ma"
                  type="text"
                  onChange={this.handleChange}
                  value={this.state.form.ape_ma}
                />
            </FormGroup>

            <FormGroup>
                <label>Contraseña</label>
                <input 
                  className="form-control"
                  name="pss"
                  type="text"
                  onChange={this.handleChange}
                  value={this.state.form.pss}
                />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button color="danger" onClick={() => this.editar(this.state.form)}>Editar</Button>
            <Button color="success" onClick={() => this.cerrarModalActualizar()}>Cancelar</Button>
          </ModalFooter>
        </Modal>



        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader>
           <div><h3>Insertar Personaje</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
                Id: 
              </label>
              
              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.data.length+1}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Nombre: 
              </label>
              <input
                className="form-control"
                name="Nombre"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Apellido paterno: 
              </label>
              <input
                className="form-control"
                name="ape_pa"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
                <label>Apellido materno</label>
                <input 
                  className="form-control"
                  name="ape_ma"
                  type="text"
                  onChange={this.handleChange}
                />
            </FormGroup>

            <FormGroup>
                <label>Contraseña</label>
                <input 
                  className="form-control"
                  name="pss"
                  type="text"
                  onChange={this.handleChange}
                />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button color="primary" onClick={() => this.insertar()}>Insertar</Button>
            <Button className="btn btn-danger" onClick={() => this.cerrarModalInsertar()}>Cancelar</Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.modalInformar}>
          <ModalHeader>
            <div><h3>Información de usuario</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>Id: </label>

              <input
                className ="form-control"
                readOnly
                type="text"
                value={this.state.form.id}
              />                
            </FormGroup>

            <FormGroup>
              <label>Nombre: </label>

              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.form.Nombre}
              />
            </FormGroup>

            <FormGroup>
              <label>Apellido paterno: </label>
              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.form.ape_pa}
              ></input>
            </FormGroup>

            <FormGroup>
                <label>Apellido materno</label>
                <input 
                  className="form-control"
                  readOnly
                  type="text"
                  value={this.state.form.ape_ma}
                />
            </FormGroup>

            <FormGroup>
                <label>Contraseña</label>
                <input 
                  className="form-control"
                  readOnly
                  type="text"
                  value={this.state.form.pss}
                />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button color="success" onClick={() => this.cerrarModalInformar()}>Cerrar</Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}
export default App;
