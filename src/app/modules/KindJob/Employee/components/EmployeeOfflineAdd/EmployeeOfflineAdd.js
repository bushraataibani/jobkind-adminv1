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
import { getAllJob } from "../../../_redux/Job/JobCrud";

const schema = yup.object({
  full_name: yup
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
  address: yup.string().trim(),
  city: yup.string().trim(),
  state: yup.string().trim(),
  education_title: yup
    .string()
    .trim()
    .required("Education is required"),
  degree: yup
    .string()
    .trim()
    .required("Degree is required"),
  specialization_title: yup
    .string()
    .trim()
    .required("Specialization is required"),
  collage_name: yup
    .string()
    .trim()
    .required("College is required"),
  education_type: yup
    .string()
    .trim()
    .required("Education Type is required"),
  completion_expected_date: yup
    .string()
    .trim()
    .required("Completion Year is required"),
  work_experience: yup.string().trim(),
  total_year_experiance: yup
    .string()
    .trim()
    .required("Years is required"),
  total_month_experiance: yup
    .string()
    .trim()
    .required("Month is required"),
  job_title: yup
    .string()
    .trim()
    .required("Job Title is required"),
  department_name: yup
    .string()
    .trim()
    .required("Department is required"),
  role_name: yup
    .string()
    .trim()
    .required("Role is required"),
  company_name: yup
    .string()
    .trim()
    .required("Comapny Name is required"),
  industry_name: yup
    .string()
    .trim()
    .required("Industry is required"),
  start_date: yup
    .string()
    .trim()
    .required("Start Date is required"),
  end_date: yup
    .string()
    .trim()
    .required("End Date is required"),
  current_salary: yup
    .string()
    .trim()
    .required("Salary is required"),
  employment_type_id: yup
    .string()
    .trim()
    .required("Employment Type is required"),
  notice_period_id: yup
    .string()
    .trim()
    .required("Notice Period is required"),
  skills: yup
    .string()
    .trim()
    .required("Skill is required"),
  resume_url: yup.string().trim(),
  profile_image: yup.object({
    file: yup.mixed(),
    url: yup.string(),
  }),
});

const EmployeeOfflineAdd = ({ show, onHide }) => {
  const init = {
    full_name: "",
    email: "",
    dob: new Date(),
    gender: "",
    address: "",
    city: "",
    state: "",
    education_title: "",
    degree_title: "",
    specialization_title: "",
    collage_name: "",
    education_type: "",
    completion_expected_date: new Date(),
    work_experience: "",
    total_year_experiance: "",
    total_month_experiance: "",
    job_title: "",
    industry_name: "",
    department_name: "",
    role_name: "",
    company_name: "",
    start_date: new Date(),
    end_date: new Date(),
    current_salary: "",
    employment_type_id: "",
    notice_period_id: "",
    skills: [],
    english_speaking_level_id: "",
    language_ids: [],
    preferred_employment_type_id: [],
    preferred_work_place_id: [],
    preferred_shift_id: [],
    resume_url: "",
    profile_image: {
      file: null,
      url: "",
    },
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
  const [allJob, setAllJob] = useState([]);

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

  const getAllJobList = () => {
    getAllJob({
      search: "",
      page_no: "",
      page_record: "",
    })
      .then((res) => {
        setAllJob(res?.data?.data?.job_data?.rows);
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
    getAllJobList();
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
      allJob={allJob}
    />
  );
};

export default EmployeeOfflineAdd;
