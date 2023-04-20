import React, { useState } from "react";
import axios from "axios";

function RegisterPage() {
  const [name, setNames] = useState("");
  const [email, setEmails] = useState("");
  const [password, setPasswords] = useState("");

  // axios.post로 보낸다.
  const registerPost = async () => {
    try {
      await axios.post("http://127.0.0.1:4000/register", {
        name: name,
        email: email,
        password: password,
      });
    } catch (e) {
      alert("제출이 제대로 되지 않았음 왜일까?");
    }
  };

  const postUserData = (e) => {
    e.preventDefault();
    registerPost();
  };
  return (
    <div>
      <h1>RegisterPage</h1>

      <form onSubmit={postUserData}>
        <input
          type="text"
          placeholder="이름을 입력해주세요."
          value={name}
          onChange={(event) => {
            setNames(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="이메일을 입력해주세요."
          value={email}
          onChange={(event) => {
            setEmails(event.target.value);
          }}
        />
        <input
          type="password"
          placeholder="비밀번호를 입력해주세요."
          value={password}
          onChange={(event) => {
            setPasswords(event.target.value);
          }}
        />
        <button>제출 </button>
      </form>
    </div>
  );
}

export default RegisterPage;
