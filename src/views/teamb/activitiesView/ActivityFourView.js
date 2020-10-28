import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Card, CardContent, Grid, TextField, makeStyles, InputLabel, Container, Divider } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import BreadCrumbs from 'src/views/teamb/activitiesView/BreadCrumbs';

const pais = [
  { value: 'advert', label: 'España'},
  { value: 'T1', label: 'Colombia'},
  { value: 'T2', label: 'Mexico'},
  { value: 'T3', label: 'USA'}
];
const ciudad = [
  { value: 'T1', label: 'Madrid'},
  { value: 'T2', label: 'Sevilla' },
  { value: 'T3', label: 'Barcelona'},
  { value: 'T4', label: 'Bilbao'}
];
const modalidad = [
  { value: 'T1', label: 'Presencial'},
  { value: 'T2', label: 'Virtual'}
];

const useStyles = makeStyles(() => ({
  root: {
    minWidth: 275,
    width: '70%',
    height: '730px',
    marginTop: '15px'
  },
  status: {
    color: 'green'
  }
}));

const ActivityFourView = ({ className, ...rest }) => {
  const classes = useStyles();
  const [values, setValues] = useState({
  });
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };
  const [emergente, setEmergente] = React.useState(false);
  const handleClose = () => {
    setEmergente(true);
  };
  const handleNo = () => {
    setEmergente(false);
  };

  return (
    <div>
      <BreadCrumbs />
    <Container>
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <form autoComplete="off" noValidate className={clsx(classes.root, className)} {...rest}>
        <Card className={classes.root}>
          <h1 style={{ display: 'flex', justifyContent: 'center' }} align="center" name="crearactividad" >Datos de detalle exposición de resultados parciales de investigación</h1>
          <br></br>
          <Divider/>
          <CardContent >
            <br></br>
            <Grid container spacing = {3}>
            <Grid item md={12} xs={12}>
              <TextField fullWidth label="Descripcion" name="descripcion" onChange={handleChange} required
                value={values.Descripcion} variant="outlined"
              />
              <br></br>
              <br></br>
              <Grid>
                <TextField id="date" label="Fecha de exposición" type="date" defaultValue="2017-05-24"
                  className={classes.textField} InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <br></br>
              
              <InputLabel >Lugar de exposición</InputLabel>
              <br></br>
              <Grid container spacing = {3} container justify="flex-start">
                <Grid item lg={2} md={2} xs={12}>
                  <TextField  label="Pais" name="programa" onChange={handleChange} required select 
                    SelectProps={{ native: true }} variant="outlined">
                    {pais.map((option) => (
                      <option key={option.value} value={option.value}> 
                        {option.label}
                      </option>
                    ))}
                  </TextField>
                </Grid>
                <Grid item lg={2} md={2} xs={12}>
                  <TextField label="Ciudad" name="programa" onChange={handleChange} required select
                    SelectProps={{ native: true }} variant="outlined">
                    {ciudad.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </TextField>
                </Grid>
              </Grid>
              <br></br>
              <TextField fullWidth label="Nombre del evento" name="descripcion" onChange={handleChange} required
                value={values.Descripcion} variant="outlined"/>
              <br></br>
              <br></br>
              <TextField fullWidth label="Modalidad de presentación" name="numero de horas asignadas" onChange={handleChange} 
                required select SelectProps={{ native: true }} variant="outlined">
                {modalidad.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
              <br></br>
              <br></br>
              <TextField fullWidth label="Duración en horas" name="descripcion" onChange={handleChange} required
                value={values.Descripcion} variant="outlined"/>
              
              <br></br>
              <br></br>
              <Button color="primary" variant="outlined"> Justificante </Button>
            </Grid>
            </Grid>
            <br></br>
          </CardContent>
          <Box display="flex" justifyContent="flex-end" p={2}>
            <Button onClick={handleClose} color="primary"variant="outlined">Cancelar</Button>
            <Button color="primary" variant="contained"> Guardar </Button>
            <Button color="primary" variant="contained"> Guardar y Enviar </Button>
          </Box>
        </Card>
      </form>
      <Dialog
        open={emergente}
        onClose={handleNo}
      >
        <DialogTitle id="alert-dialog-title">{"¿Está seguro que desea cancelar?"}</DialogTitle>
        <DialogContent>
        </DialogContent>
        <DialogActions>
        <RouterLink to = "../"> 
            <Button color="primary">
              Si
            </Button>
        </RouterLink>
          <Button onClick={handleNo} color="primary" autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog> 
    </div>
    </Container>
    </div>
  );
};
ActivityFourView.propTypes = {
  className: PropTypes.string
};
export default ActivityFourView;