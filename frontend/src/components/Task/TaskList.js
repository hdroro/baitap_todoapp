import ReactPaginate from "react-paginate";
import ModalEdit from "./ModalTask/ModalEdit";
import { useEffect, useState } from "react";
import ModalDelete from "./ModalTask/ModalDelete";
import { fetchTaskPagniation, deleteTask } from "../../services/taskService";
import { toast } from "react-toastify";

function TaskList() {
  const [isShowModalEdit, setIsShowModalEdit] = useState(false);
  const [dataModal, setDataModal] = useState({});
  const [searchValue, setSearchValue] = useState("");

  const [isShowModalDelete, setIsShowModalDelete] = useState(false);

  const [listTasks, setListTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(2);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchTasks();
  }, [currentPage]);

  const fetchTasks = async () => {
    let response = await fetchTaskPagniation(
      currentPage,
      currentLimit,
      searchValue
    );
    if (response && response.EC === 0) {
      setListTasks(response.DT.data);
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

  const handleSearch = () => {
    console.log(searchValue);
  };

  const handleEditTask = (item) => {
    setIsShowModalEdit(true);
    setDataModal(item);
  };

  const handleConfirmDelete = async (id) => {
    let data = await deleteTask(id);
    console.log("data", data);
    if (data && +data.EC === 0) {
      toast.success(data.EM);
      await fetchTaskPagniation(currentPage, currentLimit, 1, searchValue);
      setIsShowModalDelete(false);
    } else {
      toast.error(data.EM);
    }
  };

  console.log("totalPagestotalPages", totalPages);
  return (
    <div className="container">
      <h4>Task List</h4>
      <div className="col-12 col-sm-3 mb-3 float-end">
        <div className="d-flex gap-2">
          <input
            type="text"
            className={`form-control`}
            id="search"
            placeholder="Enter title to search ..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button className="btn btn-primary" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Title</th>
            <th scope="col">Assignee</th>
            <th scope="col">Status</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {listTasks &&
            listTasks.length &&
            listTasks.map((item, index) => (
              <tr key={index}>
                <th scope="row">
                  {(currentPage - 1) * currentLimit + index + 1}
                </th>
                <td>{item.title}</td>
                <td>{item?.assignee?.username || "None"}</td>
                <td>{item.state}</td>
                <td className="d-flex gap-2">
                  <button
                    className="btn btn-warning"
                    onClick={() => handleEditTask(item)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleConfirmDelete(item.id)}
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

      <ModalEdit
        isShowModalEdit={isShowModalEdit}
        handleCloseModalEdit={handleCloseModalEdit}
        dataModel={dataModal}
      />

      <ModalDelete
        isShowModalDelete={isShowModalDelete}
        handleCloseModalDelete={handleCloseModalDelete}
        handleConfirmDelete={handleConfirmDelete}
      />
    </div>
  );
}

export default TaskList;
