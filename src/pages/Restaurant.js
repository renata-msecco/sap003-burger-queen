import React, { useState, useEffect} from 'react';
//import './App.css';
import firebase from '../components/Firebase/firebase';
import Button from '../components/button';
import MenuCard from '../components/Card.js';
import { StyleSheet, css} from 'aphrodite'

// function Restaurant() {
//   return (
//     <div>Menu</div>
//   );
// }
//   export default Restaurant;

function Service() {
    const [menu, setMenu]= useState([]);
    const [menuFiltrado, setMenuFiltrado] = useState([]);
    const [productSelect, setProductSelect] = useState([]);

  useEffect(() => {
    firebase.collection('menu').get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            setMenu((current) =>[...current, doc.data()]);
            setMenuFiltrado ((current) =>[...current, doc.data()]);
        });
    })
  },[])
  //console.log(menu)

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

  const addOrder = (item) => {
    setProductSelect([...productSelect, item])
  }

  const deleteItem = (item) =>{
   const indexItem = (productSelect.indexOf(item));
   productSelect.splice (indexItem, 1);
   setProductSelect([...productSelect]);
  }

  const total = productSelect.reduce((acc, item) => acc + item.price, 0)
 return(
   <>
   <div>
     <Button className = {css(styles.btnMenu)}text={"café da manhã"} handleClick={() => filtroMenu("breakfast")} />
     <Button className = {css(styles.btnMenu)} text={"Lanches"} handleClick={() => filtroMenu("lunch")} />
     </div>

   <div>
     <h2>Menu</h2>
     <MenuCard 
     menuItens ={menuFiltrado}
     handleClick={addOrder}
     name={productSelect.name}
     price={productSelect.price} key= {productSelect.id}
     className={css(styles.cardMenu)}/>

    {
      productSelect.map((product, index) =>

         <div key={index}>{product.name} R${product.price},00
         <Button text ={'Del'} handleClick = {(e)=> {
           e.preventDefault();
           deleteItem(product);
         }}/>
         </div>)
     
      
    }
     <strong>Total: {total}</strong>
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