import React from 'react';
import ReactDOM from 'react-dom';
import MenuItem from './menuItem';
import './index.css';

class App extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            employeeView: this.props.employeeView,
            restaurantName: this.props.restaurantName,
            menuItems: this.props.menuItems,
        };

        this.menuItemComponents = Object.keys(this.state.menuItems).map(
            key=>
            <MenuItem name={key} price={this.state.menuItems[key]}/>
            );

    }

    render() {
        return (
            <div className="wrapper">
                <div className="header">
                    <h1>{this.state.restaurantName}</h1>
                </div>
                <div className="ordering-menu">
                    {this.menuItemComponents}
                </div>
                <div className="order-list"></div>
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
        <App menuItems={menuItems}/>
    </React.StrictMode>,
    document.getElementById('root')
);