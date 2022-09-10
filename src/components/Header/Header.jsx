import React, {useCallback, useState} from 'react';
import {createStyles, makeStyles}     from '@material-ui/core/styles';
import AppBar                         from '@material-ui/core/AppBar';
import Toolbar                        from '@material-ui/core/Toolbar';
import {useDispatch, useSelector}     from "react-redux";
import {getIsSignedIn}                  from "../../reducks/users/selectors";
import {HeaderMenus, ClosableDrawer}                   from "./index";
import {push}                         from "connected-react-router"

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuBar: {
            backgroundColor: "#fff",
            color: '#444',
        },
        toolbar: {
            margin: '0 auto',
            maxWidth: 1024,
            width: '100%'
        },
        iconButtons: {
            margin: '0 0 0 auto'
        }
    }),
);

const Header = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const isSignedIn = getIsSignedIn(selector);

  const [open, setOpen] = useState(false);

  const handleDrawerToggle = useCallback((event) => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
      }
      setOpen(!open)
  }, [setOpen, open]);

  return(
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.menuBar}>
          <Toolbar className={classes.toolbar}>
              <div onClick={() => dispatch(push('/'))}>
                1WC
              </div>
              {isSignedIn && (
                <div className={classes.iconButtons}>
                  <HeaderMenus handleDrawerToggle={handleDrawerToggle} />
                </div> 
              )}
          </Toolbar>
      </AppBar>
      <ClosableDrawer open={open} onClose={handleDrawerToggle} />

      
    </div>
  )
}

export default Header