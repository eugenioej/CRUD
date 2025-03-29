import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Table,
  Button,
  Container,
  FormGroup,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

const data = [
  {
    id: 1,
    nombre: "Jorge Carranza",
    empresa: "Tec",
    puesto: "Ingeniero",
    experiencia: 5,
  },
  {
    id: 2,
    nombre: "Ramon Velez",
    empresa: "Banorte",
    puesto: "Analista",
    experiencia: 3,
  },
  {
    id: 3,
    nombre: "Hugo Sanchez",
    empresa: "Real Madrid",
    puesto: "Entrenador",
    experiencia: 10,
  },
  {
    id: 4,
    nombre: "Rafael Marquez",
    empresa: "Barcelona",
    puesto: "Defensor",
    experiencia: 15,
  },
  {
    id: 5,
    nombre: "Sergio Perez",
    empresa: "Oracle Red Bull Racing",
    puesto: "Piloto",
    experiencia: 12,
  },
  {
    id: 6,
    nombre: "Max Verstapen",
    empresa: "Oracle Red Bull Racing",
    puesto: "Piloto",
    experiencia: 8,
  },
];

class Manager extends React.Component {
  state = {
    data: data,
    modalActualizar: false,
    modalInsertar: false,
    form: {
      id: "",
      nombre: "",
      empresa: "",
      puesto: "",
      experiencia: "",
    },
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
    this.setState({ modalInsertar: true });
  };

  cerrarModalInsertar = () => {
    this.setState({ modalInsertar: false });
  };

  editar = (dato) => {
    let arreglo = this.state.data.map((registro) =>
      dato.id === registro.id ? { ...dato } : registro
    );

    this.setState({ data: arreglo, modalActualizar: false });
  };

  eliminar = (dato) => {
    let opcion = window.confirm(
      "¿Estás seguro que deseas eliminar el elemento " + dato.id + "?"
    );
    if (opcion === true) {
      let arreglo = this.state.data.filter(
        (registro) => registro.id !== dato.id
      );
      this.setState({ data: arreglo, modalActualizar: false });
    }
  };

  insertar = () => {
    let valorNuevo = { ...this.state.form };
    valorNuevo.id = this.state.data.length + 1;

    let lista = this.state.data;
    lista.push(valorNuevo);

    this.setState({ data: lista, modalInsertar: false });
  };

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
          <Button color="success" onClick={this.mostrarModalInsertar}>
            Crear
          </Button>
          <br />
          <br />
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Empresa</th>
                <th>Puesto</th>
                <th>Experiencia</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map((dato) => (
                <tr key={dato.id}>
                  <td>{dato.id}</td>
                  <td>{dato.nombre}</td>
                  <td>{dato.empresa}</td>
                  <td>{dato.puesto}</td>
                  <td>{dato.experiencia} años</td>
                  <td>
                    <Button
                      color="primary"
                      onClick={() => this.mostrarModalActualizar(dato)}
                    >
                      Editar
                    </Button>{" "}
                    <Button color="danger" onClick={() => this.eliminar(dato)}>
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>

        {/* Modal Insertar */}
        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader>
            <div>
              <h3>Insertar nombre</h3>
            </div>
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <label>Id:</label>
              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.data.length + 1}
              />
            </FormGroup>
            <FormGroup>
              <label>Nombre:</label>
              <input
                className="form-control"
                name="nombre"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <label>Empresa:</label>
              <input
                className="form-control"
                name="empresa"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <label>Puesto:</label>
              <input
                className="form-control"
                name="puesto"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <label>Experiencia (años):</label>
              <input
                className="form-control"
                name="experiencia"
                type="number"
                min="0"
                onChange={this.handleChange}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.insertar}>
              Insertar
            </Button>
            <Button
              className="btn btn-danger"
              onClick={this.cerrarModalInsertar}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>

        {/* Modal Actualizar */}
        <Modal isOpen={this.state.modalActualizar}>
          <ModalHeader>
            <div>
              <h3>Editar Registro</h3>
            </div>
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <label>Id:</label>
              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.form.id}
              />
            </FormGroup>
            <FormGroup>
              <label>Nombre:</label>
              <input
                className="form-control"
                name="nombre"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.nombre}
              />
            </FormGroup>
            <FormGroup>
              <label>Empresa:</label>
              <input
                className="form-control"
                name="empresa"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.empresa}
              />
            </FormGroup>
            <FormGroup>
              <label>Puesto:</label>
              <input
                className="form-control"
                name="puesto"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.puesto}
              />
            </FormGroup>
            <FormGroup>
              <label>Experiencia (años):</label>
              <input
                className="form-control"
                name="experiencia"
                type="number"
                min="0"
                onChange={this.handleChange}
                value={this.state.form.experiencia}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.editar(this.state.form)}
            >
              Editar
            </Button>
            <Button color="danger" onClick={this.cerrarModalActualizar}>
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}

export default Manager;
