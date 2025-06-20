import React, {useCallback, useEffect, useState} from 'react';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {makeStyles, createStyles } from '@material-ui/core/styles';
import {push} from "connected-react-router";
import {useDispatch, useSelector} from "react-redux";
import {signOut} from "../../reducks/users/operations";
import {TextInput} from "../Ulkit";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import HistoryIcon from '@material-ui/icons/History';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import LibraryAddCheckIcon from '@material-ui/icons/LibraryAddCheck';
import {db} from "../../firebase";

const useStyles = makeStyles((theme) =>
    createStyles({
        drawer: {
            [theme.breakpoints.up('sm')]: {
                width: 256,
                flexShrink: 0,
            }
        },
        toolbar: theme.mixins.toolbar,
        drawerPaper: {
            width: 256,
        },
        searchField: {
            alignItems: 'center',
            display: 'flex',
            marginLeft: 32
        }
    }),
);

const ClosableDrawer = (props) => {
  const { container } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector(state  => state);
  const [keyword, setKeyword] = useState("");

  const inputKeyword = useCallback((event) => {
    setKeyword(event.target.value)
  }, [setKeyword])

  const selectMenu = (event, path) =>{
    dispatch(push(path))
    props.onClose(event)
  }

  // const menus = [
  //   {func: selectMenu, label: "目標一覧", icon: <LibraryAddCheckIcon />, id: "index", value: "target"},
  //   {func: selectMenu, label: "目標登録", icon: <AddCircleIcon />, id: "target", value: "target/edit"},
  //   {func: selectMenu, label: "達成した目標", icon: <HistoryIcon />, id: "chistory", value: "complete/history"},
  //   {func: selectMenu, label: "商品登録", icon: <AddCircleIcon />, id: "register", value: "product/edit"},
  //   {func: selectMenu, label: "注文履歴", icon: <HistoryIcon />, id: "history", value: "order/history"},
  //   {func: selectMenu, label: "プロフィール", icon: <PersonIcon />, id: "profile", value: "user/mypage"},
  // ];

  return(
    <nav className={classes.drawer}>
      <Drawer
        container={container}
        variant="temporary"
        anchor="right"
        open={props.open}
        onClose={ (e)=> props.onClose(e) }
        classes={{ paper: classes.drawerPaper }}
        ModalProps={{ keepMounted: true }}
      >
        <div>
          <div className={classes.searchField}>
            <TextInput 
              fullWidth={false} label="キーワードを入力" multiline={false} onChange={inputKeyword} required={false} rows={1} value={keyword} type={"text"}
             />
             <IconButton>
                <SearchIcon />
             </IconButton>
          </div>
          <Divider />
          <List>
            <ListItem button key="target"  onClick={(e) => selectMenu(e,'/target') } >
              <ListItemIcon>
                <LibraryAddCheckIcon />
              </ListItemIcon>
              <ListItemText primary={"目標一覧"} />
            </ListItem>
            <ListItem button key="targetEdit" onClick={(e) => selectMenu(e,'/target/edit') }>
              <ListItemIcon>
                <AddCircleIcon />
              </ListItemIcon>
              <ListItemText primary={"目標登録"} />
            </ListItem>
            <ListItem button key="join" onClick={(e) => selectMenu(e,'/join') }>
              <ListItemIcon>
                <HistoryIcon />
              </ListItemIcon>
              <ListItemText primary={"参加済み"} />
            </ListItem>
            <ListItem button key="completeHistory" onClick={(e) => selectMenu(e,'/complete/history') }>
              <ListItemIcon>
                <HistoryIcon />
              </ListItemIcon>
              <ListItemText primary={"達成した目標"} />
            </ListItem>
            <ListItem button key="logout" onClick={ ()=>dispatch(signOut()) }>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary={"Logout"} />
            </ListItem>
            <ListItem button key="productEdit" onClick={ ()=>  dispatch(push('/product/edit')) }>
              <ListItemIcon>
                <AddCircleIcon />
              </ListItemIcon>
              <ListItemText primary={"商品登録"} />
            </ListItem>
            <ListItem button key="productHistory" onClick={ ()=>  dispatch(push('/order/history')) }>
              <ListItemIcon>
                <HistoryIcon />
              </ListItemIcon>
              <ListItemText primary={"注文履歴"} />
            </ListItem>
          </List>
          {/* <List>
            {menus.map(menu => (
              <ListItem button key={menu.id} onClick={ (e) => menu.func(e, menu.value) }>
                <ListItemIcon>
                  {menu.icon}
                </ListItemIcon>
                <ListItemText primary={menu.label} />
              </ListItem>
            ))}

            <ListItem button key="logout" onClick={ ()=>dispatch(signOut()) }>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary={"Logout"} />
            </ListItem>
          </List> */}
        </div>
      </Drawer>
    </nav>
  )
}

export default ClosableDrawer