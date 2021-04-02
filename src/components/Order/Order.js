import React ,{ useContext, useEffect, useState }  from 'react';
import { Table } from 'react-bootstrap';
import { UserContext } from "../../App";
const Order = () => {
    
    const [orders, setOrders] = useState([]);
    const [loggedInUser,setLoggedInUser] = useContext(UserContext);
     console.log(setLoggedInUser);
    
    useEffect(() => {
        fetch('https://peaceful-basin-07290.herokuapp.com/orders?email=' + loggedInUser.email)
        .then(res => res.json())
        .then(data => setOrders(data))
    }, [loggedInUser.email])
    return (
        <div>
            Total Order: {orders.length}

            {
                orders.map(book =>
                    
                    <Table striped bordered hover variant="dark" key={book._id}> <thead> <tr>
                        
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Order Date</th>
                        <th>Email</th>
                        </tr> </thead> 
                        
                        <tbody>
                        <td> {book.name} </td>
                        <td> {book.price} </td>
                        <td> {(new Date(book.orderDate).toDateString('dd/MM/yyyy'))} </td>
                        <td> {book.email} </td>

                        </tbody>
                         </Table>)
            }




        </div>
    );
};

export default Order;