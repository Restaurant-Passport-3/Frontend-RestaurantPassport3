import React, { useState, useEffect } from "react";
import Restaurant from "./Restaurant";
import axiosWithAuth from "../utils/index";

function Passport({ setFlipped, flipped }) {
  const [passportList, setList] = useState([]);
  const user_id = localStorage.getItem("user_id");
  const [input, setInput] = useState({
    search: ""
  });
  const [search, setSearch] = useState(true);

  useEffect(() => {
    axiosWithAuth()
      .get(`https://rpass.herokuapp.com/api/users/${user_id}/passport`)
      .then(res => {
        // console.log("passport", res.data);
        setList(res.data);
      })
      .catch(err => console.log(err));
  }, [user_id, flipped, search]);

  const deleteRestaurant = id => {
    console.log(id);
    axiosWithAuth()
      .delete(`/users/${user_id}/passport/${id}`)
      .then(res => {
        console.log(res);
        console.log(id);
        this.props.history.push("/passport");
      })
      .catch(err => {
        console.log(err.message);
      });
  };

  const onFormSubmit = evt => {
    evt.preventDefault();
    console.log("passportList", passportList, "search", input.search);
    input.search === ""
      ? setSearch(!search)
      : setList(
          passportList.filter(e => {
            const values = Object.values(e);
            console.log("values", values);
            // return values.forEach(e =>
            //   JSON.stringify(e)
            //     .toLowerCase()
            //     .includes(input.search.trim())
            // );
            return e.name.toLowerCase().includes(input.search.trim());
          })
        );
    setInput({
      search: ""
    });
  };
  const onChangeHandler = e => {
    setInput({
      ...input,
      [e.target.name]: e.target.value.toLowerCase()
    });
  };

  return (
    <>
      <form onSubmit={onFormSubmit}>
        <input
          className="passport-search"
          type="text"
          placeholder="search"
          name="search"
          id="passportSearch"
          onChange={onChangeHandler}
          value={input.search}
        />
        <button type="submit">Search Passport</button>
      </form>
      <div className="passport-list">
        {passportList.map(e => (
          <Restaurant
            restaurant={e}
            setFlipped={setFlipped}
            deleteRestaurant={deleteRestaurant}
            flipped={flipped}
          />
        ))}
      </div>
    </>
  );
}

export default Passport;
