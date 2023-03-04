/* eslint-disable no-restricted-imports */
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import { UserProfileDropdown } from "./dropdowns/UserProfileDropdown";

export function QuickUserToggler() {
  // const uiService = useHtmlClassService();
  // const layoutProps = useMemo(() => {
  //   console.log("uiService", uiService);
  //   return {
  //     offcanvas:
  //       objectPath.get(uiService.config, "extras.user.layout") === "offcanvas",
  //   };
  // }, [uiService]);

  return (
    <>
      <UserProfileDropdown />
    </>
  );
}
