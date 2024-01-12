export const regexData = {
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  phone: /(\+977)?[9][6-9]\d{8}/,
  telNumber: /(\+977)?[9][6-9]\d{8}/,
  fbLink:
    /(?:(?:http|https):\/\/)?(?:www.)?facebook.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[?\w\-]*\/)?(?:profile.php\?id=(?=\d.*))?([\w\-]*)?/,
  instaLink:
    /(?:(?:http|https):\/\/)?(?:www\.)?(?:instagram\.com|instagr\.am)\/([A-Za-z0-9-_\.]+)/im,
};

export const proFormPersonaInfoFieldValidation = {
  name: [{ min: 3, max: 20 }, { required: true }],
  mobile: [
    {
      required: true,
    },
    {
      pattern: regexData.phone,
      message: 'Enter valid phone number!',
    },
  ],
  telePhone: [
    {
      // required: true,
    },
    {
      pattern: regexData.telNumber,
      message: 'Enter valid telephone number!',
    },
  ],
  email: [
    {
      required: true,
    },
    {
      pattern: regexData.email,
      message: 'Enter valid email address!',
    },
  ],
  age: [
    {
      required: true,
    },
    ({ getFieldValue }) => ({
      validator(_, value) {
        if (isNaN(value)) {
          return Promise.reject(new Error('Age must be number '));
        } else if (Number(value) < 16) {
          return Promise.reject(new Error('Age cannot le less than 16 '));
        } else {
          return Promise.resolve();
        }
      },
    }),
  ],
  gender: [
    {
      required: true,
    },
  ],

  dob: [
    { required: true },
    ({ getFieldValue }) => ({
      validator(_, value) {
        console.log(new Date().getTime(), 'new date');
        console.log(new Date(value).getTime(), 'value date');
        console.log(value < new Date(), 'value');
        const msIn16Years = 16 * (365 + 0.25) * 86400 * 1000;
        if (value && value + msIn16Years < Date.now()) {
          return Promise.resolve();
        }
        return Promise.reject(new Error('Minimum age should be 16 years '));
      },
    }),
  ],

  updateDob: [
    { required: true },
    ({ getFieldValue }) => ({
      validator(_, value) {
        const currentDate = new Date().getTime();
        const inputDate = new Date(value).getTime();
        const msIn16Years = 16 * (365 + 0.25) * 86400 * 1000;
        console.log(value && inputDate + msIn16Years < currentDate, 'truthy');
        if (value && inputDate + msIn16Years < currentDate) {
          return Promise.resolve();
        }
        return Promise.reject(new Error('Minimum age should be 16 years '));
      },
    }),
  ],

  // sex: [{ required: true }],
};

export const proFormAddressInfoFieldValidation = {
  address: [{ min: 10, max: 30 }, { required: true }],
  locality: [{ min: 3, max: 30 }, { required: true }],

  postal: [{ min: 3, max: 30 }, { required: true }],
  municipality: [{ min: 3, max: 30 }, { required: true }],
  district: [{ min: 3, max: 30 }, { required: true }],
};
export const proFormCareerInfoFieldValidation = {
  educationLevel: [{ min: 3, max: 30 }, { required: true }],
  employmentStatus: [{ min: 3, max: 30 }, { required: true }],
  entityEmployer: [{ min: 3, max: 30 }, { required: false }],
  noOfEmployees: [
    { required: false },
    ({ getFieldValue }) => ({
      validator(_, value) {
        console.log(value);
        if (isNaN(value)) {
          return Promise.reject(new Error('Number of Employees must be number '));
        } else {
          return Promise.resolve();
        }
      },
    }),
  ],
  professionLocality: [{ required: false }],
  functionality: [{ required: false }],
  otherQualification: [{ required: false }],
};
export const proFormCivilInfoFieldValidation = {
  nationality: [{ min: 3, max: 30 }, { required: true }],
  birthPlace: [{ min: 3, max: 30 }, { required: true }],
  residencyNo: [{ min: 3, max: 30 }, { required: true }],
  segurancaSocialNo: [{ required: true }],
  nifNo: [{ required: true }],
  expireDate: [{ required: true }],
};
export const proFormPaymentInfoFieldValidation = {
  paymentStatus: [{ min: 3, max: 30 }, { required: true }],
  payableFee: [{ required: true }],
  paidFee: [
    { required: true },
    ({ getFieldValue }) => ({
      validator(_, value) {
        if (value && parseInt(value) <= parseInt(getFieldValue('payableFee'))) {
          console.log(value, 'paid fee');
          console.log(getFieldValue('payableFee'), 'payableFee');
          return Promise.resolve();
        }
        return Promise.reject(new Error('Paid fee cannot be greater than total payable fee '));
      },
    }),
  ],
};
export const proFormCourseFieldValidation = {
  name: [{ min: 3, max: 20 }, { required: true }],
  teacherName: [{ min: 3, max: 20 }, { required: false }],
  zoomLink: [{ min: 3, max: 20 }, { required: true }],

  price: [{ min: 3, max: 20 }, { required: false }],
  startDateTime: [
    { required: true },
    ({ getFieldValue }) => ({
      validator(_, value) {
        if (value || value > Date.now()) {
          return Promise.resolve();
        }
        return Promise.reject(new Error('The start Date cannot be past date'));
      },
    }),
  ],
  endDateTime: [
    { required: true },
    ({ getFieldValue }) => ({
      validator(_, value) {
        if (!getFieldValue('startDateTime')) {
          return Promise.reject(new Error('First Enter start date time'));
        }
        if (!value) {
          return Promise.reject(new Error('The end date time is required'));
        }
        if (value < Date.now()) {
          return Promise.reject(new Error('The end Date cannot be past date'));
        }

        if (value + 1 < getFieldValue('startDateTime')) {
          return Promise.reject(
            new Error('The end date should be at least one day after start date time'),
          );
        }
        return Promise.resolve();
      },
    }),
  ],
  startDateTime: [{ required: true }],
  zoomLink: [{ min: 3, max: 200 }, { required: false }],
  description: [{ min: 3, max: 200 }, { required: false }],
  shifts: {
    name: [{ min: 3, max: 20 }, { required: true }],
    startTime: [{ required: true }],
    endTime: [{ required: true }],
  },
};
export const proFormUserFieldValidation = {
  username: [{ min: 3, max: 20 }, { required: true }],
  role: [{ required: true }],
  name: [{ min: 3, max: 20 }, { required: true }],
  password: [
    { min: 3, max: 20 },
    { required: true },
    {
      pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/,
      message: 'At Least One Uppercase,One Digit and 5 Characters are required',
    },
  ],
  confirm: [
    { min: 8, max: 20 },
    { required: true },
    {
      pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/,
      message:
        'At Least One Uppercase,One Digit and special character , minimum eight Characters are required',
    },
  ],
};

export const getAvatar = (name) => {
  return `https://ui-avatars.com/api/?length=1&rounded=true&background=random&name=${name}`;
};

export const proFormRoleOptions = [
  {
    value: 'admin',
    Label: 'Admin',
  },
  {
    value: 'agency',
    Label: 'Agency',
  },
];
