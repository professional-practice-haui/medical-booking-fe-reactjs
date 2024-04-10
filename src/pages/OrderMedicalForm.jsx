import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import Breadcrumb from '../layouts/admin/Breadcrumb';

const OrderMedicalForm = ({ user }) => {
  let navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    fullName: user.fullName,
    gender: user.gender,
    dateOfBirth: user.dateOfBirth,
    email: user.email,
    address: user.address,
    phoneNumber: user.phoneNumber,
    cmndNumber: user.cmndNumber,
    codeInsurance: user.codeInsurance,
  });

  const [departments, setDepartments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [workingPlans, setWorkingPlans] = useState([]);
  const [workingTimes, setWorkingTimes] = useState([]);

  useEffect(() => {
    const customFetch = (url) =>
      fetch(import.meta.env.VITE_API_URL + url, {
        headers: {
          Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token')),
        },
      });

    const fetchData = async () => {
      try {
        const [
          departmentResponse,
          doctorResponse,
          workingPlanResponse,
          workingTimeResponse,
        ] = await Promise.all([
          customFetch('/departments?limit=1000'),
          customFetch('/doctors?limit=1000'),
          customFetch('/working-plans?limit=1000'),
          customFetch('/working-times?limit=10000'),
        ]);
        const departmentResult = await departmentResponse.json();
        const doctorResult = await doctorResponse.json();
        const workingPlanResult = await workingPlanResponse.json();
        const workingTimeResult = await workingTimeResponse.json();
        setDepartments(departmentResult.data.results);
        setDoctors(doctorResult.data.results);
        setWorkingPlans(workingPlanResult.data.results);
        setWorkingTimes(workingTimeResult.data.results);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]:
        e.target.type === 'file' ? e.target.files[0] : e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { workingPlan, ...remainingUserInfo } = userInfo;

    const data = new FormData();
    for (let key in remainingUserInfo) {
      if (key === 'department') {
        const department = departments.find(
          (d) => d.id === remainingUserInfo.department,
        );
        data.append('department', department.name);
      } else {
        data.append(key, remainingUserInfo[key]);
      }
    }

    try {
      const response = await fetch(
        import.meta.env.VITE_API_URL + `/health-forms`,
        {
          method: 'POST',
          headers: {
            Authorization:
              'Bearer ' + JSON.parse(localStorage.getItem('token')),
          },
          body: data,
        },
      );
      const result = await response.json();
      if (result.code === 201) {
        toast.success(result.message);
        setTimeout(() => navigate('/dashboard/history-order'), 1000);
      } else {
        alert(result.message);
      }
    } catch (err) {
      console.log(err.message);
      alert(err.message);
    }
  };

  return (
    <>
      <Breadcrumb pageName="Đặt lịch khám bệnh" />

      <div className="flex flex-col gap-9">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Biểu mẫu đặt lịch khám bệnh
            </h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="p-6.5">
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/3">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Họ và tên <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Nhập họ và tên"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    value={userInfo.fullName || ''}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="w-full xl:w-1/3">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Giới tính <span className="text-meta-1">*</span>
                  </label>
                  <div className="relative z-20 bg-transparent dark:bg-form-input">
                    <select
                      className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      defaultValue={userInfo.gender || ''}
                      onChange={handleChange}
                      required
                    >
                      <option>Nam</option>
                      <option>Nữ</option>
                      <option>Khác</option>
                    </select>
                    <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                      <svg
                        className="fill-current"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g opacity="0.8">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                            fill=""
                          ></path>
                        </g>
                      </svg>
                    </span>
                  </div>
                </div>

                <div className="w-full xl:w-1/3">
                  <label className="mb-3 block text-black dark:text-white">
                    Ngày sinh <span className="text-meta-1">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      className="custom-input-date custom-input-date-1 w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      value={
                        userInfo.dateOfBirth &&
                        format(new Date(userInfo.dateOfBirth), 'yyyy-MM-dd')
                      }
                      name="dateOfBirth"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/3">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Số CMND/CCCD <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    value={userInfo.cmndNumber || ''}
                    name="cmndNumber"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="w-full xl:w-1/3">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Email <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    value={userInfo.email || ''}
                    name="email"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="w-full xl:w-1/3">
                  <label className="mb-3 block text-black dark:text-white">
                    Số điện thoại
                  </label>
                  <input
                    type="text"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    value={userInfo.phoneNumber || ''}
                    name="phoneNumber"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/3">
                  <label className="mb-3 block text-black dark:text-white">
                    Ảnh CMND/CCCD <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="file"
                    className="w-full rounded-md border border-stroke p-3 outline-none transition file:mr-4 file:rounded file:border-[0.5px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2.5 file:text-sm file:font-medium focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-strokedark dark:file:bg-white/30 dark:file:text-white"
                    name="cmndImg"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="w-full xl:w-1/3">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Số BHYT
                  </label>
                  <input
                    type="text"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    value={userInfo.codeInsurance || ''}
                    name="codeInsurance"
                    onChange={handleChange}
                  />
                </div>

                <div className="w-full xl:w-1/3">
                  <label className="mb-3 block text-black dark:text-white">
                    Ảnh BHYT
                  </label>
                  <input
                    type="file"
                    className="w-full rounded-md border border-stroke p-3 outline-none transition file:mr-4 file:rounded file:border-[0.5px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2.5 file:text-sm file:font-medium focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-strokedark dark:file:bg-white/30 dark:file:text-white"
                    name="insuranceImg"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Địa chỉ hiện tại <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    value={userInfo.address || ''}
                    name="address"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Chuyên khoa khám <span className="text-meta-1">*</span>
                  </label>
                  <div className="relative z-20 bg-transparent dark:bg-form-input">
                    <select
                      className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      name="department"
                      onChange={handleChange}
                      required
                    >
                      <option value="">-- Chọn --</option>
                      {departments?.map((department, index) => (
                        <option key={index} value={department.id}>
                          {department.name}
                        </option>
                      ))}
                    </select>
                    <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                      <svg
                        className="fill-current"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g opacity="0.8">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                            fill=""
                          ></path>
                        </g>
                      </svg>
                    </span>
                  </div>
                </div>

                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Bác sĩ khám <span className="text-meta-1">*</span>
                  </label>
                  <div className="relative z-20 bg-transparent dark:bg-form-input">
                    <select
                      className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      name="doctor"
                      onChange={handleChange}
                      required
                    >
                      <option value="">-- Chọn --</option>
                      {doctors?.map(
                        (doctor, index) =>
                          doctor.department === userInfo.department && (
                            <option key={index} value={doctor.id}>
                              {doctor.name}
                            </option>
                          ),
                      )}
                    </select>
                    <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                      <svg
                        className="fill-current"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g opacity="0.8">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                            fill=""
                          ></path>
                        </g>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>

              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Ngày khám <span className="text-meta-1">*</span>
                  </label>
                  <div className="relative z-20 bg-transparent dark:bg-form-input">
                    <select
                      className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      name="workingPlan"
                      onChange={handleChange}
                      required
                    >
                      <option value="">-- Chọn --</option>
                      {workingPlans
                        ?.filter((item) => item.doctor === userInfo.doctor)
                        .map((workingPlan, index) => (
                          <option key={index} value={workingPlan.id}>
                            {format(new Date(workingPlan.date), 'dd/MM/yyyy')}
                          </option>
                        ))}
                    </select>
                    <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                      <svg
                        className="fill-current"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g opacity="0.8">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                            fill=""
                          ></path>
                        </g>
                      </svg>
                    </span>
                  </div>
                </div>

                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Ca khám <span className="text-meta-1">*</span>
                  </label>
                  <div className="relative z-20 bg-transparent dark:bg-form-input">
                    <select
                      className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      name="workingTime"
                      onChange={handleChange}
                      required
                    >
                      <option value="">-- Chọn --</option>
                      {workingTimes?.map(
                        (workingTime, index) =>
                          workingTime.workingPlan === userInfo.workingPlan && (
                            <option key={index} value={workingTime.id}>
                              {workingTime.startTime +
                                ' - ' +
                                workingTime.endTime}
                            </option>
                          ),
                      )}
                    </select>
                    <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                      <svg
                        className="fill-current"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g opacity="0.8">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                            fill=""
                          ></path>
                        </g>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <label className="mb-2.5 block text-black dark:text-white">
                  Lý do khám <span className="text-meta-1">*</span>
                </label>
                <textarea
                  rows={3}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  name="reason"
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <div className="flex flex-wrap justify-center gap-2">
                <Link
                  to="/dashboard"
                  className="inline-flex items-center justify-center rounded-md border border-primary py-4 px-10 text-center font-medium text-primary hover:bg-opacity-90 lg:px-8 xl:px-10"
                >
                  Quay lại
                </Link>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-md bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                >
                  Đặt lịch khám bệnh
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default OrderMedicalForm;
