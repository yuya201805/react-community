import React from 'react'
import {push} from "connected-react-router"
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import NoImage from '../../assets/img/src/no_image.png'
import {useDispatch, useSelector} from "react-redux";
// import {getUserRole} from "../../reducks/users/selectors";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {deleteProduct} from "../../reducks/products/operations";


const useStyles = makeStyles((theme) => ({
  root: {
      [theme.breakpoints.down('sm')]: {
          margin: 8,
          width: 'calc(50% - 16px)'
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
      height: 0,
      paddingTop: '100%',
      width: '100%',
  },
  price: {
      color: theme.palette.secondary.dark,
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
  }
}));

const ProductCard = (props) => {
  const classes = useStyles();
  //const price = props.price.toLocaleString();
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
};

const handleClose = () => {
    setAnchorEl(null);
};

  const images = (props.images.length > 0) ? props.images : [{path: NoImage}];
  console.log('images', images[0].path)

  return(
    <Card className={classes.root}>
      <CardMedia
                className={classes.media}
                image={images[0].path}
                onClick={() => dispatch(push('/product/'+props.id))}
                title=""
      />     
      <CardContent className={classes.content}>
        <div onClick={()=>dispatch(push('/product/' + props.id))}>
          <Typography className={classes.productName}>
            { props.name }
          </Typography>
          <Typography className={classes.price} component="p">
            ¥{props.price}
          </Typography>
        </div>

        <IconButton className={classes.icon} onClick={handleClick}>
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
                           <MenuItem
                                onClick={() => {
                                    dispatch(push('/product/edit/'+props.id))
                                    handleClose()
                                }}
                            >
                                編集する
                            </MenuItem>
                            <MenuItem
                                onClick={() => {
                                    dispatch(deleteProduct(props.id))
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

export default ProductCard;