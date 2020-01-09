import React, { useState, useEffect, useReducer} from 'react';
//import './App.css';
import firebase from '../components/Firebase/firebase';
import Button from '../components/button';
import MenuCard from '../components/Card.js';
import { StyleSheet, css} from 'aphrodite';
import Input from '../components/Firebase/input';

function mascaraValor(valor) {
  valor = valor.toString().replace(/\D/g,"");
  valor = valor.toString().replace(/(\d)(\d{8})$/,"$1.$2");
  valor = valor.toString().replace(/(\d)(\d{5})$/,"$1.$2");
  valor = valor.toString().replace(/(\d)(\d{2})$/,"$1,$2");
  return "R$ " + valor                    
}

function getTotalProductPrice(product) {
  let total = 0;
  total += product.price * product.contador
  if(product.selectedExtra)  total += product.selectedExtra.price * product.contador
  return total;
}


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
  
  const selectExtra = (product, extra) =>{
    product.selectedExtra = extra
    setProductSelect(productSelect)
    updateTotal()
  }
  
  const selectOption = (product, option) =>{
    product.selectedOption = option
    updateTotal()
  }
  
  const increaseProduct = (product) => {
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
  
  let total = 0
  
  const updateTotal = () => {
    total = productSelect.reduce((acc, item) => acc + getTotalProductPrice(item), 0)
  }

  
  const getTotal = () => {
    return productSelect.reduce((acc, item) => acc + getTotalProductPrice(item), 0)
  }
  
  updateTotal()
  
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
    <table className="table table-hover">
    <thead>
    <tr>
    <th>Product</th>
    <th>Options</th>
    <th>Extras</th>
    <th>Qty</th>
    <th>Price</th>
    <th>Actions</th>
    </tr>
    </thead>
    <tbody>
    { productSelect.map((product, index) =>{
      console.log('===>',product)
      return (
        
        <tr key={index}>
        <td>{product.name}</td>
        <td>{product.options.map( (option,i) => {
          return(
            <div className="radio">
            <label className="text-nowrap">
            <input type="radio" name={"option_"+index} onChange={()=>{ selectOption(product, option) }} />
            {option}
            </label>
            </div>
            )
          } )}</td>
          <td>{product.extra2 ? product.extra2.map( (extra,i) => {
            return(
              <div className="radio">
              <label className="text-nowrap">
              <input type="radio" name={"extra_" + index} value="1" onChange={()=>{ selectExtra(product, extra) }} />
              {extra.name} {mascaraValor(extra.price)}
              </label>
              </div>
              )
            } ) : ''}</td>
            <td>{product.contador}</td>
            <td className="text-nowrap">{mascaraValor(product.price)}</td>
            <td>
            <div className="btn-group" role="group" aria-label="Basic example">
            <button type="button" className="btn btn-success" onClick = {()=> increaseProduct (product)}>+</button>
            <button type="button" className="btn btn-danger" onClick = {()=> decreaseProduct (product)}>-</button>
            <button type="button" className="btn btn-dark" onClick = {(e)=> {e.preventDefault();deleteItem(product);}}>Del</button>
            </div>
            </td>
            </tr>
            )
          })
          
        }
        
        <tr>
        <td>Total:</td>
        <td>{getTotal()}</td>
        <td></td>
        <td></td>
        <td></td>
        <td>
        <button className="btn btn-success" onClick={sendOrder}>Enviar</button>
        
        </td>
        </tr>
        
        </tbody>
        </table>
        
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