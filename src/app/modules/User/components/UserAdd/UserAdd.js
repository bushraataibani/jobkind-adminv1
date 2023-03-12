import React from "react";
import UserAddForm from "./UserAddForm";

const UserAdd = ({ show, onHide }) => {
  const addUser = (data) => {
    // if (data?.description === "") {
    //   delete data.description;
    // }
    // return addRoleToServer(data).then(() => {
    //   dispatch(
    //     generalActions.pushNewAlert({
    //       show: true,
    //       heading: "Success",
    //       message: successMessage("Role", "added"),
    //       type: "success",
    //     })
    //   );
    //   getAllRoles()
    //     .then((res) => {
    //       dispatch(actions.setAllRoles(res.data));
    //     })
    //     .catch((data) => {
    //       console.log(data.response);
    //     });
    // });
  };

  return (
    <>
      <UserAddForm onHide={onHide} show={show} addUser={addUser} />
    </>
  );
};

export default UserAdd;
