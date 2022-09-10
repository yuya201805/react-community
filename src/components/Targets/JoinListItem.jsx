import React, {useCallback} from 'react';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import {makeStyles} from "@material-ui/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from '@material-ui/icons/Edit';
import IconButton from "@material-ui/core/IconButton";
import {useSelector, useDispatch} from "react-redux";
import {getUserId} from "../../reducks/users/selectors";
import {db} from "../../firebase/index"
import NoImage from '../../assets/img/src/no_image.png'
import {push} from "connected-react-router"

const useStyles = makeStyles((theme) => ({
    list: {
        height: 128,
    },
    image: {
        objectFit: 'cover',
        margin: 16,
        height: 50,
        width: 50
    },
    text: {
        width: '100%'
    }
}))

const JoinListItem = (props) => {
    const classes = useStyles();
		const dispatch = useDispatch()
    const selector = useSelector(state => state);
    const uid = getUserId(selector);
    const images = (props.target.images.length > 0) ? props.target.images : [{path: NoImage}];
   
    const removeTargetFromJoin = (id) => {
        return db.collection('users').doc(uid).collection('target').doc(id).delete()
    };

    const goToDetail = useCallback((target) => {
      dispatch(push(`/target/detail/${target.targetId}`))
    }, []);

    return (
        <>
					<ListItem className={classes.list}>
						<ListItemAvatar>
							<img className={classes.image} src={images[0].path} alt="目標のTOP画像" />
						</ListItemAvatar>
						<div className={classes.text}>
							<ListItemText secondary={props.target.name} />
						</div>
						<IconButton onClick={ ()=>{goToDetail(props.target)} } >
							<EditIcon />
						</IconButton>
						<IconButton onClick={() => removeTargetFromJoin(props.target.targetId)} >
							<DeleteIcon />
						</IconButton>
					</ListItem>
					<Divider />
        </>
    );
}
export default JoinListItem