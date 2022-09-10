import  React , {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {Target} from "../components/Targets";
import {fetchTargets} from "../reducks/targets/operations";
import {getTargets} from '../reducks/targets/selectors';
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  cSectionWrapin: {
    margin: '0 auto',
    maxWidth: 575,
    position: 'relative',
    padding: '0 1rem',
    textAlign: 'center',
  },
  pGridRow: {
    display: 'flex',
    flexFlow: 'row wrap',
  }
}));

const TargetList = () => {
  const classes = useStyles()
  const dispatch = useDispatch();
  const selector = useSelector( (state)=> state);
  const targets = getTargets(selector)

  useEffect(()=> {
    dispatch(fetchTargets())
  },[]);

  return (
    <section className={classes.cSectionWrapin}>
      <div className={classes.pGridRow}>
        { targets.length > 0 && (
          targets.map( target => (
            <Target key={target.id} id={target.id} name={target.name} images={target.images} description={target.description} />
          ))
        )}
      </div>
    </section>
  )
}
export default TargetList