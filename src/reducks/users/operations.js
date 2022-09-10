import { signInAction, signOutAction, fetchProductsInCartAction, fetchOrdersHistoryAction, fetchTargetsInJoinAction, fetchTargetsHistoryAction} from "./actions";
import { push } from "connected-react-router";
import { auth, FirebaseTimestamp, db } from "../../firebase/index"


const usersRef = db.collection('users')

export const addProductToCart = (addedProduct) => {
  return async (dispatch, getState) => {
      const uid = getState().users.uid;
      const cartRef = usersRef.doc(uid).collection('cart').doc();
      addedProduct['cartId'] = cartRef.id;
      await cartRef.set(addedProduct);
      dispatch(push('/'))
  }
}

export const addTargetToJoin = (addedTarget) => {
  return async (dispatch, getState) => {
      const uid = getState().users.uid;
      const targetId = addedTarget.targetId
      const targetRef = usersRef.doc(uid).collection('target').doc(targetId);
      // addedTarget['cartId'] = targetRef.id;
      addedTarget['cartId'] = targetId;
      await targetRef.set(addedTarget);
      dispatch(push('/'))
  }
}

export const fetchProductsInCart = (products) => {
  return async (dispatch) => {
      dispatch(fetchProductsInCartAction(products))
  }
}

export const fetchTargetsInJoin = (targets) => {
  return async (dispatch) => {
      dispatch(fetchTargetsInJoinAction(targets))
  }
}

export const fetchOrdersHistory = () => {
  return async (dispatch, getState) => {
      const uid = getState().users.uid;
      const list = []

      usersRef.doc(uid).collection('orders')
          .orderBy('updated_at', "desc").get()
          .then(snapshots => {
              snapshots.forEach(snapshot => {
                  const data = snapshot.data();
                  list.push(data)
              });
              dispatch(fetchOrdersHistoryAction(list))
          })
  }
}


export const fetchTargetsHistory = () => {
  return async (dispatch, getState) => {
      const uid = getState().users.uid;
      const list = []


      usersRef.doc(uid).collection('complete').orderBy('created_at', "desc").get()
          .then(snapshots => {
              snapshots.forEach(snapshot => {
                  const data = snapshot.data();
                  console.log("dataaaaaa", data)
                  list.push(data)
              });
              dispatch(fetchTargetsHistoryAction(list))
          })
  }
}


// ユーザ認証の確認
export const listenauthState = () => {
  return async(dispatch) => {
    return auth.onAuthStateChanged(user => {
      // userが認証されていることの確認
      if(user){
        const uid = user.uid
        db.collection('users').doc(uid).get().then(snapshot => {
          // user_id と dataの取得
          const data = snapshot.data()

          dispatch(signInAction({
            isSignedIn: true,
            role: data.role,
            uid: uid,
            username: data.username
          }))
        })        
      } else{
        // 認証されていなければ、ログインページへ
        dispatch(push("/signin"))
      }
    })
  }
}

export const signIn = (email, password) => {
  return async(dispatch) => {
    if (email === "" || password === "" ) {
      alert('未入力です')
      return false
    }

    auth.signInWithEmailAndPassword(email, password).then(result => {
      const user = result.user

      if(user){
        const uid = user.uid
        db.collection('users').doc(uid).get().then(snapshot => {
          const data = snapshot.data()

          dispatch(signInAction({
            isSignedIn: true,
            role: data.role,
            uid: uid,
            username: data.username
          }))

          dispatch(push("/"))
        })
      }
    })
    
  }
}

export const signUp = (username, email, password, confirmPassword) => {
  return async (dispatch) => {
      // Validations
      if (username === "" || email === "" || password === "" || confirmPassword === "" ) {
        alert('未入力です')
        return false
      }
      if (password !== confirmPassword) {
          alert('パスワードが一致しません。もう1度お試しください。')
          return false
      }
      if (password.length < 6) {
          alert('パスワードは6文字以上で入力してください。')
          return false
      }

      return auth.createUserWithEmailAndPassword(email, password)
          .then(result => {
              const user = result.user;
              if (user) {
                  const uid = user.uid;
                  const timestamp = FirebaseTimestamp.now();

                  const userInitialData = {
                      created_at: timestamp,
                      email: email,
                      role: "customer",
                      uid: uid,
                      updated_at: timestamp,
                      username: username
                  };

                  db.collection('users').doc(uid).set(userInitialData).then(() => {
                      dispatch(push('/'))
                  })
              }
          }).catch((error) => {
              alert('アカウント登録に失敗しました。もう1度お試しください。')
          })
  }
}

export const resetPassword = (email) => {
  return async(dispatch) => {
    if(!email){
      alert("未入力です")
      return false
    } else{
      auth.sendPasswordResetEmail(email).then( ()=>{
        alert("パスワードリセット用のメールを送りました。")
        dispatch(push("signin"))
      }).catch( ()=>{
        alert('パスワードリセットに失敗しました。')
      })
    }
  }
}


export const signOut = () => {
  return async(dispatch) => {
    auth.signOut().then( ()=>{
      dispatch(signOutAction())
      dispatch(push("/signin"))
    })
  }
}

