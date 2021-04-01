import React ,{ useContext, useEffect, useState }  from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import {useParams} from 'react-router-dom'
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
  TimePickerView,
} from '@material-ui/pickers';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../App';
import { LinkContainer } from 'react-router-bootstrap/lib/LinkContainer';
import OrderDetails from '../OrderDetails/OrderDetails';
const CheckOut = () => {
    const {name} = useParams();
    const [products, setProducts] = useState({});
    useEffect(() => {
        fetch('https://peaceful-basin-07290.herokuapp.com/products/' + name)
        .then(res => res.json())
        .then(data => setProducts(data))
    }, [name])
    console.log(products);
   // const product = products.filter(product=>product.name === name);
   // console.log (product);
   // const{imageURL,price} = product[0];
    //    console.log('this is',name,price,imageURL);
        
        
        const [loggedInUser, setLoggedInUser] = useContext(UserContext);
        const [selectedDate, setSelectedDate] = useState({orderDate: new Date()});
        

        const handleDateChange = (date) => {
          const newDates = {...selectedDate}
          newDates.orderDate = (date)
          setSelectedDate(newDates);
        };
       
        const  handleCheckOut = () => {
            
            const newOrders = {...loggedInUser, ...selectedDate,...products};
            console.log(newOrders)

            fetch('https://peaceful-basin-07290.herokuapp.com/addOrder', {
            
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newOrders)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
        })
          }
    
    return (
        <div style={{textAlign:"center"}}>
            <h1>CheckOut: </h1>
            <Card style={{width:"30rem",marginLeft:"100px"}}>
                        <Card.Body >
                        <div style={{display:"flex"}}>
                        <img style={{height:"5rem"}} src={products.imageURL} alt=""/>
                        <div style={{padding:"15px"}}><h4> Product Name </h4>  {name}</div>
                        <div style={{padding:"15px"}}><h4>Quantity </h4>  1</div>
                        <div style={{padding:"15px"}}><h4>Total Cost </h4> {products.price}$</div>
                        
                        </div>
                        </Card.Body>
                       
                      </Card>


                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <Grid container justify="space-around">
                                    <KeyboardDatePicker disableToolbar variant="inline"
                                    format="dd/MM/yyyy"
                                    margin="normal"
                                    id="date-picker-inline"
                                    label="Order Date"
                                    value={selectedDate.orderDate}
                                    onChange={handleDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                    />
                                    
                                    
                                </Grid>
                                </MuiPickersUtilsProvider>

                                
                                <Button onClick={ handleCheckOut} >Check Out</Button>
                                

                                
                      

                      
        </div>
    );
};

export default CheckOut;