import React, { useState, useEffect} from 'react';
//import './App.css';
import firebase from '../components/Firebase/firebase';
import Card from '../components/card';

function Service() {
    const [menu, setMenu]= useState([]);
    const [menuFiltrado, setMenuFiltrado] = useState([]);

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
      if(tipoMenu === "café da manhã"){
        const menuFiltrado = menu.filter(element => element.breakfast === true)
        setMenuFiltrado(menuFiltrado);
        console.log(menuFiltrado)
      }
      else if(tipoMenu === "lanche"){
        const menuFiltrado = menu.filter(element => element.lunch === true)
        setMenuFiltrado(menuFiltrado);
        console.log(menuFiltrado)
      }
  }
 return(
     <>
     <Card onClick= {()=> filtroMenu("café da manhã")}>Café da manhã</Card>
     <Card onClick= {()=> filtroMenu("lanche")}>Lanches</Card>
     <div>
{menuFiltrado.map(elem => <Card>{elem.name} <span>R$ {elem.price},00</span> </Card>)}
     </div>
     </>
 );
}

export default Service;