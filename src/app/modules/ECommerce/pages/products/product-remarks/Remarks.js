import React, { useMemo } from "react";
import { RemarkDeleteDialog } from "./RemarkDeleteDialog";
import { RemarksDeleteDialog } from "./RemarksDeleteDialog";
import { RemarksFetchDialog } from "./RemarksFetchDialog";
import { RemarksFilter } from "./RemarksFilter";
import { RemarksGrouping } from "./RemarksGrouping";
import { RemarksLoadingDialog } from "./RemarksLoadingDialog";
import { RemarksTable } from "./RemarksTable";
import { useRemarksUIContext } from "./RemarksUIContext";

export function Remarks() {
  // Remarks UI Context
  const remarksUIContext = useRemarksUIContext();
  const remarksUIProps = useMemo(() => {
    return { ids: remarksUIContext.ids };
  }, [remarksUIContext]);

  return (
    <>
      <RemarksLoadingDialog />

      <RemarkDeleteDialog />
      <RemarksDeleteDialog />
      <RemarksFetchDialog />
      <div className="form margin-b-30">
        <RemarksFilter />
        {remarksUIProps.ids.length > 0 && <RemarksGrouping />}
      </div>
      <RemarksTable />
    </>
  );
}
