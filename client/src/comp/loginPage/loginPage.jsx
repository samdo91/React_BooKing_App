import React from "react";
import { useParams } from "react-router-dom";

function LoginPage() {
  let { params } = useParams();
  console.log("params", params);
  return <div> 로그인 페이지, {params}</div>;
}

export default LoginPage;
