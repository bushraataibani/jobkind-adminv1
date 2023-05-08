import React, { createContext } from "react";
import { useHistory } from "react-router-dom";
import Subscribe from "./Subscribe";

export const SubscribeContext = createContext(null);

export default function SubscribeRoute() {
  const history = useHistory();

  const UIEvents = {
    addSubscribe: () => {
      history.push(`/subscribe/add`);
    },
    openViewSubscribeDialog: (id) => {
      history.push(`/subscribe/${id}/view`);
    },
    deleteSubscribe: (id) => {
      history.push(`/subscribe/${id}/delete`);
    },
  };

  return (
    <SubscribeContext.Provider value={UIEvents}>
      <Subscribe />
    </SubscribeContext.Provider>
  );
}
