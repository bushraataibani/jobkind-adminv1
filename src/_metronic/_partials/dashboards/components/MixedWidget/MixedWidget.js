import { styled } from "@mui/material";
import React from "react";
import CompanyLoginWidget from "../CompanyLoginWidget/CompanyLoginWidget";

import ActiveJobsWidget from "../ActiveJobsWidget/ActiveJobsWidget";
import CandidateLoginWidget from "../CandidateLoginWidget/CandidateLoginWidget";
import ExpieredJobsWidget from "../ExpieredJobsWidget/ExpieredJobsWidget";
import TotalCandidateWidget from "../TotalCandidateWidget/TotalCandidateWidget";
import TotalCompanyWidget from "../TotalCompanyWidget/TotalCompanyWidget";
import TotalJobWidget from "../TotalJobWidget/TotalJobWidget";
import TotalRevenueBarWidget from "../TotalRevenueBarWidget/TotalRevenueBarWidget";
import TotalRevenueWidget from "../TotalRevenueWidget/TotalRevenueWidget";

import activeJobs from "../../../../../assets/svg/activeJobs.svg";
import totalCandidate from "../../../../../assets/svg/candidate.svg";
import candidateLogin from "../../../../../assets/svg/candidateLogin.svg";
import totalCompany from "../../../../../assets/svg/company.svg";
import compayLogin from "../../../../../assets/svg/compayLogin.svg";
import revenue from "../../../../../assets/svg/revenue.svg";
import totalExpired from "../../../../../assets/svg/totalExpired.svg";
import totalJobs from "../../../../../assets/svg/totalJobs.svg";
import totalRevenue from "../../../../../assets/svg/totalRevenue.svg";

const IconSvg = styled("img")(({ theme }) => {
  return {
    height: "50%",
    width: "50%",
  };
});

const IconBackColors = {
  company: "#f96e6f1f",
  candidate: "#4caf5029",
  totalCompany: "#8ab1ff4f",
  totalCandidate: "#00cfe81f",
  activeJobs: "#001fff29",
  expiredJobs: "#b7585854",
  totalJobs: "#F9D970",
  revenue: "#FB7A7A",
  totalRevenue: "#7fd0f3",
};

const MixedWidget = ({ state, loading, monthlyRevenue }) => {
  return (
    <>
      <CompanyLoginWidget
        loading={loading}
        Icon={<IconSvg src={compayLogin} alt="" />}
        styles={{
          textColor: IconBackColors.company,
        }}
        state={state}
      />{" "}
      <CandidateLoginWidget
        loading={loading}
        Icon={<IconSvg src={candidateLogin} alt="" />}
        styles={{
          textColor: IconBackColors.candidate,
        }}
        state={state}
      />
      <TotalCompanyWidget
        loading={loading}
        Icon={<IconSvg src={totalCompany} alt="" />}
        styles={{
          textColor: IconBackColors.totalCompany,
        }}
        state={state}
      />
      <TotalCandidateWidget
        loading={loading}
        Icon={<IconSvg src={totalCandidate} alt="" />}
        styles={{
          textColor: IconBackColors.totalCandidate,
        }}
        state={state}
      />
      <ActiveJobsWidget
        loading={loading}
        Icon={<IconSvg src={activeJobs} alt="" />}
        styles={{
          textColor: IconBackColors.activeJobs,
        }}
        state={state}
      />{" "}
      <ExpieredJobsWidget
        loading={loading}
        Icon={<IconSvg src={totalExpired} alt="" />}
        styles={{
          textColor: IconBackColors.expiredJobs,
        }}
        state={state}
      />
      <TotalJobWidget
        loading={loading}
        Icon={<IconSvg src={totalJobs} alt="" />}
        styles={{
          textColor: IconBackColors.totalJobs,
        }}
        state={state}
      />
      <TotalRevenueWidget
        loading={loading}
        Icon={<IconSvg src={revenue} alt="" />}
        styles={{
          textColor: IconBackColors.revenue,
        }}
        state={state}
      />
      <TotalRevenueBarWidget
        loading={loading}
        Icon={<IconSvg src={totalRevenue} alt="" />}
        styles={{
          textColor: IconBackColors.totalRevenue,
        }}
        monthlyRevenue={monthlyRevenue}
      />
    </>
  );
};

export default MixedWidget;
