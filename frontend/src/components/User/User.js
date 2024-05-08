import ReactPaginate from "react-paginate";
import { fetchTaskPagniation } from "../../services/taskService";
import { useEffect, useState } from "react";
import { fetchAllUsers } from "../../services/userService";

function User() {
  const [isShowModalEdit, setIsShowModalEdit] = useState(false);
  const [dataModal, setDataModal] = useState({});
  const [searchValue, setSearchValue] = useState("");

  const [isShowModalDelete, setIsShowModalDelete] = useState(false);

  const [listUsers, setListUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(2);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchUsers();
  }, [currentPage, isShowModalDelete, isShowModalEdit, searchValue]);

  const fetchUsers = async () => {
    let response = await fetchAllUsers();
    if (response && response.EC === 0) {
      setListUsers(response.DT);
      setTotalPages(response.DT.totalPages);
    }
  };

  const handlePageClick = async (event) => {
    setCurrentPage(+event.selected + 1);
  };

  const handleCloseModalEdit = () => {
    setIsShowModalEdit(false);
  };

  const handleCloseModalDelete = () => {
    setIsShowModalDelete(false);
  };

  // const handleSearch = async () => {
  //   const response = await fetchTaskPagniation(
  //     currentPage,
  //     currentLimit,
  //     searchValue
  //   );
  //   if (response && +response.EC === 0) {
  //     toast.success(response.EM);
  //     setListTasks(response.DT);
  //   } else {
  //     toast.error(response.EM);
  //   }
  // };

  const handleEditTask = (item) => {
    setIsShowModalEdit(true);
    setDataModal(item);
  };

  const handleDeleteRole = (item) => {
    setIsShowModalDelete(true);
    setDataModal(item);
  };

  console.log(listUsers);

  return (
    <div className="container">
      <h4 className="mt-3">Users List</h4>
      <div className="col-12 col-sm-3 mb-3 float-end">
        <div className="d-flex gap-2">
          <input
            type="text"
            className={`form-control`}
            id="search"
            placeholder="Enter title to search ..."
            // value={searchValue}
            // onChange={(e) => setSearchValue(e.target.value)}
          />
          {/* <button className="btn btn-primary">Search</button> */}
        </div>
      </div>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Username</th>
            <th scope="col">Total Tasks</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {listUsers &&
            listUsers.length &&
            listUsers.map((item, index) => (
              <tr key={index}>
                <th scope="row">
                  {(currentPage - 1) * currentLimit + index + 1}
                </th>
                <td>{item.name}</td>
                <td>{item.username}</td>
                <td>
                  {item.tasks.length > 0
                    ? item.tasks.map((task, idx) => (
                        <span key={task.id}>
                          {task.title}
                          {idx === item.tasks.length - 1 ? null : ","}
                        </span>
                      ))
                    : "None"}
                </td>

                <td className="d-flex gap-2">
                  <button
                    className="btn btn-warning"
                    onClick={() => handleEditTask(item)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeleteRole(item)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {totalPages > 0 && (
        <div className="user-footer">
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
            renderOnZeroPageCount={null}
          />
        </div>
      )}

      {/* <ModalEdit
        isShowModalEdit={isShowModalEdit}
        handleCloseModalEdit={handleCloseModalEdit}
        dataModal={dataModal}
      />

      <ModalDelete
        isShowModalDelete={isShowModalDelete}
        handleCloseModalDelete={handleCloseModalDelete}
        handleConfirmDelete={handleConfirmDelete}
      /> */}
    </div>
  );
}

export default User;
