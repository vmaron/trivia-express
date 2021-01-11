import React from 'react';
import Layout from "../layouts/Layout";
import CustomersList from "../components/CustomersList/CustomersList";

const Customers = () => (
  <Layout
    center={<CustomersList/>}
  />
);

export default Customers;
