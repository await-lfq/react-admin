const initState = {
  // user列表数据
  userListData: {}
}
function reducer (state = initState, action) {
  switch (action.type) {
    case "GETUSERLISTDATA": // user列表
      const newState = JSON.parse(JSON.stringify(state));
      newState.userListData = action.data;
      return newState
      break;
    default:
      return state
      break;
  }

};
export default reducer