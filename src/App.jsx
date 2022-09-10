import React from 'react';
import Router from './Router'
import "./assets/reset.css"
import "./assets/style.css"
import {Header} from './components/Header'
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  main: {
    padding: '90px 0',
  }
}));

const App = () => {
  const classes = useStyles();

  return(
    <>
      <Header/>
      <main className={classes.main}>
        <Router />
      </main>
    </>
  )
} 

export default App;
