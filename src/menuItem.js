import React from 'react';

class MenuItem extends React.Component {

    render(){
        return (
            <div className={'menu-item '+(this.props.employeeView ? 'employee-view':'')}>
                <p>{this.props.name}</p>
                <p>${this.props.price}</p>
                <button onClick={this.props.onClick}>Add to Order</button>
            </div>
        );
    }
}

export default MenuItem;