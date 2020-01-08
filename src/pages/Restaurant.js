import React, { useState, useEffect, useReducer} from 'react';
//import './App.css';
import firebase from '../components/Firebase/firebase';
import Button from '../components/button';
import MenuCard from '../components/Card.js';
import { StyleSheet, css} from 'aphrodite';
import Input from '../components/Firebase/input';



function Service() {
    const [menu, setMenu]= useState([]);
    const [menuFiltrado, setMenuFiltrado] = useState([]);
    const [productSelect, setProductSelect] = useState([]);
    const [table, setTable] = useState('');
    const [client, setClient] = useState('');
    const [totalPrice, setTotalPrice] = useState ('');
   // const [options, setOptions] = useState([]);
    

  useEffect(() => {
    firebase.collection('menu').get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            setMenu((current) =>[...current, doc.data()]);
            setMenuFiltrado ((current) =>[...current, doc.data()]);
        });
    })
  },[])

  function sendOrder (e) {
    e.preventDefault()

    firebase.collection ('client')
    .add ({
      client,
      table: parseInt (table),
      productSelect,
      totalPrice: total,
    })

    .then (() =>{
      setTable('')
      setClient('')
      setProductSelect([])
      setTotalPrice ('')
    })
  }

  const filtroMenu =(tipoMenu) =>{
      if(tipoMenu === "breakfast"){
        const menuFiltrado = menu.filter(element => element.breakfast === true)
        setMenuFiltrado(menuFiltrado);
        //console.log(menuFiltrado)
      }
      else if(tipoMenu === "lunch"){
        const menuFiltrado = menu.filter(element => element.lunch === true || element.beverages === true || element["side dish"] === true)
        setMenuFiltrado(menuFiltrado);
        //console.log(menuFiltrado)
      }
  }

const increaseProduct = (product) =>{
  const productIndex = productSelect.findIndex(e => e.name === product.name)
  if(productIndex === -1) {
      product.contador = 1;
      setProductSelect([...productSelect, product])
  } else {
      product.contador += 1;
      setProductSelect([...productSelect])             
     }   
}

// const openOptions = (elem) => { 
//   if(elem.options.length !== 0){
//       setOptions(elem) 
//   } else {
//     increaseProduct(elem);
//   }

// }

function decreaseProduct (product) {

  if(product.contador === 1){
    const removeProduct = productSelect.filter ((erase) => {
      return erase !== product;
      })

      setProductSelect([...removeProduct])
    }else{
      product.contador --
      setProductSelect([...productSelect])
    }
}
  const deleteItem = (item) =>{
   const indexItem = (productSelect.indexOf(item));
   productSelect.splice (indexItem, 1);
   setProductSelect([...productSelect]);
  }

  const total = productSelect.reduce((acc, item) => acc + (item.contador * item.price), 0)
 return(

   <>
   <div>
     <Input value={client} state={client} type = {'text'} placeholder= {'Nome'} handleChange={e => setClient(e.currentTarget.value)}/>
     <Input value={table} state={table} type = {'number'} placeholder= {'Mesa'} handleChange={e => setTable(e.currentTarget.value)}/>
   </div>

   <div>
     <Button className = {css(styles.btnMenu)}text={"café da manhã"} handleClick={() => filtroMenu("breakfast")} />
     <Button className = {css(styles.btnMenu)} text={"Lanches"} handleClick={() => filtroMenu("lunch")} />
     
     </div>

   <div>
     <h2>Menu</h2>
     <MenuCard 
     menuItens ={menuFiltrado}
     handleClick={increaseProduct}
     name={productSelect.name}
     price={productSelect.price} key= {productSelect.id}
     className={css(styles.cardMenu)}/>
     { productSelect.map((product, index) =>{

  return (<div key={index}>{product.name} R${product.price},00
    <Button text ={'+'} handleClick = {()=> increaseProduct (product)}/>
    {product.contador}
    <Button text ={'-'} handleClick = {()=> decreaseProduct (product)}/>
    <Button text ={'Del'} handleClick = {(e)=> {
      e.preventDefault();
      deleteItem(product);
    }}/>
    </div>)
     })

     }
     <strong>Total: {total}</strong>
     
     <Button text={'Enviar'} handleClick={sendOrder}/>
   </div>
   </> 
 );
}



export default Service;

const styles = StyleSheet.create({
  btnMenu:{
    width: '30%',
    height:'10%',
    background: 'red',
  },
  cardMenu:{
    margin:'1%',
    background: 'orange',

  }
})