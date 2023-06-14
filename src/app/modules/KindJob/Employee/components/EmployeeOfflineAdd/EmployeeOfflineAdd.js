import React, { useState } from "react";
import EmployeeOfflineAddForm from "./EmployeeOfflineAddForm";
import {
  addOfflineEmployeeToServer,
  getAllEmployee,
} from "../../../_redux/Employee/EmployeeCrud";
import { cleanObject } from "../../../../Utils/utils";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { successMessage } from "../../../../Helpers/Alert/messages";
import { EmployeeSlice } from "../../../_redux/Employee/EmployeeSlice";
import { generalSlice } from "../../../_redux/general/generalSlice";
import * as yup from "yup";
import { useEffect } from "react";
import { getAllLanguage } from "../../../_redux/Language/LanguageCrud";
import { getAllSkill } from "../../../_redux/Skill/SkillCrud";
import { getAllRole } from "../../../_redux/Role/RoleCrud";
import { getAllDepartment } from "../../../_redux/Department/DepartmentCrud";
import { getAllIndustry } from "../../../_redux/Industry/IndustryCrud";
import { getAllEducation } from "../../../_redux/Education/EducationCrud";
import { getAllCollege } from "../../../_redux/College/CollegeCrud";
import { getAllSpecialization } from "../../../_redux/Specialization/SpecializationCrud";
import { getAllDegree } from "../../../_redux/Degree/DegreeCrud";
import { getAllState } from "../../../_redux/State/StateCrud";
import { getAllCity } from "../../../_redux/City/CityCrud";

const schema = yup.object({
  fullName: yup
    .string()
    .trim()
    .required("Name is required"),
  email: yup
    .string()
    .trim()
    .required("Email is required")
    .email("Please enter a valid email"),
  dob: yup
    .string()
    .trim()
    .required("DOB is required"),
  gender: yup
    .string()
    .trim()
    .required("Gender is required"),
  city: yup
    .string()
    .trim()
    .required("City is required"),
  state: yup
    .string()
    .trim()
    .required("State is required"),
  education: yup
    .string()
    .trim()
    .required("Education is required"),
  degree: yup
    .string()
    .trim()
    .required("Degree is required"),
  specialization: yup
    .string()
    .trim()
    .required("Specialization is required"),
  collegeName: yup
    .string()
    .trim()
    .required("College is required"),
  educationType: yup
    .string()
    .trim()
    .required("Education Type is required"),
  completionYear: yup
    .string()
    .trim()
    .required("Completion Year is required"),
  highestEducation: yup
    .string()
    .trim()
    .required("Highest Education is required"),
  years: yup
    .string()
    .trim()
    .required("Years is required"),
  month: yup
    .string()
    .trim()
    .required("Month is required"),
  jobTitle: yup
    .string()
    .trim()
    .required("Job Title is required"),
  department: yup
    .string()
    .trim()
    .required("Department is required"),
  role: yup
    .string()
    .trim()
    .required("Role is required"),
  companyName: yup
    .string()
    .trim()
    .required("Comapny Name is required"),
  industry: yup
    .string()
    .trim()
    .required("Industry is required"),
  startDate: yup
    .string()
    .trim()
    .required("Start Date is required"),
  endDate: yup
    .string()
    .trim()
    .required("End Date is required"),
  salary: yup
    .string()
    .trim()
    .required("Salary is required"),
  empType: yup
    .string()
    .trim()
    .required("Employment Type is required"),
  noticePeriod: yup
    .string()
    .trim()
    .required("Notice Period is required"),
  skill: yup
    .string()
    .trim()
    .required("Skill is required"),
  english_level: yup
    .string()
    .trim()
    .required("English Speaking is required"),
  language: yup
    .string()
    .trim()
    .required("Language is required"),
  prefferedEmpType: yup
    .string()
    .trim()
    .required("Preffered Employment Type is required"),
  prefferedWorkPlace: yup
    .string()
    .trim()
    .required("Preffered Work Place is required"),
  prefferedShift: yup
    .string()
    .trim()
    .required("Preffered Shift is required"),
});

const EmployeeOfflineAdd = ({ show, onHide }) => {
  const init = {
    fullName: "",
    email: "",
    dob: new Date(),
    gender: "",
    city: "",
    state: "",
    education: "",
    degree: "",
    specialization: "",
    collegeName: "",
    educationType: "",
    completionYear: new Date(),
    highestEducation: "",
    isWorkExperience: "",
    years: "",
    month: "",
    jobTitle: "",
    industry: "",
    department: "",
    role: "",
    companyName: "",
    startDate: new Date(),
    endDate: new Date(),
    salary: "",
    empType: "",
    noticePeriod: "",
    skill: "",
    english_level: "",
    language: "",
    prefferedEmpType: "",
    prefferedWorkPlace: "",
    prefferedShift: "",
  };

  const dispatch = useDispatch();
  const { actions } = EmployeeSlice;
  const { actions: generalActions } = generalSlice;

  const { filter, page, dataPerPage } = useSelector(
    (state) => ({
      filter: state.employee.filter,
      page: state.employee.page,
      dataPerPage: state.employee.dataPerPage,
    }),
    shallowEqual
  );

  const [allCity, setAllCity] = useState([]);
  const [allState, setAllState] = useState([]);
  const [allDegree, setAllDegree] = useState([]);
  const [allSpecialization, setAllSpecialization] = useState([]);
  const [allCollege, setAllCollege] = useState([]);
  const [allEducation, setAllEducation] = useState([]);
  const [allIndustry, setAllIndustry] = useState([]);
  const [allDepartment, setAllDepartment] = useState([]);
  const [allRole, setAllRole] = useState([]);
  const [allSkill, setAllSkill] = useState([]);
  const [allLanguage, setAllLanguage] = useState([]);
  const [isResumeSubmitting, setIsResumeSubmitting] = useState(false);

  const getAllCitys = () => {
    getAllCity({
      search: "",
      page_no: "",
      page_record: "",
    })
      .then((res) => {
        setAllCity(res?.data?.data?.city_data?.rows);
      })
      .catch((error) => console.error(error))
      .finally(() => {});
  };

  const getAllStateList = () => {
    getAllState({
      search: "",
      page_no: "",
      page_record: "",
    })
      .then((res) => {
        setAllState(res?.data?.data?.state_data?.rows);
      })
      .catch((error) => console.error(error))
      .finally(() => {});
  };

  const getAllDegrees = () => {
    getAllDegree({
      search: "",
      page_no: "",
      page_record: "",
    })
      .then((res) => {
        setAllDegree(res?.data?.data?.degrees_data?.rows);
      })
      .catch((error) => console.error(error))
      .finally(() => {});
  };

  const getAllSpecializationList = () => {
    getAllSpecialization({
      search: "",
      page_no: "",
      page_record: "",
    })
      .then((res) => {
        setAllSpecialization(res?.data?.data?.specializations_data?.rows);
      })
      .catch((error) => console.error(error))
      .finally(() => {});
  };
  const getAllCollegeList = () => {
    getAllCollege({
      search: "",
      page_no: "",
      page_record: "",
    })
      .then((res) => {
        setAllCollege(res?.data?.data?.collage_data?.rows);
      })
      .catch((error) => console.error(error))
      .finally(() => {});
  };

  const getAllEducationList = () => {
    getAllEducation({
      search: "",
      page_no: "",
      page_record: "",
    })
      .then((res) => {
        setAllEducation(res?.data?.data?.educations_data?.rows);
      })
      .catch((error) => console.error(error))
      .finally(() => {});
  };

  const getAllIndustryList = () => {
    getAllIndustry({
      search: "",
      page_no: "",
      page_record: "",
    })
      .then((res) => {
        setAllIndustry(res?.data?.data?.industries_data?.rows);
      })
      .catch((error) => console.error(error))
      .finally(() => {});
  };

  const getAllDepartmentList = () => {
    getAllDepartment({
      search: "",
      page_no: "",
      page_record: "",
    })
      .then((res) => {
        setAllDepartment(res?.data?.data?.department_data?.rows);
      })
      .catch((error) => console.error(error))
      .finally(() => {});
  };

  const getAllRoleList = () => {
    getAllRole({
      search: "",
      page_no: "",
      page_record: "",
    })
      .then((res) => {
        setAllRole(res?.data?.data?.role_data?.rows);
      })
      .catch((error) => console.error(error))
      .finally(() => {});
  };

  const getAllSkillList = () => {
    getAllSkill({
      search: "",
      page_no: "",
      page_record: "",
    })
      .then((res) => {
        setAllSkill(res?.data?.data?.skill_data?.rows);
      })
      .catch((error) => console.error(error))
      .finally(() => {});
  };

  const getAllLanguageList = () => {
    getAllLanguage({
      search: "",
      page_no: "",
      page_record: "",
    })
      .then((res) => {
        setAllLanguage(res?.data?.data?.languages_data?.rows);
      })
      .catch((error) => console.error(error))
      .finally(() => {});
  };

  useEffect(() => {
    getAllCitys();
    getAllStateList();
    getAllDegrees();
    getAllSpecializationList();
    getAllCollegeList();
    getAllEducationList();
    getAllIndustryList();
    getAllDepartmentList();
    getAllRoleList();
    getAllSkillList();
    getAllLanguageList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addCandidateMgt = (data) => {
    const dataToServer = cleanObject(data);

    return addOfflineEmployeeToServer(dataToServer).then((res) => {
      dispatch(
        generalActions.pushNewAlert({
          show: true,
          heading: "Success",
          message: successMessage("Offline Employee", "added"),
          type: "success",
        })
      );

      dispatch(actions.setLoading(true));
      getAllEmployee({
        search: filter?.search?.keyword ? filter?.search?.keyword : "",
        page_no: page,
        page_record: dataPerPage,
      })
        .then((res) => {
          dispatch(
            actions.setAllEmployee(res?.data?.data?.employee_data?.rows)
          );
          dispatch(
            actions.setPageConfigData({
              type: "SET_DATA_COUNT",
              data: res?.data?.data?.employee_data?.count,
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
    });
  };

  return (
    <EmployeeOfflineAddForm
      show={show}
      onHide={onHide}
      addCandidateMgt={addCandidateMgt}
      schema={schema}
      init={init}
      allCity={allCity}
      allState={allState}
      allDegree={allDegree}
      allSpecialization={allSpecialization}
      allCollege={allCollege}
      allEducation={allEducation}
      allIndustry={allIndustry}
      allDepartment={allDepartment}
      allRole={allRole}
      allSkill={allSkill}
      allLanguage={allLanguage}
      setIsResumeSubmitting={setIsResumeSubmitting}
      isResumeSubmitting={isResumeSubmitting}
    />
  );
};

export default EmployeeOfflineAdd;
