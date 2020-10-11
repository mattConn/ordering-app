import React from 'react';

class FoodItem extends React.Component {

    render() {
        return (
            <div className={`food-item ${this.props.type}-item ${(this.props.employeeView ? ' employee-view' : '')}`}>
                <p>{`${this.props.name} ${this.props.quantity || ''}`}</p>
                <p>{this.props.prefix}{this.props.value}</p>
                <button className="blue-cta" onClick={this.props.onClick}>{this.props.buttonText}</button>
            </div>
        );
    }
}

export default FoodItem;