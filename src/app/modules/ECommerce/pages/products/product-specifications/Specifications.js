import React, { useMemo } from "react";
import { SpecificationDeleteDialog } from "./SpecificationDeleteDialog";
import { SpecificationsDeleteDialog } from "./SpecificationsDeleteDialog";
import { SpecificationsFetchDialog } from "./SpecificationsFetchDialog";
import { SpecificationsFilter } from "./SpecificationsFilter";
import { SpecificationsGrouping } from "./SpecificationsGrouping";
import { SpecificationsLoadingDialog } from "./SpecificationsLoadingDialog";
import { SpecificationsTable } from "./SpecificationsTable";
import { useSpecificationsUIContext } from "./SpecificationsUIContext";

export function Specifications() {
  // Specifications UI Context
  const specsUIContext = useSpecificationsUIContext();
  const specsUIProps = useMemo(() => {
    return { ids: specsUIContext.ids };
  }, [specsUIContext]);

  return (
    <>
      <SpecificationsLoadingDialog />

      <SpecificationDeleteDialog />
      <SpecificationsDeleteDialog />
      <SpecificationsFetchDialog />
      <div className="form margin-b-30">
        <SpecificationsFilter />
        {specsUIProps.ids.length > 0 && (
          <>
            <SpecificationsGrouping />
            <br />
          </>
        )}
      </div>
      <SpecificationsTable />
    </>
  );
}
