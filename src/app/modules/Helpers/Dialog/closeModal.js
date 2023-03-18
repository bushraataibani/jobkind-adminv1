export const closeModal = ({
  setIsEditing,
  onHide,
  resetForm,
  isViewForm = true,
  extraFunciton,
}) => () => {
  if (setIsEditing) setIsEditing(isViewForm ? false : true);
  if (resetForm) resetForm();
  if (extraFunciton) extraFunciton();
  onHide();
};
