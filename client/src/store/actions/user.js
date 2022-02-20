import axios from "axios";

export const create = (user) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify(user);

    dispatch({
      type: "USER_SET_IS_LOADING",
      payload: true,
    });

    dispatch({
      type: "GUEST_CREATE_USER",
    });

    const res = await axios.post(`/api/users`, body, config);

    dispatch({
      type: "GUEST_CREATE_USER_SUCCESS",
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: "GUEST_CREATE_USER_FAILURE",
    });

    throw error.response.data;
  } finally {
    dispatch({
      type: "USER_SET_IS_LOADING",
      payload: false,
    });
  }
};

export const logIn = (user) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify(user);

    dispatch({
      type: "USER_SET_IS_LOADING",
      payload: true,
    });

    dispatch({
      type: "GUEST_LOG_IN",
    });

    const res = await axios.post(`/api/users/login`, body, config);

    dispatch({
      type: "GUEST_LOG_IN_SUCCESS",
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: "GUEST_LOG_IN_FAILURE",
    });
    throw error.response.data;
  } finally {
    dispatch({
      type: "USER_SET_IS_LOADING",
      payload: false,
    });
  }
};

export const logOut = () => async (dispatch) => {
  try {
    dispatch({
      type: "USER_LOG_OUT",
    });

    dispatch({
      type: "USER_LOG_OUT_SUCCESS",
    });
  } catch (error) {
    dispatch({
      type: "USER_LOG_OUT_FAILURE",
    });

    throw error.response.data;
  }
};

export const readAll = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    dispatch({
      type: "USER_SET_IS_LOADING",
      payload: true,
    });

    dispatch({
      type: "GUEST_READ_USER",
    });

    const res = await axios.get(`/api/users`, config);

    dispatch({
      type: "GUEST_READ_USER_SUCCESS",
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: "GUEST_READ_USER_FAILURE",
    });

    throw error.response.data;
  } finally {
    dispatch({
      type: "USER_SET_IS_LOADING",
      payload: false,
    });
  }
};

export const updateById = (data) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify(data);

    dispatch({
      type: "USER_SET_IS_LOADING",
      payload: true,
    });

    const res = await axios.patch(`/api/users/${data.id}`, body, config);

    dispatch({
      type: "GUEST_UPDATE_BY_ID_SUCCESS",
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: "GUEST_UPDATE_BY_ID_FAILURE",
    });

    throw error.response.data;
  } finally {
    dispatch({
      type: "USER_SET_IS_LOADING",
      payload: false,
    });
  }
};

export const deleteById = (user) => async (dispatch) => {
  try {
    dispatch({
      type: "USER_SET_IS_LOADING",
      payload: true,
    });

    // eslint-disable-next-line no-unused-vars
    const res = await axios.delete(`/api/users/${user.id}`);

    dispatch({
      type: "GUEST_DELETE_BY_ID_SUCCESS",
      payload: user.id,
    });
  } catch (error) {
    dispatch({
      type: "GUEST_DELETE_BY_ID_FAILURE",
    });

    throw error.response.data;
  } finally {
    dispatch({
      type: "USER_SET_IS_LOADING",
      payload: false,
    });
  }
};
