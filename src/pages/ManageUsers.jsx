import { useEffect, useState } from 'react';
import Breadcrumb from '../layouts/admin/Breadcrumb';
import TableHeader from '../layouts/admin/TableHeader';
import Table from '../layouts/admin/Table';
import LockUsersTable from '../components/ManageUsersTables/LockUsersTable';
import UnlockUsersTable from '../components/ManageUsersTables/UnlockUsersTable';
import UpdateUserModal from '../components/ManageUsersTables/UpdateUserModal';
import Popup from '../components/ManageUsersTables/Popup';
import AddUserModal from '../components/ManageUsersTables/AddUserModal';
import DeletePopup from '../components/ManageUsersTables/DeletePopup';

const navTitles = ['Không khoá', 'Khoá'];

const ManageUsers = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false);
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [isReLoading, setIsReLoading] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});
  const [roles, setRoles] = useState([]);
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [isOpenDeletePopup, setIsOpenDeletePopup] = useState(false);
  const [typePopup, setTypePopup] = useState('lock');

  useEffect(() => {
    const fetchData = async () => {
      const newURL = import.meta.env.VITE_API_URL + '/roles?limit=1000';
      try {
        const response = await fetch(newURL, {
          headers: {
            Authorization:
              'Bearer ' + JSON.parse(localStorage.getItem('token')),
          },
        });
        const result = await response.json();
        setRoles(result.data?.results || []);
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

  const handleOpenPopUp = (item, type) => {
    setSelectedRow(item);
    setTypePopup(type);
    setIsOpenPopup(true);
  };

  const handleClosePopUp = () => {
    setIsOpenPopup(false);
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
      <Breadcrumb pageName="Quản lý tài khoản" />

      <div className="flex flex-col gap-9">
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <TableHeader
            navTitles={navTitles}
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
            isExport={true}
            handleOpenAddModal={handleOpenAddModal}
          />

          <Table
            indexTab={0}
            currentTab={currentTab}
            url={'/users?isLocked=false&sortBy=createdAt:desc'}
            tbodyItem={UnlockUsersTable}
            handleOpenUpdateModal={handleOpenUpdateModal}
            isReLoading={isReLoading}
            handleReLoading={handleReLoading}
            handleOpenPopUp={handleOpenPopUp}
          />
          <Table
            indexTab={1}
            currentTab={currentTab}
            url={'/users?isLocked=true&sortBy=createdAt:desc'}
            tbodyItem={LockUsersTable}
            handleOpenDeletePopUp={handleOpenDeletePopUp}
            isReLoading={isReLoading}
            handleReLoading={handleReLoading}
            handleOpenPopUp={handleOpenPopUp}
          />
        </div>
      </div>
      <UpdateUserModal
        selectedRow={selectedRow}
        isOpenUpdateModal={isOpenUpdateModal}
        handleCloseUpdateModal={handleCloseUpdateModal}
        roles={roles}
        handleReLoading={handleReLoading}
      />
      <AddUserModal
        roles={roles}
        isOpenAddModal={isOpenAddModal}
        handleCloseAddModal={handleCloseAddModal}
        handleReLoading={handleReLoading}
      />
      <Popup
        typePopup={typePopup}
        selectedRow={selectedRow}
        isOpenPopup={isOpenPopup}
        handleClosePopUp={handleClosePopUp}
        handleReLoading={handleReLoading}
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

export default ManageUsers;
