import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { Col, Container, Nav, Navbar, Row } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { LinkContainer } from 'react-router-bootstrap';
const Admin = () => {
    const { register, handleSubmit} = useForm();
    const [imageURL, setImageURL] = useState();
  const onSubmit = data => {

    const productData = {
            name: data.name,
            price: data.price,
            imageURL: imageURL
        }
        const url = `https://peaceful-basin-07290.herokuapp.com/addProduct` ;
        fetch(url,{
           method:'POST',
           headers: {
               'Content-Type': 'application/json'
           },
           body: JSON.stringify(productData)
        })
        .then(res=> console.log('server side response',res))
  }


    const handaleAddProduct = product => {
        console.log(product.target.files)
        const imageData = new FormData ();
        imageData.set('key','338ed84a983c3777dcf493f1ec99b179');
        imageData.append('image',product.target.files[0]);

        axios.post('https://api.imgbb.com/1/upload', imageData)
          .then(function (response) {
            setImageURL(response.data.data.display_url);
            console.log(response.data.data.display_url);
          })
          .catch(function (error) {
            console.log(error);
          });
    }
    return (
        <div>
          <Container>
            <Row>
            <Col md={4}>
            <Navbar bg="light" expand="lg">
  
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">

      <LinkContainer to="/admin">
      <Nav.Link>Add Product</Nav.Link>
      </LinkContainer>

      <LinkContainer to="/manageProduct">
      <Nav.Link>Manage Product</Nav.Link>
      </LinkContainer>
      
      
    </Nav>
    
  </Navbar.Collapse>
</Navbar>
            </Col>
            <Col md={8}>
            <h1>Add your Products</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
          Product Name: <input name="name" defaultValue="Add Product" ref={register} />
            <br/> <br/>
         Price: <input type="value" name="price" ref={register} />
         <br/> <br/>
        Upload Image: <input name="exampleRequired" type="file" onChange={handaleAddProduct} />
        <br/> <br/>

         <input type="submit" />
    </form>
            </Col>
            </Row>
          </Container>

        </div>
    );
};

export default Admin;