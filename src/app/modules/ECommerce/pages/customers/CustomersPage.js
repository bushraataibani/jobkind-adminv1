import React from "react";
import { Route } from "react-router-dom";
import { CustomersFetchDialog } from "./customers-fetch-dialog/CustomersFetchDialog";
import { CustomersLoadingDialog } from "./customers-loading-dialog/CustomersLoadingDialog";
import { CustomersCard } from "./CustomersCard";
import { CustomersUIProvider } from "./CustomersUIContext";

export function CustomersPage({ history }) {
  const customersUIEvents = {
    newCustomerButtonClick: () => {
      history.push("/e-commerce/customers/new");
    },
    openEditCustomerDialog: (id) => {
      history.push(`/e-commerce/customers/${id}/edit`);
    },
    openDeleteCustomerDialog: (id) => {
      history.push(`/e-commerce/customers/${id}/delete`);
    },
    openDeleteCustomersDialog: () => {
      history.push(`/e-commerce/customers/deleteCustomers`);
    },
    openFetchCustomersDialog: () => {
      history.push(`/e-commerce/customers/fetch`);
    },
    openUpdateCustomersStatusDialog: () => {
      history.push("/e-commerce/customers/updateStatus");
    },
  };

  return (
    <CustomersUIProvider customersUIEvents={customersUIEvents}>
      <CustomersLoadingDialog />

      <Route path="/e-commerce/customers/fetch">
        {({ history, match }) => (
          <CustomersFetchDialog
            show={match != null}
            onHide={() => {
              history.push("/e-commerce/customers");
            }}
          />
        )}
      </Route>

      <CustomersCard />
    </CustomersUIProvider>
  );
}
