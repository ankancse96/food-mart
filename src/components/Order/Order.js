import React , { useEffect, useState }  from 'react';

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
                orders.map(book => <li key={book._id}>Product Name: {book.name} &  Price:{book.price}$<br/> Order Date: {(new Date(book.orderDate).toDateString('dd/MM/yyyy'))} Email:{book.email}</li>)
            }
        </div>
    );
};

export default Order;