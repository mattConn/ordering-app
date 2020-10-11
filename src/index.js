import React from 'react';
import ReactDOM from 'react-dom';
import FoodItem from './foodItem';
import './index.css';

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            employeeView: this.props.employeeView,
            restaurantName: this.props.restaurantName,
            menuItems: this.props.menuItems,
            orderItems: this.props.orderItems || {},
            orderTotal: this.props.orderTotal || 0
        };

    }

    menuItemClickHandler = (key) => {
        const orderItems = this.state.orderItems;
        orderItems[key] = this.state.menuItems[key];
        this.setState({
            orderItems: orderItems,
            orderTotal: this.state.orderTotal+orderItems[key]
        });

        return;
    };

    orderItemClickHandler = (key) => {
        const orderItems = this.state.orderItems;
        const price = orderItems[key];
        delete orderItems[key];
        this.setState({
            orderItems: orderItems,
            orderTotal: this.state.orderTotal-price
        });

        return;
    }

    makeFoodItemList(items, buttonText, type, clickHandler) {
        return (
            Object.keys(items).map(
                (key, index) =>
                    <FoodItem
                        name={key.replace('_',' ')}
                        price={items[key]}
                        key={index}
                        buttonText={buttonText}
                        type={type}
                        onClick={() => clickHandler(key)}
                    />
            ) // end map
        )
    }

    render() {

        return (
            <div className="wrapper">
                <div className="header">
                    <h1>{this.state.restaurantName}</h1>
                </div>
                {/*TODO: remove _ from items names,
                update total,
                functional remove btn,
                count for duploacte items in cart
                 */}
                <div className="menu">
                    <div className="menu-list">
                        {this.makeFoodItemList(
                            this.state.menuItems,
                            'Add To Order',
                            'menu',
                            this.menuItemClickHandler
                        )}
                    </div>
                    <div className="order-ctn">
                        <div className="order-list">
                            {this.makeFoodItemList(
                                this.state.orderItems,
                                'Remove',
                                'order',
                                this.orderItemClickHandler
                            )}
                        </div>
                        <div className="order-submit">
                            <p>Total: ${this.state.orderTotal}</p>
                            <button className="blue-cta">Check Out</button>
                        </div>
                    </div>
                </div> {/*end menu*/}
                {/*end wrapper*/}
            </div>
        );
    }
}

const menuItems = {
    pepperoni_pizza: 12.75,
    cheese_pizza: 11.00,
    soda: 2.99,
    garlic_bread: 2.99,
    fried_calamari: 12.99,
};

ReactDOM.render(
    <React.StrictMode>
        <App menuItems={menuItems} 
        
        restaurantName={'Joe\'s Pizza'}
        />
    </React.StrictMode>,
    document.getElementById('root')
);