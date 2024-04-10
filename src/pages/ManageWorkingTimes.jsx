import { useEffect, useState } from 'react';
import Breadcrumb from '../layouts/admin/Breadcrumb';
import TableHeader from '../layouts/admin/TableHeader';
import Table from '../layouts/admin/Table';
import AllWorkingTimesTable from '../components/ManageWorkingTimesTables/AllWorkingTimesTable';
import AddWorkingTimeModal from '../components/ManageWorkingTimesTables/AddWorkingTimeTable';
import UpdateWorkingTimeModal from '../components/ManageWorkingTimesTables/UpdateWorkingTimeTable';
import DeletePopup from '../components/ManageWorkingTimesTables/DeletePopup';

const navTitles = ['Tất cả'];

const ManageWorkingTimes = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false);
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [isReLoading, setIsReLoading] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});
  const [isOpenDeletePopup, setIsOpenDeletePopup] = useState(false);
  const [workingPlans, setWorkingPlans] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const newURL =
        import.meta.env.VITE_API_URL +
        '/working-plans?populate=doctor&limit=200&sortBy=createAt:desc';
      try {
        const response = await fetch(newURL, {
          headers: {
            Authorization:
              'Bearer ' + JSON.parse(localStorage.getItem('token')),
          },
        });
        const result = await response.json();
        setWorkingPlans(result.data.results);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleCloseUpdateModal = () => {
    setIsOpenUpdateModal(false);
  };

  const handleOpenUpdateModal = (item) => {
    setSelectedRow(item);
    setIsOpenUpdateModal(true);
  };

  const handleCloseAddModal = () => {
    setIsOpenAddModal(false);
  };

  const handleOpenAddModal = () => {
    setIsOpenAddModal(true);
  };

  const handleReLoading = (value) => {
    setIsReLoading(value);
  };

  const handleOpenDeletePopUp = (item) => {
    setSelectedRow(item);
    setIsOpenDeletePopup(true);
  };

  const handleCloseDeletePopUp = () => {
    setIsOpenDeletePopup(false);
  };

  return (
    <>
      <Breadcrumb pageName="Quản lý ca làm việc" />

      <div className="flex flex-col gap-9">
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <TableHeader
            navTitles={navTitles}
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
            handleOpenAddModal={handleOpenAddModal}
          />
          <Table
            indexTab={0}
            currentTab={currentTab}
            url={
              '/working-times?populate=workingPlan.doctor&sortBy=createdAt:desc'
            }
            tbodyItem={AllWorkingTimesTable}
            handleOpenUpdateModal={handleOpenUpdateModal}
            isReLoading={isReLoading}
            handleReLoading={handleReLoading}
            handleOpenDeletePopUp={handleOpenDeletePopUp}
          />
        </div>
      </div>

      <AddWorkingTimeModal
        isOpenAddModal={isOpenAddModal}
        handleCloseAddModal={handleCloseAddModal}
        handleReLoading={handleReLoading}
        workingPlans={workingPlans}
      />
      <UpdateWorkingTimeModal
        selectedRow={selectedRow}
        isOpenUpdateModal={isOpenUpdateModal}
        handleCloseUpdateModal={handleCloseUpdateModal}
        handleReLoading={handleReLoading}
        workingPlans={workingPlans}
      />
      <DeletePopup
        selectedRow={selectedRow}
        isOpenDeletePopup={isOpenDeletePopup}
        handleCloseDeletePopUp={handleCloseDeletePopUp}
        handleReLoading={handleReLoading}
      />
    </>
  );
};

export default ManageWorkingTimes;
