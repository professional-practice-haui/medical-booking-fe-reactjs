import { useState } from 'react';
import Breadcrumb from '../layouts/admin/Breadcrumb';
import TableHeader from '../layouts/admin/TableHeader';
import Table from '../layouts/admin/Table';
import AllRolesTable from '../components/ManageRolesTables/AllRolesTable';
import UpdateRoleModal from '../components/ManageRolesTables/UpdateRoleTable';
import AddRoleModal from '../components/ManageRolesTables/AddRoleTable';
import DeletePopup from '../components/ManageRolesTables/DeletePopup';

const navTitles = ['Tất cả'];

const ManageRoles = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false);
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [isReLoading, setIsReLoading] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});
  const [isOpenDeletePopup, setIsOpenDeletePopup] = useState(false);

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
      <Breadcrumb pageName="Quản lý quyền" />

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
            url={'/roles?sortBy=createdAt:desc'}
            tbodyItem={AllRolesTable}
            handleOpenUpdateModal={handleOpenUpdateModal}
            isReLoading={isReLoading}
            handleReLoading={handleReLoading}
            handleOpenDeletePopUp={handleOpenDeletePopUp}
          />
        </div>
      </div>

      <UpdateRoleModal
        selectedRow={selectedRow}
        isOpenUpdateModal={isOpenUpdateModal}
        handleCloseUpdateModal={handleCloseUpdateModal}
        handleReLoading={handleReLoading}
      />
      <AddRoleModal
        isOpenAddModal={isOpenAddModal}
        handleCloseAddModal={handleCloseAddModal}
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

export default ManageRoles;
