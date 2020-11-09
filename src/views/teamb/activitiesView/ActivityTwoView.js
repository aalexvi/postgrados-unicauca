import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { Select, MenuItem, Box, Button, Card, CardContent, Grid, TextField, makeStyles, InputLabel, Typography, Container, Divider, Input } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import BreadCrumbs from 'src/views/teamb/activitiesView/BreadCrumbs';
import service from '../services/service';
import util from '../services/util';

import DialogContentText from '@material-ui/core/DialogContentText';
import Slide from '@material-ui/core/Slide';

//Transición  de la ventana emergente que muestra 
//el resultado de enviar los datos del formulario al backend
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const objService = new service();
const objUtil = new util();

const useStyles = makeStyles(() => ({
  root: {
    minWidth: 275,
    width: '70%',
    marginTop: '15px'
  },
  status: {
    color: 'green'
  }
}));

const ActivityTwoView = ({ className, ...rest }) => {
  const classes = useStyles();
  const [values, setValues] = useState({
    titulo:'',
    descripcion:'',
    nombreEvento:'',
    lugarCelebracion:'', 
  	institucionSeleccionado:'',
	  fechaRealizacion: ''
  });

  const [NumInstitutions, setInstitutions] = useState({
    institution: []
  })

  useEffect(() => {
      objService.GetInstitutions().then((result) => {
          var dataInstitutions = result.data;
          setInstitutions({ institution: dataInstitutions });
          
      }).catch(() => {
          alert("Error, no hay registros para mostrar");
      });
  }, []);
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };
  //Asignamos a "InstitucionSeleccionado"en  el valor de "event.target.value"
  const institucionSeleccionado = (event) => {
    setValues({
      ...values,
      institucionSeleccionado: event.target.value
    });
  };
  //TODO: Comentar 
  const fechaRealizacion = (event) => {
    setValues({
      ...values,
      fechaRealizacion: event.target.value
    });
  };
  // Costante para definir el estado de la ventana emergente de confirmación cuando se pulsa sobre el botón cancelar
  const [emergenteCancelar, setEmergenteCancelar] = React.useState(false);
  //TODO: Comentar
  const [emergenteGuardar, setEmergenteGuardar] = React.useState(false);
  const [emergenteGuardarYEnviar, setEmergenteGuardarYEnviar] = React.useState(false);
  const [errorTitulo, setErrorTitulo] = useState(null);
  const [errorDescripcion, setErrorDescripcion] = useState(null);
  const [errorNombreEvento, setErrorNombreEvento] = useState(null);
  const [errorLugar, setErrorLugar] = useState(null);
  const [errorInstitucion, setErrorInstitucion] = useState(null);
  const [errorFechas, setErrorFechas] = useState(null);


  // Costante para definir el estado de la ventana emergente que muestra 
  //el resultado de enviar los datos del formulario al backend
  const [emergenteEnviarBack, setEmergenteEnviarBack] = React.useState(false);

  // Costante para definir el mensaje de la ventana emergente que muestra 
  //el resultado de enviar los datos del formulario al backend
  const [resultadoBack, setResultadoBack] = useState(null);

  const handleEnviarBackAceptar = () => {
    if(resultadoBack == "Actividad registrada correctamente") {
      window.location.href = window.location.href;
    }
    setEmergenteEnviarBack(false);
    setResultadoBack(null);
  };



  // Se modificó "handleClose" para que despliegue la ventana emergente
  const handleClose = () => {
    setEmergenteCancelar(true);
  };
  // "handleNo" controla cuando se da click en el botón "NO" de la ventana emergente
 const handleCancelarNo = () => {
  setEmergenteCancelar(false);
  };

  //TODO: Comentar
  const handleGuardar = () => {
    if(validar()){
      setEmergenteGuardar(true);
    }
  };

  // "handleCancelarNo" controla cuando se da click en el botón "NO" de la ventana emergente
  const handleGuardarNo = () => {
    setEmergenteGuardar(false);
  };
  //"validar" permite verificar que todos los campos requeridos se encuentren diligenciados 
  const validar =()=>{
    var result = true;

    if(values.titulo.length){
      setErrorTitulo(null)
    }
    else{
      setErrorTitulo("El campo es obligatorio");
      result = false;
    }
    if(values.descripcion.length){
      setErrorDescripcion(null)
    }
    else{
      setErrorDescripcion("El campo es obligatorio");
      result = false;
    }
    if(values.nombreEvento.length){
      setErrorNombreEvento(null)
    }
    else{
      setErrorNombreEvento("El campo es obligatorio");
      result = false;
    }
	  if(values.lugarCelebracion.length){
      setErrorLugar(null)
    }
    else{
      setErrorLugar("El campo es obligatorio");
      result = false;
    }
    if(values.institucionSeleccionado != ""){
      setErrorInstitucion(null)
    }
    else{
      setErrorInstitucion("Seleccione una opción válida");
      result = false;
    }
	  if(values.fechaRealizacion.length){
        setErrorFechas("")
    }    
    else{
        setErrorFechas("Seleccióne una fecha");
        result = false;  
    }
    return result;
  }

  //TODO: Comentar
  const handleGuardarYEnviar = () => {
    
    if(validar()){
      setEmergenteGuardarYEnviar(true);
    }
  };
	const handleGuardarYEnviarNo = () => {
    
    setEmergenteGuardarYEnviar(false);
    };

  const [archivo, setArchivo] = useState(null);

  const uploadFile = e => {
    setArchivo(e);
  }

  const SaveActivity = () => {
    var vartitulo = document.getElementById("titulo").value;
    var vardescripcion = document.getElementById("descripcion").value;
    var varnombreevento = document.getElementById("nombreevento").value;
    var varlugarcelebracion = document.getElementById("lugarcelebracion").value;
    var varentidadorganizadora = values.institucionSeleccionado;
    var vardate = document.getElementById("date").value;
    var now = objUtil.GetCurretTimeDate();
    //Se captura el valor booleano de "emergenteGuardarYEnviar" y se envía en el 
    //documento JSON con el fin de saber si se debe enviar el email a quien corresponda
    var send_email = emergenteGuardarYEnviar;

    const fd = new FormData();

    fd.append("title", vartitulo);
    fd.append("description", vardescripcion);
    fd.append("name", varnombreevento);
    fd.append("place", varlugarcelebracion);
    fd.append("institution", varentidadorganizadora);
    fd.append("start_date", vardate);
    fd.append("state", 1); 
    fd.append("academic_year", "2020-21"); // Consultar año academico actual 
    fd.append("type", 2);
    fd.append("student", 36); // Consultar el id del estudiante actual
    fd.append("date_record", now);
    fd.append("date_update", now);
    fd.append("send_email", send_email);
    fd.append("receipt", archivo[0]);
    
    objService.PostActivityTwo(fd).then((result) => { 
      setResultadoBack("Actividad registrada correctamente");
    }).catch(() => {
      setResultadoBack("Ups! Ha ocurrido un error al registrar la actividad, verifique los campos o intentelo mas tarde");
    });
    setEmergenteEnviarBack(true);
    setEmergenteGuardar(false);
    setEmergenteGuardarYEnviar(false);
  }
  
  return (
    <div>
      <BreadCrumbs />
      <Container>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <form autoComplete="off" noValidate className={clsx(classes.root, className)} {...rest}>
            <Card className={classes.root}>
              <h1 style={{ display: 'flex', justifyContent: 'center' }} align="center" name="crearactividad">
                Datos de detalle ponencias en congreso, simposios y/o jornadas
              </h1>
              <Divider />
              <CardContent >
                <Grid item md={12} xs={12}>
                <TextField fullWidth label="Titulo de la contribución" id="titulo" name="titulo" onChange={handleChange} required value={values.titulo} variant="outlined"/>
                  {/* TODO: Comentar */}
                  {errorTitulo? <p style={{ display: 'flex', color:'red' }}>{errorTitulo}</p>:null}
                  <br></br>
                  <br></br>
                  <TextField fullWidth label="Descripcion general" id="descripcion" name="descripcion" onChange={handleChange} required value={values.descripcion} variant="outlined"/>
                  {/* TODO: Comentar */}
                  {errorDescripcion? <p style={{ display: 'flex', color:'red' }}>{errorDescripcion}</p>:null}
                  <br></br>
                  <br></br>
                  <TextField fullWidth label="Nombre del evento" id="nombreevento" name="nombreEvento" onChange={handleChange} required value={values.nombreEvento} variant="outlined"/>
                  {/* TODO: Comentar */}
                  {errorNombreEvento? <p style={{ display: 'flex', color:'red' }}>{errorNombreEvento}</p>:null}
                  <br></br>
                  <br></br>
                  <TextField fullWidth label="Lugar de celebracion" id="lugarcelebracion" name="lugarCelebracion" onChange={handleChange} required value={values.lugarCelebracion}
                    variant="outlined"/>
                     {/* TODO: Comentar */}
                    {errorLugar? <p style={{ display: 'flex', color:'red' }}>{errorLugar}</p>:null}
                  <br></br>
                  <br></br>
                  <InputLabel>Entidad organizadora *</InputLabel>
                  <Select fullWidth label="Entidad organizadora" id="entidadorganizadora" type="select" defaultValue
                  variant="outlined" onChange={institucionSeleccionado}
                    >
                    {NumInstitutions.institution.map(element => (
                      <MenuItem key={element.id} value={element.id}> {element.name_inst} </MenuItem>
                    ))}
                  </Select>
                  {/* TODO: Comentar */}
                  {errorInstitucion? <p style={{ display: 'flex', color:'red' }}>{errorInstitucion}</p>:null}
                  <br></br>
                  <br></br>
                  <TextField id="date" label="Fecha de realización" type="date"
                    className={classes.textField} InputLabelProps={{ shrink: true }}
                    onChange={fechaRealizacion}/>
                  <br></br>
                  {errorFechas? <p style={{ display: 'flex', color:'red' }}>{errorFechas}</p>:null}
                  <br></br>
                  {/*<Button color="primary" variant="outlined"> Agregar premio </Button>
                  <br></br>
                  <br></br>*/}
                  <InputLabel>Justificante *</InputLabel>
                  <Input type="file" name="file" inputProps={{ accept: '.pdf' }} onChange={(e) => uploadFile(e.target.files)} />
                </Grid>
                <br></br>
              </CardContent>

              <Box display="flex" justifyContent="flex-end" p={2}>
                {/* Se le agrega la propiedad onClick para lanzar la ventana emergente de 
                confirmación cuando se pulsa sobre el botón cancelar, se debe quitar la propiedad RouterLink */}
                <Button onClick={handleClose} color="primary"variant="outlined">Cancelar</Button>&nbsp;

                <Button onClick={handleGuardar} color="primary" variant="contained"> Guardar </Button>&nbsp;

                <Button onClick={handleGuardarYEnviar} color="primary" variant="contained"> Guardar y Enviar </Button>
              </Box>
            </Card>
          </form>
          {/*HTML que lanza la ventana emergente de confirmación cuando se pulsa sobre el botón "cancelar" en "Crear Actividad" */}
          <Dialog open={emergenteCancelar} onClose={handleCancelarNo} >
            <DialogTitle id="alert-dialog-title">{"¿Está seguro que desea cancelar?"}</DialogTitle>
            <DialogContent>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleCancelarNo} color="primary" autoFocus>No</Button>
            <RouterLink to = "../"> 
                <Button color="primary">Si</Button>
            </RouterLink>
            </DialogActions>
          </Dialog> 
          
          {/*HTML que lanza la ventana emergente de confirmación cuando se pulsa sobre el botón "GUARDAR" en "Crear Actividad" */}
          <Dialog open={emergenteGuardar} onClose={handleGuardarNo} >
            <DialogTitle id="alert-dialog-title">{"¿Esta seguro que desea guardar la actividad?"}</DialogTitle>
            <DialogContent>
            </DialogContent>
            <DialogActions>
              {/* TODO: Enviar a backend y guardar */}
              <Button onClick={handleGuardarNo} color="primary" autoFocus>No</Button>
              <Button onClick={SaveActivity} color="primary">Si</Button>
            </DialogActions>
          </Dialog> 
          
          {/*HTML que lanza la ventana emergente de confirmación cuando se pulsa sobre el botón "GUARDAR Y ENVIAR" 
            en "Crear Actividad" */}
          <Dialog open={emergenteGuardarYEnviar} onClose={handleGuardarYEnviarNo}>
        <DialogTitle id="alert-dialog-title">{"¿Esta seguro que desea guardar y enviar la actividad?"}</DialogTitle>
        <DialogContent>
        </DialogContent>
        <DialogActions>
        {/* TODO: GUARDAR EN BACK Y ENVIAR POR E-MAIL */}
          <Button onClick={handleGuardarYEnviarNo} color="primary" autoFocus>No</Button>
          <Button color="primary" onClick={SaveActivity} >Si</Button>
        </DialogActions>
      </Dialog>  
        
                    


          {/* HTML que muestra el resultado de enviar los datos del formulario al backend */}
          <Dialog
            open={emergenteEnviarBack}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleEnviarBackAceptar}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle id="alert-dialog-slide-title">{"Resultado"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
              {resultadoBack? <Typography component={'span'} variant={'body2'}>{resultadoBack}</Typography>:null}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleEnviarBackAceptar} color="primary">
                Aceptar
              </Button>
            </DialogActions>
          </Dialog>


        </div>
      </Container>
    </div>
  );
};
ActivityTwoView.propTypes = {
  className: PropTypes.string
};
export default ActivityTwoView;
