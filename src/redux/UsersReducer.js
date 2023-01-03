const TOGGLE_FOLLOW = "TOGGLE-FOLLOW";
const SETUSERS = "SETUSERS";

let initialState = {
  users: [
    
  ],
};

export const UsersReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case TOGGLE_FOLLOW:
      return {
        ...state,
        users: state.users.map((user) => {
          if (user.id === action.userId) {
            return {
              ...state,
              ufollowed: !user.followed,
            };
          }
        }),
      };

    case SETUSERS:
      return {
        ...state,
        users: [...action.users],
      };
    default:
      return state;
  }
};



export const followAC = (userId) => ({ type: TOGGLE_FOLLOW, userId });

export const setUsersAC = (users) => ({ type: SETUSERS, users });
