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
            menuItems: this.props.menuItems,         // name: price
            orderItems: this.props.orderItems || {}, // name:quantity
            orderTotal: this.props.orderTotal || 0
        };

    }

    menuItemClickHandler = (key) => {
        const orderItems = this.state.orderItems; // copy orderitems
        orderItems[key] = orderItems[key] ? orderItems[key] + 1 : 1; // increase/init quantity

        // update state
        this.setState({
            orderItems: orderItems,
            orderTotal: this.state.orderTotal + this.state.menuItems[key]
        });

        return;
    };

    orderItemClickHandler = (key) => {
        const orderItems = this.state.orderItems; // copy orderitems
        if (orderItems[key] === 1)
            delete orderItems[key]; // remove pair
        else
            orderItems[key]--;

        this.setState({
            orderItems: orderItems,
            orderTotal: this.state.orderTotal - this.state.menuItems[key]
        });

        return;
    }

    clearOrderClickHandler = () => {
        this.setState({
            orderItems: {},
            orderTotal: 0.00
        })
    }

    makeFoodItemList(items, buttonText, type, prefix, clickHandler) {
        return (
            Object.keys(items).map(
                (key, index) =>
                    <FoodItem
                        name={key.replace('_', ' ')}
                        value={items[key]}
                        key={index}
                        buttonText={buttonText}
                        type={type}
                        prefix={prefix}
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
                <div className="menu">
                    <div className="menu-list">
                        {this.makeFoodItemList(
                            this.state.menuItems,
                            'Add To Order',
                            'menu',
                            '$',
                            this.menuItemClickHandler
                        )}
                    </div>
                    <div className="order-ctn">
                        <div className="order-list">
                            {this.makeFoodItemList(
                                this.state.orderItems,
                                'Remove',
                                'order',
                                'x',
                                this.orderItemClickHandler
                            )}
                        </div>
                        <div className="order-submit">
                            <p>Total: ${this.state.orderTotal}</p>
                            <button className="blue-cta">Check Out</button>
                            <button className="blue-cta" onClick={()=>this.clearOrderClickHandler()}>Clear</button>
                        </div>
                    </div>
                </div> {/*end menu*/}
                {/*end wrapper*/}
            </div>
        );
    }
}

const menuItems = {
    pepperoni_pizza: 12.00,
    cheese_pizza: 11.00,
    soda: 2.00,
    garlic_bread: 3.00,
    fried_calamari: 12.00,
};

ReactDOM.render(
    <React.StrictMode>
        <App menuItems={menuItems}

            restaurantName={'Joe\'s Pizza'}
        />
    </React.StrictMode>,
    document.getElementById('root')
);