import React, { useEffect, useState } from 'react';
import { Row,Spinner  } from 'react-bootstrap';

import Product from '../Product/Product';
const Home = () => {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    
    
    useEffect(() => {
        fetch('https://peaceful-basin-07290.herokuapp.com/products')
        .then(res => res.json())
        .then(data => {
            setProducts(data)
            setLoading(false)
        })
    }, [])
    
    return (
        <div>
            
            <Row>
           
           {
               loading ?  <div> <Spinner  style={{textAlign:"center"}} animation="border" /> </div> :
              products.map(product=> <Product product={product}></Product>
           
           )}
           </Row>
        </div>
    );
};

export default Home;