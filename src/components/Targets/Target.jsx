import React from 'react'
import {push} from "connected-react-router"
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import NoImage from '../../assets/img/src/no_image.png'
import {useDispatch, useSelector} from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {deleteTarget} from "../../reducks/targets/operations";
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import { getUserName } from '../../reducks/users/selectors';

const useStyles = makeStyles((theme) => ({
  root: {
      [theme.breakpoints.down('sm')]: {
          margin: 8,
          width: 'calc(100% - 16px)'
      },
      [theme.breakpoints.up('md')]: {
          margin: 16,
          width: 'calc(50% - 32px)'
      }
  },
  content: {
      display: 'flex',
      padding: '16 8',
      textAlign: 'left',
      '&:last-child': {
          paddingBottom: 16
      }
  },
  icon: {
      marginRight: 0,
      marginLeft: 'auto'
  },
  media: {
      height: '150px',
      paddingTop: '100%',
      width: '100%',
  },
  description: {
      fontSize: 16

  },
  productName: {
      boxOrient: 'vertical',
      display: '-webkit-box',
      fontSize: 14,
      lineHeight: '18px',
      overflow: 'hidden',
      [theme.breakpoints.down('sm')]: {
          height: 36,
          lineClamp: 2,
      },
      [theme.breakpoints.up('md')]: {
          height: 18,
          lineClamp: 1,
      }
  },
  ellipsis: {
    width: '100px',
    whiteSpace: 'nowrap',
    overFlow: 'hidden',
    textOverflow: 'ellipsis',
}
}));

const Target = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null)
  const images = (props.images.length > 0) ? props.images : [{path: NoImage}];
  const selector = useSelector(state => state);
  const username = getUserName(selector)
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
      setAnchorEl(null);
  };

  return(    
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar alt={username} src="/static/images/avatar/1.jpg" />
        }
        title={props.name}
        subheader={username+"さんが作成"}
      />
      {/* <CardMedia
        height="80"
        image={images[0].path}
        onClick={() => dispatch(push('/target/detail/'+props.id))}
        title=""
      />     */}
      <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image={images[0].path}
          title="Contemplative Reptile"
          onClick={()=>dispatch(push('/target/detail/' + props.id))}
      /> 
      <CardContent className={classes.content}>
        <div onClick={()=>dispatch(push('/target/detail/' + props.id))}>
          <Typography className={classes.description} component="p">
            {props.description}
          </Typography>
        </div>
        <IconButton className={classes.icon} onClick={handleClick}>
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem
            onClick={() => {
              dispatch(push('/target/edit/'+props.id))
              handleClose()
            }}
          >
            編集する
          </MenuItem>
          <MenuItem
            onClick={() => {
              dispatch(deleteTarget(props.id))
              handleClose()
            }}
          >
            削除する
          </MenuItem>
        </Menu>
      </CardContent>
    </Card>
  )
}
export default Target;