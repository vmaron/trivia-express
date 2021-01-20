import React from 'react';
import TripleColumnsLayout from "../layouts/TripleColumnsLayout/TripleColumnsLayout";
import CustomersList from "../components/CustomersList/CustomersList";

const Customers = () => (
  <TripleColumnsLayout
    center={<CustomersList/>}
  />
);

export default Customers;
