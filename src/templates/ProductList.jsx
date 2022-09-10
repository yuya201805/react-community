import  React , {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {ProductCard} from "../components/Products";
import {fetchProducts} from "../reducks/products/operations";
import {getProducts} from '../reducks/products/selectors';
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

const ProductList = () => {
  const classes = useStyles()
  const dispatch = useDispatch();
  const selector = useSelector( (state)=> state);
  const products = getProducts(selector)

  useEffect(()=> {
    dispatch(fetchProducts())
  },[]);


  return (
    <section className={classes.cSectionWrapin}>
      <div className={classes.pGridRow}>
        { products.length > 0 && (
          products.map( product => (
            <ProductCard key={product.id} id={product.id} name={product.name} images={product.images} price={product.price} />
          ))
        )}
      </div>
    </section>
  )
}

export default ProductList