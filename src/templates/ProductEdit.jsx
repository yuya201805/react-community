import React, {useCallback, useEffect, useState} from 'react'
import { useDispatch } from 'react-redux';
import ImageArea from '../components/Products/ImageArea';
import { TextInput, SelectBox, PrimaryButton } from '../components/Ulkit';
import { saveProduct } from '../reducks/products/operations';
import {db} from '../firebase/index';
import SetSizeArea from '../components/Products/SetSizeArea';


const ProductEdit = () => {
  const dispatch = useDispatch();
  let id = window.location.pathname.split('/product/edit')[1];

  if(id !== ""){
    id = id.split('/')[1]
  }

  const [name, setName] = useState(""),
        [description, setDescription] = useState(""),
        [category, setCategory] = useState(""),
        [gender, setGender] = useState(""),
        [images, setImages] = useState([]),
        [price, setPrice] = useState(""),
        [sizes, setSizes] = useState([]);

  const inputDescrition = useCallback( (event) => {
    setDescription(event.target.value)
  },[setDescription])
      
  const inputName = useCallback( (event) => {
    setName(event.target.value)
  },[setName])
      
  const inputPrice = useCallback( (event) => {
    setPrice(event.target.value)
  },[setPrice])

  const categories = [
    {id: "tops", name: "トップス"},
    {id: "shirts", name: "シャツ"},
  ]

  const genders = [
    {id: "all", name: "全て"},
    {id: "male", name: "男性"},
    {id: "female", name: "女性"},
  ];

  // 新規の場合でなく、編集の場合はidがあるはずなので、既存のデータをセット。
  useEffect(()=>{
    if (id !== ""){
      db.collection('products').doc(id).get().then(snapshot => {
        const data = snapshot.data();
        setImages(data.images);
        setName(data.name);
        setDescription(data.description);
        setPrice(data.price);
        setCategory(data.category);
        setGender(data.gender);
        setSizes(data.sizes);
      })
    }
  }, [id])

  console.log('sizes', sizes)
  
  return(
    <section>
      <h2 className="u-text-headline u-text-center">商品の登録・編集</h2>
      <div className="c-section-container">
        <ImageArea images={images} setImages={setImages} />
        <TextInput 
          fullwidth={true} label={"商品名"} multiline={false} required={true} onChange={inputName} rows={1} value={name} type={"text"}
        />
        <TextInput 
          fullwidth={true} label={"商品説明"} multiline={true} required={true} onChange={inputDescrition} rows={5} value={description} type={"text"}
        />
        <SelectBox 
          label={"性"} require={true} options={genders} select={setGender} value={gender}
        />
        <SelectBox 
          label={"カテゴリー"} require={true} options={categories} select={setCategory} value={category}
        />
        <TextInput 
          fullwidth={true} label={"価格"} multiline={false} required={true} onChange={inputPrice} rows={1} value={price} type={"number"}
        />

        <SetSizeArea sizes={sizes} setSizes={setSizes}/>

        <div className="center">
          <PrimaryButton 
            label={"商品情報を保存"}
            onClick={ ()=> dispatch(saveProduct(id,name,description,category,gender,price,images,sizes))}
          />
        </div>
      </div>
    </section>    
  )
}


// const ProductEdit = () =>{
//   const dispatch = useDispatch();
//   let id = window.location.pathname.split('/product/edit')[1];

//   if(id !== ""){
//     id = id.split('/')[1]
//   }

//   const [name, setName] = useState(""),
//         [description, setDescription] = useState(""),
//         [category, setCategory] = useState(""),
//         [gender, setGender] = useState(""),
//         [images, setImages] = useState([]),
//         [price, setPrice] = useState("");


//   const inputDescrition = useCallback( (event) => {
//     setDescription(event.target.value)
//   }, [setDescription])

//   const inputName = useCallback( (event) => {
//     setName(event.target.value)
//   }, [setName])

//   const inputPrice = useCallback( (event) => {
//     setPrice(event.target.value)
//   }, [setPrice])

//   const categories = [
//     {id: "tops", name: "トップス"},
//     {id: "shirts", name: "シャツ"},
//   ];

//   const genders = [
//     {id: "all", name: "全て"},
//     {id: "male", name: "男性"},
//     {id: "female", name: "女性"},
//   ];

//   useEffect(()=>{
//     if (id !== ""){
//       db.collection('products').doc(id).get().then( snapshot => {
//         const data = snapshot.data();
//         setImages(data.images);
//         setName(data.name);
//         setDescription(data.description);
//         setPrice(data.price);
//         setGender(data.gender);
//       })
//     }
//   }, [id])
  
//   return(
//     <section>
//       <h2 className="u-text-headline u-text-center">商品の登録・編集</h2>
//       <div className="c-section-container">
//         <ImageArea images={images} setImages={setImages} />
//         <TextInput 
//           fullwidth={true} label={"商品名"} multiline={false} required={true} onChange={inputName} rows={1} value={name} type={"text"}
//         />
//         <TextInput 
//           fullwidth={true} label={"商品説明"} multiline={true} required={true} onChange={inputDescrition} rows={5} value={description} type={"text"}
//         />

//         <SelectBox 
//           label={"性別"} require={true} options={genders} select={setGender} value={gender}
//         />
//         <TextInput 
//           fullwidth={true} label={"価格"} multiline={false} required={true} onChange={inputPrice} rows={1} value={price} type={"number"}
//         />

       


//         <div className="center">
//           <PrimaryButton 
//             label={"商品情報を保存"}
//             onClick={ ()=> dispatch(saveProduct(id, name, description, gender, price, images)) }
//           />
//         </div>


//       </div>
//     </section>
//   )
// }

export default ProductEdit