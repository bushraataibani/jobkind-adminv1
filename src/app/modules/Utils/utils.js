import { isArray, isPlainObject, isEqual, reduce } from "lodash";
import { useState, useEffect } from "react";
Object.byString = function(o, s) {
  s = s.replace(/\[(\w+)\]/g, ".$1"); // convert indexes to properties
  s = s.replace(/^\./, ""); // strip a leading dot
  var a = s.split(".");
  for (var i = 0, n = a.length; i < n; ++i) {
    var k = a[i];
    if (o?.hasOwnProperty(k) && k in o) {
      o = o[k];
    } else {
      return;
    }
  }
  return o;
};

export const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const checkDateBetween = (from, to, check) => {
  const fDate = from.getTime();
  const lDate = to.getTime();
  const cDate = check.getTime();

  if (cDate <= lDate && cDate >= fDate) {
    return true;
  }
  return false;
};

export const getDataFromIdArray = (idArray = [], allData = []) => {
  return allData.filter((data) => {
    return idArray.some((id) => data._id === id);
  });
};

//mutable
const deleteFromArray = (arr = [], fieldToCompare, toCompare) => {
  const index = arr.findIndex((item) => item[fieldToCompare] === toCompare);
  if (index !== -1) arr.splice(index, 1);
};

export const isExceedCurrentDateTime = (date) => date > new Date();

/***************START***********License and Permissions**************************************** */
export const hasPermission = (permissions, permission = "") => {
  if (Array.isArray(permissions)) return permissions.includes(permission);
  if (typeof permissions === "object" && permissions !== null)
    return permissions[permission];
  return false;
};

export const hasFeatureInLicense = (
  licenseFeaturesArray = [],
  featureKey = ""
) => {
  return licenseFeaturesArray.some(
    (feature) => feature.code === featureKey && feature.isActive
  );
};

export const hasFeatureInLicenseAndPermission = (
  permissions = {},
  permission,
  licenseFeaturesArray = [],
  featureKey = ""
) => {
  return (
    hasPermission(permissions, permission) &&
    hasFeatureInLicense(licenseFeaturesArray, featureKey)
  );
};

//Object
export const removedNonLicensed = (
  configObject = {},
  mapData = {},
  featuresArray = []
) => {
  const configObjectOb = JSON.parse(JSON.stringify(configObject));
  for (const key in mapData) {
    if (Array.isArray(mapData[key])) {
      for (const [index, value] of mapData[key].entries()) {
        if (!featuresArray.some((f) => f.code === key && f.isActive)) {
          delete configObjectOb[value];
        }
      }
    } else if (typeof mapData[key] === "string") {
      if (!featuresArray.some((f) => f.code === key && f.isActive)) {
        delete configObjectOb[mapData[key]];
      }
    }
  }
  return configObjectOb;
};

//Array
export const removedNonLicensedFromArray = (
  itemsArray = [],
  mapData = {},
  featuresArray = []
) => {
  const itemsArrayCp = JSON.parse(JSON.stringify(itemsArray));

  for (const key in mapData) {
    if (!featuresArray.some((f) => f.code === key && f.isActive)) {
      if (Array.isArray(mapData[key])) {
        mapData[key].forEach((d) => {
          deleteFromArray(itemsArrayCp, "i", d);
        });
      } else {
        deleteFromArray(itemsArrayCp, "i", mapData[key]);
      }
      // const index = itemsArrayCp.findIndex(
      //   (item) => item[fieldToCompare] === mapData[key]
      // );
      // if (index !== -1) itemsArrayCp.splice(index, 1);
    }
  }

  return itemsArrayCp;
};

//Array
export const getNonLicensedClinicalConsole = (
  mapData = {},
  featuresArray = []
) => {
  const arr = [];
  for (const key in mapData) {
    if (!featuresArray.some((f) => f.code === key && f.isActive)) {
      arr.push(mapData[key]);
    }
  }

  return arr;
};
/***************END***********License and Permissions**************************************** */

export const getDataFromId = (id, allData = []) => {
  return allData.find((data) => {
    return data._id === id;
  });
};

export const getDataFromSearchConfig = (data = {}, config = {}) => {
  return data.filter((d) => {
    return Object.keys(config).every((k) => {
      if (k === "updatedAt")
        return checkDateBetween(
          new Date(config[k]?.split("|")?.[0]),
          new Date(config[k]?.split("|")?.[1]),
          new Date(d[k].time)
        );
      else if (Array.isArray(config[k])) return config[k].includes(d[k].data);
      else if (typeof d[k].data === "string")
        return d[k].data.toUpperCase().includes(config[k].toUpperCase());
      else if (typeof d[k].data === "number")
        return d[k].data.toString() === config[k].toString();
      else return true;
    });
  });
};

export function cleanObject(obj) {
  const cloneOb = JSON.parse(JSON.stringify(obj || {}));
  for (let propName in cloneOb) {
    if (
      cloneOb[propName] === null ||
      cloneOb[propName] === undefined ||
      cloneOb[propName] === "" ||
      cloneOb[propName] === "|" ||
      (typeof cloneOb[propName] == "object" &&
        Object.keys(cloneOb[propName]).length === 0)
    ) {
      delete cloneOb[propName];
    }

    if (typeof cloneOb[propName] == "string" && cloneOb[propName] !== "") {
      cloneOb[propName] = cloneOb[propName].trim();
    }
  }

  return cloneOb || {};
}

export const openLinkToNeWTab = (link) => {
  window.open(window.location.origin + "/" + link, "_blank");
};

export function emptyObjectToNull(obj) {
  for (let propName in obj) {
    if (
      (typeof obj[propName] == "object" &&
        Object.keys(obj[propName]).length === 0) ||
      (typeof obj[propName] == "string" && obj[propName]?.trim() === "")
    ) {
      obj[propName] = null;
    }
  }

  return obj;
}

export function emptyStringToNull(str) {
  if (typeof str == "string" && str === "") {
    return {};
  }

  return str;
}

export function textToClipboard(text) {
  let dummy = document.createElement("textarea");
  document.body.appendChild(dummy);
  dummy.value = text;
  dummy.select();
  document.execCommand("copy");
  document.body.removeChild(dummy);
}

export const changeHandlerImage = (e, setstate, shouldSetFileArray = false) => {
  const { files } = e.target;
  if (files[0]) {
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onloadend = (e) => {
      setstate({
        file: shouldSetFileArray ? files : files[0],
        url: reader.result,
      });
    };
  }
};
export const changeHandlerImageImprovedForVideo = (e, callback, props = {}) => {
  const { files } = e.target;
  if (files[0]) {
    let reader = new FileReader();
    let height = 0;
    let width = 0;

    reader.readAsDataURL(files[0]);
    reader.onloadend = (e) => {
      var image = new Image();

      image.src = reader.result;

      image.onload = function() {
        height = image.height;
        width = image.width;

        callback({
          file: props.shouldSetFileArray ? files : files[0],
          url: reader.result,
          imgHeight: height,
          imgWidth: width,
        });
      };
    };
  }
};
// changeHandlerImageImprovedForVideo

export const changeHandlerImageImproved = (e, callback, props = {}) => {
  const { files } = e.target;
  if (files[0]) {
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onloadend = (e) => {
      callback({
        file: props.shouldSetFileArray ? files : files[0],
        url: reader.result,
      });
    };
  }
};

export function toTitleCase(str) {
  return str.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

export const getCurrentDateTime = (
  dateOb,
  withSeconds = false,
  withTime = true
) => {
  if (withTime)
    return `${(dateOb.getMonth() + 1).toString().padStart(2, "0")}/${dateOb
      .getDate()
      .toString()
      .padStart(2, "0")}/${dateOb.getFullYear()}  ${formatAMPM(
      dateOb,
      withSeconds
    )}`;
  else
    return `${(dateOb.getMonth() + 1).toString().padStart(2, "0")}/${dateOb
      .getDate()
      .toString()
      .padStart(2, "0")}/${dateOb.getFullYear()}`;
};

export const getSecondsOfDay = (data) => {
  const date = new Date(data);
  const seconds = date.getSeconds();
  const minuets = date.getMinutes() * 60;
  const hours = date.getHours() * 24 * 60;
  return seconds + minuets + hours;
};

export const getHoursfromSeconds = (second) => {
  if (!second) {
    return "00:00";
  }
  const hours = Math.floor(second / 3600);
  let minutes;
  let seconds;
  if (second > 60) {
    minutes = Math.floor((second % 3600) / 60);
  } else {
    seconds = second;
  }
  const hhmmss = padTo2(hours) + ":" + padTo2(minutes) + ":" + padTo2(seconds);
  return hhmmss;
};
function padTo2(value) {
  if (!value) {
    return "00";
  }
  return value < 10 ? String(value).padStart(2, "0") : value;
}

export const checkStringIsDate = (parsedDate) => {
  return !isNaN(Date.parse(parsedDate));
};

export const formatAMPM = (dateOb, withSeconds) => {
  let hours = dateOb.getHours();
  let minutes = dateOb.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes.toString().padStart(2, "0");

  if (withSeconds) {
    const seconds = dateOb
      .getSeconds()
      .toString()
      .padStart(2, "0");
    return hours + ":" + minutes + ":" + seconds + " " + ampm;
  }

  return hours + ":" + minutes + " " + ampm;
};

export const assetsPrecedor = (serverIp) => "http://" + serverIp + "/";

//lodash to get diff
export const getLodashDiff = (obj1, obj2) => {
  const obj1Copy = JSON.parse(JSON.stringify(obj1 || {}));
  return reduce(
    obj1Copy,
    function(result, value, key) {
      if (isPlainObject(value)) {
        result[key] = getLodashDiff(value, obj2[key]);
      } else if (
        isArray(value) &&
        !isEqual([...value].sort(), [...obj2[key]].sort())
      ) {
        result[key] = value;
      } else if (!isArray(value) && !isEqual(value, obj2[key])) {
        if (value === "") {
          result[key] = null;
        } else result[key] = value;
      }
      return result;
    },
    {}
  );
};

export const IdChangeHandler = (id, state, setstate) => {
  let allIds = [...state];
  if (allIds.includes(id)) {
    const index = allIds.indexOf(id);
    allIds.splice(index, 1);
  } else {
    allIds.push(id);
  }
  setstate(allIds);
};

export function getDiff(a, b) {
  let diff = isArray(a) ? [] : {};
  recursiveDiff(a, b, diff);
  return diff;
}

export const makeid = (length) => {
  let result = "";
  let characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

function recursiveDiff(a, b, node) {
  for (let prop in a) {
    if (typeof b[prop] == "undefined") {
      addNode(prop, null, node);
    } else if (JSON.stringify(a[prop]) !== JSON.stringify(b[prop])) {
      // if value
      if (typeof b[prop] != "object" || b[prop] == null) {
        addNode(prop, b[prop], node);
      } else {
        // if array
        if (isArray(b[prop])) {
          addNode(prop, [], node);
          recursiveDiff(a[prop], b[prop], node[prop]);
        }
        // if object
        else {
          addNode(prop, {}, node);
          recursiveDiff(a[prop], b[prop], node[prop]);
        }
      }
    }
  }
}

function addNode(prop, value, parent) {
  parent[prop] = value;
}

// function isArray(obj) {
//   return Object.prototype.toString.call(obj) === "[object Array]";
// }

export function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export function formPayloadGenerator(data) {
  let formPayload = new FormData();
  for (let key in data) {
    formPayload.append(key, data[key]);
  }
  return formPayload;
}
export const secondsToTime = (
  secs,
  returnString = false,
  withAllZeros = false,
  withStringStandardFormat = false // 0:20 , 2:32:43,  4:32  (h:m:s)
) => {
  const hours = Math.floor(secs / (60 * 60));

  const divisor_for_minutes = secs % (60 * 60);
  const minutes = Math.floor(divisor_for_minutes / 60);

  const divisor_for_seconds = divisor_for_minutes % 60;
  const seconds = Math.ceil(divisor_for_seconds);

  let obj;
  if (withAllZeros)
    obj = {
      h: hours.toString().padStart(2, "0"),
      m: minutes.toString().padStart(2, "0"),
      s: seconds.toString().padStart(2, "0"),
    };
  else {
    obj = {
      h: hours.toString(),
      m: hours === 0 ? minutes.toString() : minutes.toString().padStart(2, "0"),
      s: seconds.toString().padStart(2, "0"),
    };
  }
  if (withStringStandardFormat) {
    if (hours === 0) return obj.m + ":" + obj.s;
    return obj.h + ":" + obj.m + ":" + obj.s;
  }

  if (returnString) return obj.h + ":" + obj.m + ":" + obj.s;
  return obj;
};

const getSearchValuesFromNestedArrayOfObjects = (
  allData = [],
  path,
  filter
) => {
  let arr = path.split("/");
  let data = arr[0];
  let value = arr[1];

  try {
    let newData = allData.filter((d) =>
      d[data]?.some((v) =>
        v[value]?.toUpperCase().includes(filter.keyword.toUpperCase())
      )
    );
    return newData;
  } catch (error) {
    console.error(error);
  }
};

const combineArraysWithoutDuplicateValues = (myArray1, myArray2) => {
  var myFinalArray = [];

  var myArray3 = myArray1.concat(myArray2);

  var ids = [];

  for (let index = 0; index < myArray3.length; index++) {
    let element = myArray3[index];
    if (ids.includes(element._id) === false) {
      myFinalArray.push(element);
      ids.push(element._id);
    }
  }

  return myFinalArray;
};

export const removeDuplicateFromArray = (arr) => {
  let ids = [];
  let finalArray = [];
  for (let index = 0; index < arr.length; index++) {
    const element = arr[index];
    if (ids.includes(element._id) === false) {
      finalArray.push(element);
      ids.push(element._id);
    }
  }
  return finalArray;
};

export const getGlobaleSearchFilteredDataNew = (allData = [], filter) => {
  if (filter) {
    let searchValues = allData.filter((data) =>
      filter.keys.some((key) => {
        let fieldValue = null;
        if (typeof key === "string" && key.includes(".")) {
          //support key="ob.field"
          fieldValue = Object.byString(data, key);
        } else {
          fieldValue = data?.[key];
        }

        if (fieldValue) {
          if (typeof fieldValue === "string")
            return fieldValue
              ?.toUpperCase()
              .includes(filter.keyword.toUpperCase());
          else if (Array.isArray(fieldValue)) {
            return fieldValue.some((d) =>
              d.toUpperCase().includes(filter.keyword.toUpperCase())
            );
          }
        }
        return false;
      })
    );

    let searchKeysWithPath = [];
    filter.keys.forEach((key) => {
      if (typeof key === "string" && key.includes("/")) {
        searchKeysWithPath.push(key);
      }
    });

    let mainArray = [];
    var subArray = [];
    // searchKeysWithPath = ["beds/room", "beds/unit",]
    let searchValuesArray = [];
    if (searchKeysWithPath.length > 0) {
      searchKeysWithPath.forEach((pathToSearch) => {
        let arrayToPush = getSearchValuesFromNestedArrayOfObjects(
          allData,
          pathToSearch,
          filter
        );
        searchValuesArray.push(arrayToPush);
      });
      if (searchValuesArray.length > 1) {
        for (let index = 0; index < searchValuesArray.length - 1; index++) {
          subArray = searchValuesArray[index].concat(
            searchValuesArray[index + 1]
          );
          mainArray = [
            ...mainArray,
            ...combineArraysWithoutDuplicateValues(searchValues, subArray),
          ];
          // mainArray = combineArraysWithoutDuplicateValues(searchValues, subArray)
        }
      } else {
        subArray = searchValuesArray[0];

        mainArray = combineArraysWithoutDuplicateValues(searchValues, subArray);
      }

      // mainArray = [...searchValues, ...mainArray]
    }

    const finalArray = removeDuplicateFromArray(mainArray);

    return finalArray;
  }
  return allData;
};

export const getGlobalSearchFilteredData = (allData = [], filter) => {
  if (filter)
    return allData.filter((data) =>
      filter.keys.some((key) => {
        let fieldValue = null;
        if (typeof key === "string" && key.includes(".")) {
          //support key="ob.field"
          fieldValue = Object.byString(data, key);
        } else {
          fieldValue = data?.[key];
        }

        if (fieldValue) {
          if (typeof fieldValue === "string")
            return fieldValue
              ?.toUpperCase()
              .includes(filter.keyword.toUpperCase());
          else if (Array.isArray(fieldValue)) {
            return fieldValue.some((d) =>
              d.toUpperCase().includes(filter.keyword.toUpperCase())
            );
          }
        }

        return false;
      })
    );

  return allData;
};

export const getGlobalSearchFilteredDataObject = (allData = [], filter) => {
  if (filter && typeof allData === "object" && filter.keyword !== "") {
    const filteredObject = {};

    Object.entries(allData).forEach(function([key, value]) {
      if (key.toUpperCase().includes(filter.keyword.toUpperCase())) {
        filteredObject[key] = value;
      }
    });

    return filteredObject;
  } else {
    return allData;
  }
};

export function isIPAddress(ipaddress) {
  const ipAdd = ipaddress?.split(":")[0] || "";
  if (
    /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
      ipAdd
    )
  ) {
    return true;
  }
  return false;
}

export default function useWindowDimensions() {
  const hasWindow = typeof window !== "undefined";

  function getWindowDimensions() {
    const width = hasWindow ? window.innerWidth : null;
    const height = hasWindow ? window.innerHeight : null;
    return {
      width,
      height,
    };
  }

  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    if (hasWindow) {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [hasWindow]);

  return windowDimensions;
}
