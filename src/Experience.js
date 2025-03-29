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

// Datos de ejemplo para que el CRUD no esté vacío al inicio
const data = [
  {
    id: 1,
    titulo: "Prácticas en desarrollo web",
    empresa: "Looma Studio",
    inicio: "2023-01-01",
    fin: "2023-06-30",
    descripcion:
      "Participé en el desarrollo de páginas web usando React y WordPress.",
  },
  {
    id: 2,
    titulo: "Analista de datos",
    empresa: "Whitepaper",
    inicio: "2024-01-01",
    fin: "2024-12-31",
    descripcion:
      "Trabajé limpiando y visualizando datos para reportes financieros.",
  },
];

class Experience extends React.Component {
  state = {
    data: data,
    modalActualizar: false,
    modalInsertar: false,
    form: {
      id: "",
      titulo: "",
      empresa: "",
      inicio: "",
      fin: "",
      descripcion: "",
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
    const actualizado = this.state.data.map((registro) =>
      dato.id === registro.id ? { ...dato } : registro
    );
    this.setState({ data: actualizado, modalActualizar: false });
  };

  eliminar = (dato) => {
    const confirmar = window.confirm(
      "¿Estás seguro que deseas eliminar esta experiencia?"
    );
    if (confirmar) {
      const nuevoArreglo = this.state.data.filter(
        (registro) => registro.id !== dato.id
      );
      this.setState({ data: nuevoArreglo });
    }
  };

  insertar = () => {
    const nuevaExperiencia = { ...this.state.form };
    nuevaExperiencia.id = this.state.data.length + 1;

    const lista = this.state.data;
    lista.push(nuevaExperiencia);

    this.setState({ data: lista, modalInsertar: false });
  };

  handleChange = (e) => {
    // Esta función actualiza el formulario cada vez que se cambia un input
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
          <h2>CRUD de Experiencias Profesionales</h2>
          <Button color="success" onClick={this.mostrarModalInsertar}>
            Agregar nueva experiencia
          </Button>
          <br />
          <br />
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Título</th>
                <th>Empresa</th>
                <th>Inicio</th>
                <th>Fin</th>
                <th>Descripción</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map((dato) => (
                <tr key={dato.id}>
                  <td>{dato.id}</td>
                  <td>{dato.titulo}</td>
                  <td>{dato.empresa}</td>
                  <td>{dato.inicio}</td>
                  <td>{dato.fin}</td>
                  <td>{dato.descripcion}</td>
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

        {/* Modal para insertar experiencia */}
        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader>
            <h4>Agregar experiencia</h4>
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <label>Título:</label>
              <input
                className="form-control"
                name="titulo"
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
              <label>Fecha de inicio:</label>
              <input
                className="form-control"
                name="inicio"
                type="date"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <label>Fecha de cierre:</label>
              <input
                className="form-control"
                name="fin"
                type="date"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <label>Descripción:</label>
              <textarea
                className="form-control"
                name="descripcion"
                onChange={this.handleChange}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.insertar}>
              Guardar
            </Button>
            <Button color="danger" onClick={this.cerrarModalInsertar}>
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>

        {/* Modal para editar experiencia */}
        <Modal isOpen={this.state.modalActualizar}>
          <ModalHeader>
            <h4>Editar experiencia</h4>
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <label>Título:</label>
              <input
                className="form-control"
                name="titulo"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.titulo}
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
              <label>Fecha de inicio:</label>
              <input
                className="form-control"
                name="inicio"
                type="date"
                onChange={this.handleChange}
                value={this.state.form.inicio}
              />
            </FormGroup>
            <FormGroup>
              <label>Fecha de cierre:</label>
              <input
                className="form-control"
                name="fin"
                type="date"
                onChange={this.handleChange}
                value={this.state.form.fin}
              />
            </FormGroup>
            <FormGroup>
              <label>Descripción:</label>
              <textarea
                className="form-control"
                name="descripcion"
                onChange={this.handleChange}
                value={this.state.form.descripcion}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.editar(this.state.form)}
            >
              Actualizar
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

export default Experience;
