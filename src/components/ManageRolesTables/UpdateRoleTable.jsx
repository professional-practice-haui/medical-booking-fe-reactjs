import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import pick from '../../utils/pick';
import convertToSlug from '../../utils/convertToSlug';

const UpdateRoleModal = ({
  selectedRow,
  isOpenUpdateModal,
  handleCloseUpdateModal,
  handleReLoading,
}) => {
  const [roleInfo, setRoleInfo] = useState(selectedRow);

  useEffect(() => {
    setRoleInfo(selectedRow);
  }, [selectedRow]);

  const handleChange = (e) => {
    setRoleInfo({
      ...roleInfo,
      roleName: e.target.value,
      roleIndex: convertToSlug(e.target.value),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { id, ...remainingRoleInfo } = roleInfo;

    try {
      const response = await fetch(
        import.meta.env.VITE_API_URL + `/roles/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization:
              'Bearer ' + JSON.parse(localStorage.getItem('token')),
          },
          body: JSON.stringify(pick(remainingRoleInfo)),
        },
      );

      const result = await response.json();
      if (result.code === 200) {
        handleReLoading(true);
        handleCloseUpdateModal();
        toast.success(result.message);
      } else {
        alert(result.message);
      }
    } catch (err) {
      console.log(err.message);
      alert(err.message);
    }
  };

  return (
    <div
      className={
        `modal fixed inset-0 z-99999 w-full h-full bg-black bg-opacity-60 overflow-y-auto transition-all duration-1000 ease-in-out dark:bg-white dark:bg-opacity-30 ` +
        (isOpenUpdateModal === true ? 'show' : '')
      }
    >
      <div className="relative max-w-4xl my-8 mx-auto">
        <div className="relative flex flex-col bg-white rounded-lg shadow dark:bg-boxdark">
          <div className="flex justify-between p-4 border-b border-[#eee] dark:border-strokedark">
            <h3 className="text-title-sm font-normal text-black dark:text-white">
              Cập nhật quyền
            </h3>
            <button onClick={handleCloseUpdateModal}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="relative p-4">
              <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                <div className="w-full">
                  <label className="mb-2.5 block text-base font-bold text-black dark:text-white">
                    Tên quyền <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    name="roleName"
                    value={roleInfo?.roleName || ''}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                <div className="w-full">
                  <label className="mb-2.5 block text-base font-bold text-black dark:text-white">
                    Tên rút gọn
                  </label>
                  <input
                    type="text"
                    className="w-full rounded border-[1.5px] border-stroke bg-gray py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    name="roleIndex"
                    defaultValue={roleInfo.roleIndex}
                    onChange={handleChange}
                    readOnly
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-between p-4 border-t border-[#eee] dark:border-strokedark ">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md border border-primary py-3 px-5 text-center font-medium text-primary hover:bg-opacity-90"
                onClick={handleCloseUpdateModal}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 mr-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                  />
                </svg>
                THOÁT
              </button>
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-md bg-primary py-3 px-5 text-center font-medium text-white hover:bg-opacity-90"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 mr-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m4.5 12.75 6 6 9-13.5"
                  />
                </svg>
                CẬP NHẬT
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateRoleModal;
