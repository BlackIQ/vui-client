const tables = {
  admins: {
    title: "لیست کاربران",
    fields: {
      name: "نام",
      username: "نام کاربری",
      password: "رمز ورورد",
      timestamp: "تاریخ ساخت",
      delete: "حذف کاربر",
      copy: "کپی کانفیگ",
    },
  },
  clients: {
    title: "لیست کاربران",
    fields: {
      name: "نام",
      username: "نام کاربری",
      password: "رمز ورورد",
      timestamp: "تاریخ ساخت",
      expire: "تاریخ اتمام",
      remind: "مانده",
      delete: "حذف کاربر",
      copy: "کپی کانفیگ",
    },
  },
  all: {
    title: "لیست همه",
    fields: {
      name: "نام",
      username: "نام کاربری",
      username: "سازنده",
      password: "رمز ورورد",
      timestamp: "تاریخ ساخت",
      expire: "تاریخ اتمام",
      remind: "مانده",
      copy: "کپی کانفیگ",
    },
  },
};

export default tables;
