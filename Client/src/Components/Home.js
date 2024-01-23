import React, { useEffect, useState } from "react";
import DashBoard from "./DashBoard";
import FilterSegment from "./FilterSegment";
import Header from "./Header";
import endpoint from "../Server/MockServer";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

export default function Home() {
  const [searchFilter, setSearchFilter] = useState("");
  const [filterObject, setFilterObject] = useState("");
  const [data, setData] = useState("");
  let [searchParams, setSearchParams] = useSearchParams();

  const searchFilterCall = (url) => {
    axios
      .get(url)
      .then((res) => {
        console.log(res);
        setData(res.data.videos);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    let generArray = [];
    let ageGroup = "";
    let title = searchFilter ? searchFilter : "";

    filterObject.gener?.forEach((item) => {
      if (item.state === true) {
        generArray.push(item.name);
      }
    });
    filterObject.ageGroup?.forEach((item) => {
      if (item.state === true) {
        ageGroup = item.name;
      }
    });

    let paramsObject = {
      sortBy: filterObject.sortBy,
    };
    if (title) {
      Object.assign(paramsObject, { title: title });
    }
    if (generArray.length) {
      Object.assign(paramsObject, { genres: generArray.join(",") });
    }
    if (ageGroup) {
      Object.assign(paramsObject, { contentRating: ageGroup });
    }

    setSearchParams(paramsObject);
  }, [searchFilter, filterObject]);
  useEffect(() => {
    console.log("searchParams", searchParams.toString());
    let tempUrl = `${endpoint.key}/v1/videos?${searchParams.toString()}`;
    if(searchParams)
    {
      searchFilterCall(tempUrl);
    }
  }, [searchParams]);

  return (
    <>
      <Header setSearchFilter={setSearchFilter} hedearComponents />
      <FilterSegment setFilterObject={setFilterObject} />
      <DashBoard dataSend={data} />
    </>
  );
}
