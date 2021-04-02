import React,{ useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';

const ManageProduct = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch('https://peaceful-basin-07290.herokuapp.com/products')
        .then(res => res.json())
        .then(data => setProducts(data))
    }, [])

    const deleteProduct = (id) => {
        console.log('click',id);
        fetch(`https://peaceful-basin-07290.herokuapp.com/delete/${id}`,{
            method : 'DELETE'
        })
        .then(res => res.json())
            .then (result => {
                'delete successfully'
            })
      };
    return (
        <div>
            <h3 style={{textAlign: 'center'}}>Manage Products : {products.length}</h3>
            {
            products.map(product=>
            <Table striped bordered hover variant="dark"> 
            <thead>
                <tr>
                
                <th>Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th></th>
              </tr></thead>
              
              <tbody>
              <td>{product.name} </td>
              <td>1</td>
              <td>{product.price}</td>
              <td><Button onClick={()=>deleteProduct(product._id)}>Delete</Button>
              </td>
              </tbody>
              
            </Table>)
            }
           
        </div>
    );
};

export default ManageProduct;