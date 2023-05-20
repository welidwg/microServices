export const is_Auth = !!localStorage.getItem("token");
export const user = JSON.parse(localStorage.getItem("user"));
