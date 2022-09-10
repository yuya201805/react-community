import {db, FirebaseTimestamp} from '../../firebase/index';
import {push} from "connected-react-router";
import {deleteProductAction, fetchProductsAction} from "./actions"


const productsRef = db.collection('products')

export const deleteProduct = (id) => {
  return async (dispatch, getState) => {
    productsRef.doc(id).delete()
      .then(() => {
        const prevProducts = getState().products.list
        const nextProducts = prevProducts.filter(product => product.id !== id)
        dispatch(deleteProductAction(nextProducts))
      })
  }
}

export const fetchProducts = () => {
  return async (dispatch) => {
      productsRef.orderBy('updated_at', 'desc').get().then(snapshots => {
        const productList = []
        snapshots.forEach(snapshot => {
          const product = snapshot.data()
          productList.push(product)
        })
        dispatch(fetchProductsAction(productList))
      })
  }
}

export const orderProduct = (productsInCart, amount) => {
  return async (dispatch, getState) => {
    const uid = getState().users.uid;
    const userRef = db.collection('users').doc(uid);
    const timestamp = FirebaseTimestamp.now();
    let products = [];
    let soldOutProducts = [];

    const batch = db.batch();

    for (const product of productsInCart) {
      const snapshot = await productsRef.doc(product.productId).get();
      const sizes = snapshot.data().sizes;

      const updateSizes = sizes.map(size => {
        if (size.size === product.size) {
          if (size.quantity === 0) {
            soldOutProducts.push(product.name);
            return size
          }
          return {
            size: size.size,
            quantity: size.quantity - 1
          }
        } else {
          return size
        }
      });

      products.push({
        id: product.productId,
        images: product.images,
        name: product.name,
        price: product.price,
        size: product.size
      })

      batch.update(productsRef.doc(product.productId), {sizes: updateSizes});
      batch.delete(userRef.collection('cart').doc(product.cartId));
    }

    if (soldOutProducts.length > 0) {
      const errorMessage = (soldOutProducts.length > 1) ? soldOutProducts.join('と') : soldOutProducts[0];
      alert('大変申し訳ありません。' + errorMessage + 'が在庫切れとなったため注文処理を中断しました。');
      return false
    } else {
      batch.commit().then( ()=> {
        const orderRef = userRef.collection('orders').doc();
        const date = timestamp.toDate();
        const shippingDate = FirebaseTimestamp.fromDate( new Date(date.setDate(date.getDate() + 3) ))

        const history = {
          amount: amount,
          created_at: timestamp,
          id: orderRef.id,
          products: products,
          shipping_date: shippingDate,
          updated_at: timestamp
        }

        orderRef.set(history)
        dispatch(push('/order/complete'))
      }).catch( ()=> {
        alert("注文に失敗しました。")
        return false
      })
    }
  }
}


export const completeTarget = (target, comment) => {
  return async (dispatch, getState) => {
    const uid = getState().users.uid;
    const userName = getState().users.username;
    const userRef = db.collection('users').doc(uid);
    // const targetInCommentRef = db.collection('targets').doc(target.targetId);
    const timestamp = FirebaseTimestamp.now();
    let targets = [];
    console.log('taregttttt',target)
    let targetId = String(target.id)


    targets.push({
      id: target.targetId,
      name: target.name,
      description: target.description,
    })

    //userRef.collection('cart').doc(product.cartId);

    const targetRef = userRef.collection('complete').doc();
    // const commentRef = targetInCommentRef.collection('comments').doc();
    const date = timestamp.toDate();

    const history = {
      id: targetRef.id,
      targetId: target.id,
      target_name: target.name,
      target_description: target.description,
      comment: comment,
      created_at: timestamp,
    }

    // const commentHistory = {
    //   id: commentRef.id,
    //   user_id: uid,
    //   user_name: userName,
    //   comment: comment,
    //   created_at: timestamp,
    // }

    const targetInRef = db.collection('targets').doc(targetId)
    targetInRef.collection('comments').add({
      user_id: uid,
      user_name: userName,
      comment: comment,
      created_at: timestamp,
  })

    targetRef.set(history)
    // commentRef.set(commentHistory)
    dispatch(push('/complete/history'))
    

  }
}



// 商品の登録
export const saveProduct = (id,name,description,category,gender,price,images, sizes) => {
  return async(dispatch) => {
    const timestamp = FirebaseTimestamp.now()

    const data = {
      category: category,
      description: description,
      gender: gender,
      images: images,
      name: name,
      price: parseInt(price, 10),
      sizes: sizes,
      updated_at: timestamp,
    }

    // 新規作成時のみ
    if(id === ""){
      const ref = productsRef.doc()
      id = ref.id
      data.id = id
      data.created_at = timestamp
    }

    // firebaseに、productを追加。
    return productsRef.doc(id).set(data, {merge: true }).then( ()=>{
      // 成功したら、dispatchで / へ
      dispatch(push("/"))
    })

  }
}