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
    name: {
      type: "text",
      label: "نام",
      placeholder: "نام را وارد کنید",
      secure: false,
    },
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
