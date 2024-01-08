import { get, post, put, del } from '/src/services/http-service';

export async function search(shiftId, params) {
  return await get(`/shift/student/${shiftId}?populate=students&populate=students.image`, params);
}

export async function getById(id, options) {
  return await get(`/student/detail/${id}?populate=image`, {}, options);
}

export async function update(id, params) {
  return await put(`/student/${id}`, params);
}

export async function save(classId, shiftId, params) {
  return await post(`/student/${classId}/${shiftId}`, params);
}
export async function sendEmail(studentId, courseId, params) {
  return await post(`/send-email/${studentId}/${courseId}`, params);
}
export async function remove(id, options) {
  return await del(`/student/${id}`, {}, options);
}

export async function getClasses() {
  return await get(
    `/course`,
    // params,
    {},
  );
}

export async function getShifts(id, options) {
  return await get(`/course/detail/${id}?populate=shifts`, {}, options);
}

export const validateUser = async (_, value, user) => {
  const { field, fullField } = _;
  const promise = Promise;
  if (!value) {
    return promise.reject(`${fullField} is required`);
  }
  // stop calling http api if length is less than 5
  if (value.length < 3) {
    return promise.reject(`${fullField} must be at least 5 characters`);
  }
  let query = {};
  query[field] = value;
  if (user._id) {
    query._id = { $ne: user._id };
  }
};
