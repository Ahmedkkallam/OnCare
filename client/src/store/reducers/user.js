const initialState = {
  users: [],
  user: null,
  me: null,
  isLoading: false,
};

const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "GUEST_CREATE_USER_SUCCESS":
    case "GUEST_LOG_IN_SUCCESS":
      return {
        ...state,
        me: payload,
      };

    case "USER_LOG_IN_FAILURE":
    case "USER_LOG_OUT_SUCCESS":
      return {
        ...state,
        me: null,
      };

    case "GUEST_READ_USER_SUCCESS":
      return {
        ...state,
        users: payload,
      };

    case "GUEST_UPDATE_BY_ID_SUCCESS":
      let users = [...state.users];

      users[
        state.users.findIndex(
          (user) => user.id.toString() === payload.id.toString()
        )
      ] = payload;

      return {
        ...state,
        users,
      };

    case "GUEST_DELETE_BY_ID_SUCCESS":
      return {
        ...state,
        users: state.users.filter((user) => user.id !== payload),
      };

    case "USER_SET_IS_LOADING":
      return {
        ...state,
        isLoading: payload,
      };

    case "GUEST_CREATE_USER_FAILURE":
    case "USER_LOG_OUT_FAILURE":
    case "GUEST_READ_USER_FAILURE":
    case "GUEST_UPDATE_BY_ID_FAILURE":
    case "GUEST_DELETE_BY_ID_FAILURE":
    /* falls through */
    default:
      return state;
  }
};

export default userReducer;
