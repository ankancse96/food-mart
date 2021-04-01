import React from 'react';
import {  Button, Card, Col, Container } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
const Product = (props) => {
    const{name,imageURL,price} = props.product;

    const history = useHistory()
    const  handleBuy = (name) => {
        history.push(`/checkOut/${name}`);
    }

    return (
        <Col md={4} xl={4} l={4}>
   <Container>
    
    <Card style={{ width: '16rem', height: '22rem',margin:"5px",marginLeft:"10px",textAlign:"center"}}>
    <Card.Img style={{height:"12rem"}} variant="top" src={imageURL} />
    <Card.Body>
    <Card.Title><h6>{name}</h6></Card.Title>
    <Card.Text>  <p>Price: {price}</p></Card.Text>
    
    <Button onClick={() => handleBuy(name)}  variant="primary"> Buy Now  </Button>
    
  </Card.Body>

    </Card>
    </Container>
    </Col>
    );
};

export default Product;