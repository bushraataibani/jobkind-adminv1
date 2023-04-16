import objectPath from "object-path";
import React, { useMemo } from "react";
import SVG from "react-inlinesvg";
import { Link } from "react-router-dom";
import { toAbsoluteUrl } from "../../../_helpers";
import { useHtmlClassService } from "../../_core/MetronicLayout";
// import brand from "../../../../assets/brand.jpg";

export function Brand() {
  const uiService = useHtmlClassService();

  const layoutProps = useMemo(() => {
    return {
      brandClasses: uiService.getClasses("brand", true),
      asideSelfMinimizeToggle: objectPath.get(
        uiService.config,
        "aside.self.minimize.toggle"
      ),
      headerLogo: uiService.getLogo(),
      headerStickyLogo: uiService.getStickyLogo(),
    };
  }, [uiService]);

  return (
    <>
      {/* begin::Brand */}
      <div
        className={`brand flex-column-auto ${layoutProps.brandClasses}`}
        id="kt_brand"
        // style={{
        //   backgroundImage: `url(${brand})`,
        //   backgroundRepeat: "no-repeat",
        //   backgroundPosition: "center center",
        //   opacity: "0.8",
        // }}
      >
        {/* begin::Logo */}
        <Link to="/" className="brand-logo">
          {/* <span style={{ color: "#fff", fontWeight: 600, fontSize: "20px" }}>
            KIND JOB
          </span> */}

          <img
            alt="Logo"
            className="max-w-120px"
            src={toAbsoluteUrl("/media/logos/splash-logo.png")}
          />
        </Link>
        {/* end::Logo */}

        {layoutProps.asideSelfMinimizeToggle && (
          <>
            {/* begin::Toggle */}
            <button
              className="brand-toggle btn btn-sm px-0"
              id="kt_aside_toggle"
            >
              <span className="svg-icon svg-icon-xl">
                <SVG
                  src={toAbsoluteUrl(
                    "/media/svg/icons/Navigation/Angle-double-left.svg"
                  )}
                />
              </span>
            </button>
            {/* end::Toolbar */}
          </>
        )}
      </div>
      {/* end::Brand */}
    </>
  );
}
