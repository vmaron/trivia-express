import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {getCustomers} from '../../store/actions/customer'
import styles from "./CustomersList.module.css";

class CustomersList extends Component {

  static propTypes = {
    getCustomers: PropTypes.func.isRequired,
    customers: PropTypes.array.isRequired
  }

  static defaultProps = {
    customers: []
  }

  componentWillMount() {
    this.props.getCustomers();
  }

  render() {
    return (
      <div className={styles.container}>
        <h2>Customers</h2>
        <ul className={styles.customers}>
          {this.props.customers.map(customer =>
            <li className={styles.customerItem} key={customer.id}>{customer.firstName} {customer.lastName}</li>
          )}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  customers: state.customers
})

const dispatchToProps = (dispatch) => ({
  getCustomers: () => dispatch(getCustomers())
})

export default connect(mapStateToProps, dispatchToProps)(CustomersList);
