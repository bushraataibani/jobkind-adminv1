import React from "react";
import CompanyLoginWidget from "../CompanyLoginWidget/CompanyLoginWidget";
import { styled } from "@mui/material";

import CandidateLoginWidget from "../CandidateLoginWidget/CandidateLoginWidget";
import TotalCompanyWidget from "../TotalCompanyWidget/TotalCompanyWidget";
import TotalCandidateWidget from "../TotalCandidateWidget/TotalCandidateWidget";
import ActiveJobsWidget from "../ActiveJobsWidget/ActiveJobsWidget";
import ExpieredJobsWidget from "../ExpieredJobsWidget/ExpieredJobsWidget";
import TotalJobWidget from "../TotalJobWidget/TotalJobWidget";
import TotalRevenueWidget from "../TotalRevenueWidget/TotalRevenueWidget";

import compayLogin from "../../../../../assets/svg/compayLogin.svg";
import candidateLogin from "../../../../../assets/svg/candidateLogin.svg";
import company from "../../../../../assets/svg/company.svg";
import candidate from "../../../../../assets/svg/candidate.svg";
import activeJobs from "../../../../../assets/svg/activeJobs.svg";
import totalJobs from "../../../../../assets/svg/totalJobs.svg";
import totalExpired from "../../../../../assets/svg/totalExpired.svg";
import revenue from "../../../../../assets/svg/revenue.svg";
import TotalRevenueBarWidget from "../TotalRevenueBarWidget/TotalRevenueBarWidget";

const IconSvg = styled("img")(({ theme }) => {
  return {
    height: "70%",
    width: "70%",
  };
});

const IconBackColors = {
  company: "#8ACCFF",
  candidate: "#FFC18A",
  totalCompany: "#8AB1FF",
  totalCandidate: "#FF9E8A",
  activeJobs: "#4caf5094",
  expiredJobs: "#b55d5d",
  totalJobs: "#F9D970",
  totalRevenue: "#FB7A7A",
};

const MixedWidget = ({ state, loading, reload }) => {
  return (
    <>
      <CompanyLoginWidget
        reload={reload}
        IconBackColors={IconBackColors}
        loading={loading}
        Icon={<IconSvg src={compayLogin} alt="" />}
        styles={{
          textColor: IconBackColors.company,
        }}
        state={state}
      />{" "}
      <CandidateLoginWidget
        reload={reload}
        IconBackColors={IconBackColors}
        loading={loading}
        Icon={<IconSvg src={candidateLogin} alt="" />}
        styles={{
          textColor: IconBackColors.candidate,
        }}
        state={state}
      />
      <TotalCompanyWidget
        reload={reload}
        IconBackColors={IconBackColors}
        loading={loading}
        Icon={<IconSvg src={company} alt="" />}
        styles={{
          textColor: IconBackColors.totalCompany,
        }}
        state={state}
      />
      <TotalCandidateWidget
        reload={reload}
        IconBackColors={IconBackColors}
        loading={loading}
        Icon={<IconSvg src={candidate} alt="" />}
        styles={{
          textColor: IconBackColors.totalCandidate,
        }}
        state={state}
      />
      <ActiveJobsWidget
        reload={reload}
        IconBackColors={IconBackColors}
        loading={loading}
        Icon={<IconSvg src={activeJobs} alt="" />}
        styles={{
          textColor: IconBackColors.activeJobs,
        }}
        state={state}
      />{" "}
      <ExpieredJobsWidget
        reload={reload}
        IconBackColors={IconBackColors}
        loading={loading}
        Icon={<IconSvg src={totalExpired} alt="" />}
        styles={{
          textColor: IconBackColors.expiredJobs,
        }}
        state={state}
      />
      <TotalJobWidget
        reload={reload}
        IconBackColors={IconBackColors}
        loading={loading}
        Icon={<IconSvg src={totalJobs} alt="" />}
        styles={{
          textColor: IconBackColors.totalJobs,
        }}
        state={state}
      />
      <TotalRevenueWidget
        reload={reload}
        IconBackColors={IconBackColors}
        loading={loading}
        Icon={<IconSvg src={revenue} alt="" />}
        styles={{
          textColor: IconBackColors.totalRevenue,
        }}
        state={state}
      />
      <TotalRevenueBarWidget
        reload={reload}
        IconBackColors={IconBackColors}
        loading={loading}
        Icon={<IconSvg src={revenue} alt="" />}
        styles={{
          textColor: IconBackColors.totalRevenue,
        }}
        state={state}
      />
    </>
  );
};

export default MixedWidget;
