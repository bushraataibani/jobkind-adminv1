import { Paper } from "@mui/material";
import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { SeoSlice } from "../_redux/SEO/SeoSlice";
import { getAllSeo, getSeoPageSlug } from "../_redux/SEO/SeoCrud";
import SeoTable from "./components/SeoTable/SeoTable";

const Seo = () => {
  const dispatch = useDispatch();
  const { actions } = SeoSlice;

  const { allSeo, filter, page, dataPerPage } = useSelector(
    (state) => ({
      allSeo: state.seo.allSeo,
      filter: state.seo.filter,
      page: state.seo.page,
      dataPerPage: state.seo.dataPerPage,
    }),
    shallowEqual
  );

  const getAllData = () => {
    dispatch(actions.setLoading(true));
    getAllSeo({
      search: filter?.search?.keyword ? filter?.search?.keyword : "",
      page_no: page,
      page_record: dataPerPage,
    })
      .then((res) => {
        dispatch(actions.setAllSeo(res?.data?.data?.seo_data?.rows));
        dispatch(
          actions.setPageConfigData({
            type: "SET_DATA_COUNT",
            data: res?.data?.data?.seo_data?.count,
          })
        );
      })
      .catch((error) => console.error(error))
      .finally(() => {
        dispatch(
          actions.setPageConfigData({
            type: "SET_IS_LOADING",
            data: false,
          })
        );
      });
  };

  useEffect(() => {
    getAllData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, dataPerPage]);

  const getAllSeoPageSlug = () => {
    getSeoPageSlug({
      search: "",
      page_no: "",
      page_record: "",
    })
      .then((res) => {
        dispatch(actions.setAllPageSlug(res?.data?.data?.page_slug));
      })
      .catch((error) => console.error(error))
      .finally(() => {});
  };

  useEffect(() => {
    getAllSeoPageSlug();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Paper sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <SeoTable allSeo={allSeo} getAllData={getAllData} />
    </Paper>
  );
};

export default Seo;
