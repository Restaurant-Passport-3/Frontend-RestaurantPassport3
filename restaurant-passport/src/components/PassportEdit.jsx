import React, { useState } from "react";
import { connect } from "react-redux";
import { handleEdit } from "../actions/actions";

function PassportEdit(props) {
  console.log("props", props);

  // const user_id = localStorage.getItem("user_id");

  const [passportEdit, setPassportEdit] = useState({
    restaurant_id: props.values.restaurant_id,
    notes: "",
    rating: "",
    stamped: null
  });

  const changeHandler = e => {
    setPassportEdit({
      ...passportEdit,
      [e.target.name]: e.target.value
    });
  };

  const changeHandlerNumber = e => {
    setPassportEdit({
      ...passportEdit,
      rating: Number(e.target.value)
    });
  };

  const changeHandlerCheck = e => {
    setPassportEdit({
      ...passportEdit,
      stamped: true
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log("Sending Put", passportEdit);
    props.handleEdit(props.user_id, passportEdit);
    props.setFlipped(true);
  };

  const onClickDelete = e => {
    e.preventDefault();
    props.deleteRestaurant(props.values.restaurant_id);
    props.setFlipped(true);
  };

  const onClickCan = e => {
    e.preventDefault();
    props.setFlipped(true);
  };

  return (
    <div className="restaurant-card-back restaurant-edit">
      <h3>{props.values.name}</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="notes">
          Notes:
          <input
            className="restaurant-edit-notes-input"
            type="text"
            name="notes"
            value={passportEdit.notes}
            onChange={changeHandler}
          />
        </label>
        <label htmlFor="rating" className="restaurant-edit-rating-label">
          Rating:
          <input
            type="number"
            name="rating"
            value={passportEdit.rating}
            onChange={changeHandlerNumber}
          />
        </label>
        <label htmlFor="stamped" className="restaurant-edit-stamped-label">
          Stamped:
          <input
            type="checkbox"
            name="stamped"
            value={passportEdit.stamped}
            onChange={changeHandlerCheck}
          />
        </label>
        <div className="passport-btn-div">
          <button className="passport-btn-edit" type="submit">
            Update
          </button>
          <button
            className="passport-btn-delete"
            onClick={e => onClickDelete(e)}
          >
            Delete
          </button>
          <button className="passport-btn-cancel" onClick={e => onClickCan(e)}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

// handleEdit
const mapStateToProps = state => {
  return {
    user_id: state.user_id
  }
};

export default connect(
  mapStateToProps,
    {
      handleEdit
    }
)(PassportEdit);

// export default PassportEdit;
