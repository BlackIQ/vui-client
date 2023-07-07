export const setSession = (session) => {
  return {
    type: "SET_SESSION",
    payload: session,
  };
};

export const unsetSession = () => {
  return {
    type: "UNSET_SESSION",
  };
};
