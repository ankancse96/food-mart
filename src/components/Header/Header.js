import React, { useContext } from 'react';
import {LinkContainer} from 'react-router-bootstrap'
import { Nav,Navbar } from 'react-bootstrap';
import { UserContext } from '../../App';
const Header = () => {

  const [loggedInUser,setLoggedInUser] = useContext(UserContext)
    console.log(setLoggedInUser);
    return (
        <div>
            <Navbar bg="dark" color="white" variant="dark" expand="lg">
            <LinkContainer to="/home">
            <Navbar.Brand>CLOVER MART</Navbar.Brand>
      </LinkContainer>
  
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="ml-auto">
    <LinkContainer to="/home">
      <Nav.Link>Home</Nav.Link>
      </LinkContainer>

      <LinkContainer to="/orders">
      <Nav.Link>Orders</Nav.Link>
      </LinkContainer>
      
      <LinkContainer to="/admin">
      <Nav.Link>Admin</Nav.Link>
      </LinkContainer>

      <LinkContainer to="/deal">
      <Nav.Link>Deal</Nav.Link>
      </LinkContainer>
      <LinkContainer to="/login">
      <Nav.Link>Login {loggedInUser.email}</Nav.Link>
      </LinkContainer>
      
    </Nav>
    
  </Navbar.Collapse>
</Navbar>
        </div>
    );
};

export default Header;