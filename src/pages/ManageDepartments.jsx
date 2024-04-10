import { useEffect, useState } from 'react';
import Breadcrumb from '../layouts/admin/Breadcrumb';
import TableHeader from '../layouts/admin/TableHeader';
import Table from '../layouts/admin/Table';
import AllDepartmentsTable from '../components/ManageDepartmentsTables/AllDepartmentsTable';
import AddDepartmentModal from '../components/ManageDepartmentsTables/AddDepartmentTable';
import DeletePopup from '../components/ManageDepartmentsTables/DeletePopup';
import UpdateDepartmentModal from '../components/ManageDepartmentsTables/UpdateDepartmentTable';

const navTitles = ['Tất cả'];

const ManageDepartments = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false);
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [isReLoading, setIsReLoading] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});
  const [isOpenDeletePopup, setIsOpenDeletePopup] = useState(false);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const newURL = import.meta.env.VITE_API_URL + '/doctors?limit=1000';
      try {
        const response = await fetch(newURL, {
          headers: {
            Authorization:
              'Bearer ' + JSON.parse(localStorage.getItem('token')),
          },
        });
        const result = await response.json();
        setDoctors(result.data.results);
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
      <Breadcrumb pageName="Quản lý chuyên khoa" />
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
            url={'/departments?populate=leader&sortBy=createdAt:desc'}
            tbodyItem={AllDepartmentsTable}
            handleOpenUpdateModal={handleOpenUpdateModal}
            isReLoading={isReLoading}
            handleReLoading={handleReLoading}
            handleOpenDeletePopUp={handleOpenDeletePopUp}
          />
        </div>
      </div>

      <AddDepartmentModal
        isOpenAddModal={isOpenAddModal}
        handleCloseAddModal={handleCloseAddModal}
        handleReLoading={handleReLoading}
        doctors={doctors}
      />
      <UpdateDepartmentModal
        selectedRow={selectedRow}
        isOpenUpdateModal={isOpenUpdateModal}
        handleCloseUpdateModal={handleCloseUpdateModal}
        handleReLoading={handleReLoading}
        doctors={doctors}
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

export default ManageDepartments;
