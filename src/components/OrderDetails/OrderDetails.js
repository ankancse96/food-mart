import React , { useEffect, useState }  from 'react';

const OrderDetails = () => {
    const [order, setOrder] = useState([]);

    useEffect(() => {
        fetch('https://peaceful-basin-07290.herokuapp.com/orders')
        .then(res => res.json())
        .then(data => setOrder(data))
    }, [])
    return (
        <div>
            Total Order: {order.length}

            {
                order.map(books => <li key={books._id}>Product Name: {books.name} &  Price:{books.price}$<br/> Order Date: {(new Date(books.orderDate).toDateString('dd/MM/yyyy'))} Email:{books.email}</li>)
            }
        </div>
    );
};

export default OrderDetails;