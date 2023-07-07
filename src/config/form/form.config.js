const forms = {
  auth: {
    username: {
      type: "text",
      label: "نام کاربری",
      placeholder: "نام کاربری را وارد کنید",
      secure: false,
    },
    password: {
      type: "number",
      label: "رمز ورود",
      placeholder: "رمز ورود را وارد کنید",
      secure: true,
    },
    god: {
      type: "checkbox",
      label: "ورود مدیر",
      placeholder: "جهت ورود به عنوان مدیر تیک را بزنید",
    },
  },
  user: {
    username: {
      type: "text",
      label: "نام کاربری",
      placeholder: "نام کاربری را وارد کنید",
      secure: false,
    },
    password: {
      type: "number",
      label: "رمز ورود",
      placeholder: "رمز ورود را وارد کنید",
      secure: true,
    },
  },
};

export default forms;
