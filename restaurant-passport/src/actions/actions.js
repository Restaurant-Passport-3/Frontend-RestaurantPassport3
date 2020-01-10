import axiosWithAuth from '../utils';

// Action type: LOGIN
export const LOGIN_START = 'LOGIN_START';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

//Action type: SIGNUP
export const REGISTER_START = 'REGISTER_START';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

//Action type: LOGOUT
export const LOGOUT_START = 'LOGOUT_START';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

//Action type: ADD PASSPORT
export const ADDPASSPORT_START = 'ADDPASSPORT_START';
export const ADDPASSPORT_SUCCESS = 'ADDPASSPORT_SUCCESS';
export const ADDPASSPORT_FAILURE = 'ADDPASSPORT_FAILURE';

//Action type: UPDATE PASSPORT
export const UPDATEPASSPORT_START = 'UPDATEPASSPORT_START';
export const UPDATEPASSPORT_SUCCESS = 'UPDATEPASSPORT_SUCCESS';
export const UPDATEPASSPORT_FAILURE = 'UPDATEPASSPORT_FAILURE';

//Action type: EDIT PASSPORT
export const HANDLE_EDIT_START = 'HANDLE_EDIT_START';
export const HANDLE_EDIT_SUCCESS = 'HANDLE_EDIT_SUCCESS';
export const HANDLE_EDIT_FAILURE = 'HANDLE_EDIT_FAILURE';


export const login = credentials => dispatch => {
    dispatch({ type: LOGIN_START });
    return (
      axiosWithAuth()
        .post("/auth/login", credentials)
        .then(res => {
          console.log("LOGIN_RES: ", res);
          localStorage.setItem("token", res.data.token);
          dispatch({ type: LOGIN_SUCCESS, payload: res.data });
          // return true;
        })
        .catch(err => {
          console.log("LOGIN ERR: ", err);
          dispatch({ type: LOGIN_FAILURE, payload: err.response.message });
        })
    );
};

export const register = newUser => dispatch => {
    dispatch({ type: REGISTER_START });
    return (
      axiosWithAuth()
        .post("/auth/register", newUser)
        .then(res => {
            console.log("REGISTER RES: ", res);
            dispatch({ type: REGISTER_SUCCESS });
        })
        .catch(err => {
            console.log("REGISTER ERR: ", err);
            dispatch({ type: REGISTER_FAILURE });
        })
    );
};

export const deleteToken = e => dispatch => {
  dispatch({ type: LOGOUT_START });
  e.preventDefault();
  localStorage.removeItem('token');
  localStorage.removeItem('user_id');
  dispatch({ type: LOGOUT_SUCCESS });
}

export const addToPassport = (restaurant, id) => dispatch => {
  dispatch({ type: ADDPASSPORT_START });

  const newRestaurant = {
    restaurant_id: restaurant.id
  };

  axiosWithAuth()
    .post(
      `/users/${id}/passport`, newRestaurant)
    .then(res => {
      dispatch({ type: ADDPASSPORT_SUCCESS });
    })
    .catch(err => {
      dispatch({ type: ADDPASSPORT_FAILURE });

    });
};

export const updateExplore = (input) => dispatch => {
  axiosWithAuth()
      .get(
        `/explore?search=${input.search}&location=${input.location}`
      )
      .then(res => {
        // console.log(res.data);
        dispatch({ type: UPDATEPASSPORT_SUCCESS, payload: res.data });
      })
      .catch(err => console.log(err));
};

export const handleEdit = (user_id, passportEdit) => dispatch => {
  axiosWithAuth()
      .put(`/users/${user_id}/passport`, passportEdit)
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err));
};