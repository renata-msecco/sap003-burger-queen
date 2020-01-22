import React, { useState, useEffect } from 'react';
import firebase from '../components/Firebase/firebase';
import Button from '../components/button';
import MenuCard from '../components/Card.js';
import { StyleSheet, css } from 'aphrodite';
import Input from '../input';
import alertify from 'alertifyjs';

function currencyFormatted(valor) {
  valor = valor.toString().replace(/\D/g, "");
  valor = valor.toString().replace(/(\d)(\d{8})$/, "$1.$2");
  valor = valor.toString().replace(/(\d)(\d{5})$/, "$1.$2");
  valor = valor.toString().replace(/(\d)(\d{2})$/, "$1,$2");
  return "R$ " + valor
}

function getTotalProductPrice(product) {
  let total = 0;
  total += product.price * product.contador;
  if (product.extraPrice) total += product.extraPrice;
  return total;
}


function Service() {
  const [menu, setMenu] = useState([]);
  const [menuFiltrado, setMenuFiltrado] = useState([]);
  const [productSelect, setProductSelect] = useState([]);
  const [table, setTable] = useState('');
  const [client, setClient] = useState('');


  useEffect(() => {
    firebase.collection('menu').get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          setMenu((current) => [...current, doc.data()]);
          // setMenuFiltrado((current) => [...current, doc.data()]);
        });
      })
  }, [])

  function sendOrder(e) {
    e.preventDefault()
    if (client && table !== "" && productSelect.length !== 0) {
      firebase.collection('client')
        .add({
          client,
          table: parseInt(table),
          productSelect,
          date: new Date(),
          status: 'Preparando',
        })

        .then(() => {
          alertify.success('pedido enviado para cozinha');
          setTable('')
          setClient('')
          setProductSelect([])
        })
    } else if (!client) {
      alertify.error('Para continuar informe nome do cliente');
    } else if (!table) {
      alertify.error('Para continuar informe número da mesa');
    } else if (productSelect.length === 0) {
      alertify.error('Para continuar informe itens do pedido');
    }
  };

  const filtroMenu = (tipoMenu) => {
    if (tipoMenu === "breakfast") {
      const menuFiltrado = menu.filter(element => element.breakfast === true)
      setMenuFiltrado(menuFiltrado);

    }
    else if (tipoMenu === "lunch") {
      const menuFiltrado = menu.filter(element => element.lunch === true || element.beverages === true || element["side dish"] === true)
      setMenuFiltrado(menuFiltrado);

    }
  }

  const selectExtra = (product, extra) => {
    product.selectedExtra = extra;
    product.extraPrice = 1
    setProductSelect([...productSelect])
  }

  const selectOption = (product, option) => {
    product.selectedOption = option

  }

  const increaseProduct = (product) => {
    if (product.name.includes("Hambúrguer")) {
      const include = { ...product, contador: 1 }

      setProductSelect([...productSelect, include])
    } else {
      const productIndex = productSelect.findIndex(e => e.name === product.name)
      if (productIndex === -1) {
        product.contador = 1;
        const lower = { ...product, contador: 1 }
        setProductSelect([...productSelect, lower])
      } else {
        product.contador += 1;
        setProductSelect([...productSelect])
      }


    }

  }

  function decreaseProduct(product) {

    if (product.contador === 1) {
      const removeProduct = productSelect.filter((erase) => {
        return erase !== product;
      })

      setProductSelect([...removeProduct])
    } else {
      product.contador--
      setProductSelect([...productSelect])
    }

  }

  const deleteItem = (item) => {
    const filterDelete = productSelect.filter(elem => elem !== item)
    setProductSelect([...filterDelete]);

  }

  const teste = (product) => {
    product.contador += 1;
    product.extraPrice += 1;
    setProductSelect([...productSelect])
    console.log(product)


  }

  const teste2 = (product) => {
    if (product.contador === 1) {
      deleteItem(product)
    } else {
      product.contador -= 1;
      product.extraPrice -= 1;

      setProductSelect([...productSelect])
      console.log(product)
    }



  }

  const total = productSelect.reduce((acc, item) => acc + getTotalProductPrice(item), 0);
  console.log(productSelect)

  return (

    <>

      <div className={css(styles.btnGroup)} role="group" aria-label="Basic example">
        <Button className={css(styles.btnMenu1)} text={"CAFÉ DA MANHÃ"} handleClick={() => filtroMenu("breakfast")} />
        <Button className={css(styles.btnMenu2)} text={"LANCHES"} handleClick={() => filtroMenu("lunch")} />

      </div>
      <div className={css(styles.divInputs)}>
        <Input class={css(styles.infoInput)} value={client} state={client} type={'text'} placeholder={'Nome'} handleChange={e => setClient(e.currentTarget.value)} />
        <Input class={css(styles.infoInput)} value={table} state={table} type={'number'} placeholder={'Mesa'} handleChange={e => setTable(e.currentTarget.value)} />
      </div>

      <div className={css(styles.divMenu)} >

        <MenuCard
          menuItens={menuFiltrado === "breakfast" ? menuFiltrado : menuFiltrado}
          handleClick={increaseProduct}
          name={productSelect.name}
          price={productSelect.price} key={productSelect.id}
          className={css(styles.cardMenu)} />
      </div>

      <div class="row d-flex justify-content-center"><h2>Pedido</h2></div>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Produto</th>
            <th>Opções</th>
            <th>Extras</th>
            <th>Qtd</th>
            <th>Preço</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {productSelect.map((product, index) => {
            return (

              <tr key={index}>
                <td>{product.name}</td>
                <td>{product.options.map((option, i) => {
                  return (
                    <div className="radio" key={i}>
                      <label className="text-nowrap">
                        <input type="radio" name={"option_" + index} onChange={() => { selectOption(product, option) }} />
                        {option}
                      </label>
                    </div>
                  )
                })}</td>
                <td>{product.extra2 ? product.extra2.map((extra, i) => {
                  return (
                    <div className="radio" key={i}>
                      <label className="text-nowrap">
                        <input type="radio" name={"extra_" + index} value="1" onChange={() => { selectExtra(product, extra) }} />
                        {extra.name} {currencyFormatted(extra.price)}
                      </label>
                    </div>
                  )
                }) : ''}
                </td>
                <td>{product.contador}</td>
                <td className="text-nowrap">{currencyFormatted(product.price)}</td>
                <td>
                  <div className="btn-group" role="group" aria-label="Basic example">
                    <button type="button" className="btn btn-success" onClick={() => product.name.includes("Hambúrguer") ? teste(product) : increaseProduct(product)}>+</button>
                    <button type="button" className="btn btn-danger" onClick={() => product.name.includes("Hambúrguer") ? teste2(product) : decreaseProduct(product)}>-</button>
                    <button type="button" className="btn btn-dark" onClick={(e) => { e.preventDefault(); deleteItem(product); }}>Del</button>
                  </div>
                </td>
              </tr>
            )
          })

          }

          <tr>
            <td>Total:</td>
            <td>{currencyFormatted(total)}</td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <button className="btn btn-success" onClick={sendOrder}>Enviar</button>

            </td>
          </tr>

        </tbody>
      </table>

    </>
  );
}



export default Service;

const styles = StyleSheet.create({
  divInputs: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  infoInput: {
    margin: "1%",
    border: 'borde-radius',
  },

  btnMenu1: {
    width: '50%',
    height: '20%',
    background: '#6c757d',
    margin: '1%',

  },
  btnMenu2: {
    width: '50%',
    height: '20%',
    background: '#6c757d',
    margin: '1%',
  },

  cardMenu: {
    margin: '10px',
    width: '200px',
    height: '100px',
    background: '#F2EFC4',
    fontSize: '120%',
    color: '#73150D',
    flexDirection: 'column',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-around',
    textAlign: 'center',
    borderColor: 'black',
    borderStyle: 'solid',
    borderRadius: '1px',
  },

  divMenu: {
    alignContent: 'space-around',
    display: 'flex',
    flexWrap: 'wrap',
    //flexDirection:'row',
    width: '100%',
    height: '20%',
  },

  btnContainer: {
    display: 'flex',
  },

  btnGroup: {
    display: "flex",
    flexDirection: "row",
  }
})