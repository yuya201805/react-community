import React, {useCallback, useEffect, useState} from 'react'
import { useDispatch } from 'react-redux';
import ImageArea from '../components/Products/ImageArea';
import { TextInput, SelectBox, PrimaryButton } from '../components/Ulkit';
import { saveTarget } from '../reducks/targets/operations';
import {db} from '../firebase/index';

const TargetEdit = () => {
  const dispatch = useDispatch();
  let id = window.location.pathname.split('/target/edit')[1];

  if(id !== ""){
    id = id.split('/')[1]
  }

  const [name, setName] = useState(""),
        [description, setDescription] = useState(""),
        [images, setImages] = useState([]);

  const inputDescrition = useCallback( (event) => {
    setDescription(event.target.value)
  },[setDescription])
      
  const inputName = useCallback( (event) => {
    setName(event.target.value)
  },[setName])

  // 新規の場合でなく、編集の場合はidがあるはずなので、既存のデータをセット。
  useEffect(()=>{
    if (id !== ""){
      db.collection('targets').doc(id).get().then(snapshot => {
        const data = snapshot.data();
        setImages(data.images);
        setName(data.name);
        setDescription(data.description);
      })
    }
  }, [id])
  
  return(
    <section>
      <h2 className="u-text-headline u-text-center">今週の目標の登録・編集</h2>
      <div className="c-section-container">
        <ImageArea images={images} setImages={setImages} />
        <TextInput 
          fullwidth={true} label={"目標を入れる。"} multiline={false} required={true} onChange={inputName} rows={1} value={name} type={"text"}
        />
        <TextInput 
          fullwidth={true} label={"目標の詳細を入れる"} multiline={true} required={true} onChange={inputDescrition} rows={10} value={description} type={"text"}
        />

        <div className="center">
          <PrimaryButton 
            label={"目標を登録する。"}
            onClick={ ()=> dispatch(saveTarget(id,name,description,images))}
          />
        </div>
      </div>
    </section>    
  )
}
export default TargetEdit