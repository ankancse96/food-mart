import React , { useEffect, useState }  from 'react';
import { Table } from 'react-bootstrap';

const Order = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetch('https://peaceful-basin-07290.herokuapp.com/orders')
        .then(res => res.json())
        .then(data => setOrders(data))
    }, [])
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