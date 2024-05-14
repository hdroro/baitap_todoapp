import ReactPaginate from "react-paginate";
import { useEffect, useState } from "react";
import { deleteUser, fetchAllUsers } from "../../services/userService";
import ModalDelete from "../Task/ModalTask/ModalDelete";
import { toast } from "react-toastify";
import ModalForm from "./ModalUser/ModalForm";

function User() {
  const [dataModal, setDataModal] = useState({});
  const [searchValue, setSearchValue] = useState("");

  const [isShowModalDelete, setIsShowModalDelete] = useState(false);

  const [isShowModalForm, setIsShowModalForm] = useState(false);

  const [listUsers, setListUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [currentLimit, setCurrentLimit] = useState(5);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, searchValue]);

  const fetchUsers = async () => {
    let response = await fetchAllUsers(currentPage, currentLimit, searchValue);
    setListUsers(response.data);
    setTotalPages(response.totalPages);
  };

  const handlePageClick = async (event) => {
    setCurrentPage(+event.selected + 1);
  };

  const handleCloseModalForm = () => {
    setIsShowModalForm(false);
    fetchUsers();
  };

  const handleCloseModalDelete = () => {
    setIsShowModalDelete(false);
    fetchUsers();
  };

  const handleDeleteUser = (item) => {
    setIsShowModalDelete(true);
    setDataModal(item);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteUser(dataModal._id);
      toast.success("Delete successfully!");
      fetchUsers();
    } catch (error) {
      toast.error(error.response.data.message);
    }
    setIsShowModalDelete(false);
    setCurrentPage(1);
  };

  const handleChangeSearchValue = (value) => {
    setCurrentPage(1);
    setSearchValue(value);
  };

  return (
    <div className="container">
      <h4 className="mt-3 mb-4">Users List</h4>
      <div className="col-12 mb-3">
        <div className="d-flex justify-content-between">
          <button
            className="btn btn-primary col-sm-2"
            onClick={() => setIsShowModalForm(true)}
          >
            Create new user
          </button>
          <input
            type="text"
            className={`form-control offet-me-2 w-25`}
            id="search"
            placeholder="Enter name to search ..."
            value={searchValue}
            onChange={(e) => handleChangeSearchValue(e.target.value)}
          />
          {/* <button className="btn btn-primary">Search</button> */}
        </div>
      </div>
      <table className="table table-bordered text-center">
        <thead className="table-light">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Username</th>
            <th scope="col">Total tasks</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {listUsers && listUsers?.length
            ? listUsers.map((item, index) => (
                <tr key={index}>
                  <th scope="row">
                    {(currentPage - 1) * currentLimit + index + 1}
                  </th>
                  <td>{item.name}</td>
                  <td>{item.username}</td>
                  <td>
                    {item.tasks && item.tasks.length > 0
                      ? item.tasks.some((task) => task?.assignee !== null)
                        ? item.tasks
                            .filter((task) => task?.assignee !== null)
                            .map((task, idx) => (
                              <span key={task?._id}>
                                <span
                                  className={`badge ${
                                    task?.state === "todo"
                                      ? "bg-primary"
                                      : task?.state === "inprogress"
                                      ? "bg-warning"
                                      : "bg-success"
                                  }`}
                                >
                                  {task?.title}
                                </span>
                                {idx !== item?.tasks?.length - 1 && " "}
                              </span>
                            ))
                        : "None"
                      : "None"}
                  </td>

                  <td className="d-flex gap-2 justify-content-center">
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDeleteUser(item)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            : "No user exists"}
        </tbody>
      </table>
      {totalPages > 0 && (
        <div className="user-footer d-flex justify-content-center">
          <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={4}
            marginPagesDisplayed={3}
            pageCount={totalPages}
            previousLabel="< previous"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
            forcePage={currentPage - 1}
            renderOnZeroPageCount={null}
          />
        </div>
      )}
      <ModalDelete
        isShowModalDelete={isShowModalDelete}
        handleCloseModalDelete={handleCloseModalDelete}
        handleConfirmDelete={handleConfirmDelete}
        isDeleteUser
      />
      <ModalForm
        isShowModalForm={isShowModalForm}
        handleCloseModalForm={handleCloseModalForm}
      />
    </div>
  );
}

export default User;
