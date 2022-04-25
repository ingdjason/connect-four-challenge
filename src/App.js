import { Fragment } from 'react';
import './App.css';
import { Container, CssBaseline } from '@mui/material';
import MainComponent from './components/MainComponent';

const App = ({})=> {
  return (
    <Fragment>
      <CssBaseline />
      <Container maxWidth="md">
        <MainComponent />
      </Container>
    </Fragment>
    
  );
}

export default App;
