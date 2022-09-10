import {db, FirebaseTimestamp} from '../../firebase/index';
import {push} from "connected-react-router";
import {fetchTargetsAction, deleteTargetAction} from "./actions"

const targetsRef = db.collection('targets')

// 商品の登録
export const saveTarget = (id,name,description,images) => {
  return async(dispatch) => {
    const timestamp = FirebaseTimestamp.now()

    const data = {
      description: description,
      images: images,
      name: name,
      updated_at: timestamp,
    }

    // 新規作成時のみ
    if(id === ""){
      const ref = targetsRef.doc()
      id = ref.id
      data.id = id
      data.created_at = timestamp
    }

    // firebaseに、productを追加。
    return targetsRef.doc(id).set(data, {merge: true }).then( ()=>{
      // 成功したら、dispatchで / へ
      dispatch(push("/target"))
    })
  }
}

export const addMessageInTarget = (targetId,text,timestamp) => {
  return async (dispatch, getState) => {
    console.log("bbbbbbbbbbb", text)
    const uid = getState().users.uid;
    const userName = getState().users.username

      const targetRef = db.collection('targets').doc(targetId)
      targetRef.collection('messages').add({
        text: text,
        photoURL: "photoURL",
        uid,
        userName,
        createdAt: timestamp
      })
  }
}

export const fetchTargets = () => {
  return async (dispatch) => {
    targetsRef.orderBy('updated_at', 'desc').get().then(snapshots => {
        const targetList = []
        snapshots.forEach(snapshot => {
          const target = snapshot.data()
          targetList.push(target)
        })
        dispatch(fetchTargetsAction(targetList))
      })
  }
}

export const deleteTarget = (id) => {
  return async (dispatch, getState) => {
    targetsRef.doc(id).delete()
      .then(() => {
        const prevTargets = getState().targets.list
        const nextTargets= prevTargets.filter(target => target.id !== id)
        dispatch(deleteTargetAction(nextTargets))
      })
  }
}