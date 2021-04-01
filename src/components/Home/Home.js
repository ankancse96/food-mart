import React, { useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';
import fakeData from '../../fakeData/product'
import Product from '../Product/Product';
const Home = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch('https://peaceful-basin-07290.herokuapp.com/products')
        .then(res => res.json())
        .then(data => setProducts(data))
    }, [])
    return (
        <div>
            
            <Row>
           {products.map(product=><Product product={product}></Product>)}
           </Row>
        </div>
    );
};

export default Home;