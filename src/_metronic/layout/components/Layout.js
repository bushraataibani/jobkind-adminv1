import React, { useMemo } from "react";
import objectPath from "object-path";
// LayoutContext
import { useHtmlClassService } from "../_core/MetronicLayout";
// Import Layout components
import { Header } from "./header/Header";
import { HeaderMobile } from "./header-mobile/HeaderMobile";
import { Aside } from "./aside/Aside";
import { Footer } from "./footer/Footer";
import { LayoutInit } from "./LayoutInit";
import { QuickPanel } from "./extras/offcanvas/QuickPanel";
import { QuickUser } from "./extras/offcanvas/QuickUser";
import { ScrollTop } from "./extras/ScrollTop";
import { styled } from "@mui/material";

export function Layout({ children }) {
  const uiService = useHtmlClassService();
  const Ktcontainer = styled("div")(({ theme }) => {
    return {
      width: "100%",

      [theme.breakpoints.up("xl")]: {
        maxWidth: "5000px",
      },
    };
  });
  const layoutProps = useMemo(() => {
    return {
      layoutConfig: uiService.config,
      selfLayout: objectPath.get(uiService.config, "self.layout"),
      asideDisplay: objectPath.get(uiService.config, "aside.self.display"),
      subheaderDisplay: objectPath.get(uiService.config, "subheader.display"),
      desktopHeaderDisplay: objectPath.get(
        uiService.config,
        "header.self.fixed.desktop"
      ),
      contentCssClasses: uiService.getClasses("content", true),
      contentContainerClasses: uiService.getClasses("content_container", true),
      contentExtended: objectPath.get(uiService.config, "content.extended"),
    };
  }, [uiService]);

  return layoutProps.selfLayout !== "blank" ? (
    <>
      {/*begin::Main*/}
      <HeaderMobile />
      <div
        className="d-flex flex-column flex-root"
        style={{
          height: "100%",
        }}
      >
        {/*begin::Page*/}
        <div
          className="d-flex flex-row flex-column-fluid page"
          style={{
            height: "100%",
          }}
        >
          {layoutProps.asideDisplay && <Aside />}
          {/*begin::Wrapper*/}
          <div
            className="d-flex flex-column flex-row-fluid wrapper"
            id="kt_wrapper"
            style={{
              overflow: "auto",
              marginTop: "0px",
            }}
          >
            <Header />
            {/*begin::Content*/}
            <div
              id="kt_content"
              style={{
                // minHeight: "0px",
                // padding: "0px",
                // overflow: "auto",
                // flex: "1 1 0%",
                padding: "0px",
                flex: 1,
                minHeight: 0,
                overflow: "auto",
              }}
              className={`content ${layoutProps.contentCssClasses} d-flex flex-column flex-column-fluid`}
            >
              {/*begin::Entry*/}
              {!layoutProps.contentExtended && (
                <div
                  className="d-flex flex-column-fluid"
                  style={{ height: "100%" }}
                >
                  {/*begin::Container*/}
                  <Ktcontainer style={{ padding: "0px" }}>
                    {children}
                  </Ktcontainer>
                  {/*end::Container*/}
                </div>
              )}

              {layoutProps.contentExtended && { children }}
              {/*end::Entry*/}
            </div>
            {/*end::Content*/}
            <Footer />
          </div>
          {/*end::Wrapper*/}
        </div>
        {/*end::Page*/}
      </div>
      <QuickUser />
      <QuickPanel />
      <ScrollTop />

      {/*end::Main*/}
      <LayoutInit />
    </>
  ) : (
    // BLANK LAYOUT
    <div className="d-flex flex-column flex-root">{children}</div>
  );
}
