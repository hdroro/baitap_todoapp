import ReactPaginate from "react-paginate";
import ModalEdit from "./ModalTask/ModalEdit";
import { useEffect, useState } from "react";
import ModalDelete from "./ModalTask/ModalDelete";
import { fetchTaskPagniation, deleteTask } from "../../services/taskService";
import { toast } from "react-toastify";
import "./Task.scss";

function TaskList({ isLoadPage }) {
  const [isShowModalEdit, setIsShowModalEdit] = useState(false);
  const [dataModal, setDataModal] = useState({});
  const [searchValue, setSearchValue] = useState("");

  const [isShowModalDelete, setIsShowModalDelete] = useState(false);

  const [listTasks, setListTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [currentLimit, setCurrentLimit] = useState(5);
  const [totalPages, setTotalPages] = useState(0);

  const [todo, setTodo] = useState(0);
  const [inprogress, setInprogress] = useState(0);
  const [done, setDone] = useState(0);

  const [valueFilter, setValueFilter] = useState("");

  const [chosen, setChosen] = useState("");

  useEffect(() => {
    fetchTasks(valueFilter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    currentPage,
    isShowModalDelete,
    isShowModalEdit,
    searchValue,
    valueFilter,
    isLoadPage,
  ]);

  const fetchTasks = async (value = "") => {
    let response;
    try {
      response = await fetchTaskPagniation(
        currentPage,
        currentLimit,
        searchValue,
        value
      );
      setListTasks(response.data);
      setTotalPages(response.totalPages);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchCountProgress();
  }, [isShowModalEdit, isShowModalDelete, isLoadPage]);

  const fetchCountProgress = async () => {
    let response = await fetchTaskPagniation();
    setTodo(0);
    setInprogress(0);
    setDone(0);
    response.data.map((item, idx) => {
      if (item.state === "todo") {
        setTodo((prev) => prev + 1);
      } else if (item.state === "inprogress") {
        setInprogress((prev) => prev + 1);
      } else if (item.state === "done") {
        setDone((prev) => prev + 1);
      }
    });
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

  const handleEditTask = (item) => {
    setIsShowModalEdit(true);
    setDataModal(item);
  };

  const handleDeleteRole = (item) => {
    setIsShowModalDelete(true);
    setDataModal(item);
  };
  const handleConfirmDelete = async () => {
    try {
      await deleteTask(dataModal._id);
      toast.success("Delete successfully!");
    } catch (error) {
      toast.error(error.response.data.message);
    }
    setIsShowModalDelete(false);
    await fetchTaskPagniation(currentPage, currentLimit, searchValue);
    setCurrentPage(1);
  };

  const handleFilterProgress = (value) => {
    setChosen(value);
    setCurrentPage(1);
    setValueFilter(value);
    fetchTasks(value);
  };

  const handleChangeSearchValue = (value) => {
    setValueFilter("");
    setCurrentPage(1);
    setSearchValue(value);
    setChosen("");
  };

  return (
    <div className="container">
      <h4>Tasks List</h4>
      <div className="col-12  mb-3">
        <div className="d-flex gap-2 justify-content-between">
          <div className="count-state-tasks col-sm-4 d-flex gap-3 align-items-center">
            <span
              className={`badge bg-secondary ${chosen === "" ? "chosen" : ""}`}
              onClick={() => handleFilterProgress("")}
            >
              Total ({todo + done + inprogress})
            </span>
            <span
              className={`badge bg-primary ${
                chosen === "todo" ? "chosen" : ""
              }`}
              onClick={() => handleFilterProgress("todo")}
            >
              Todo ({todo})
            </span>
            <span
              className={`badge bg-warning ${
                chosen === "inprogress" ? "chosen" : ""
              }`}
              onClick={() => handleFilterProgress("inprogress")}
            >
              In progress ({inprogress})
            </span>
            <span
              className={`badge bg-success ${
                chosen === "done" ? "chosen" : ""
              }`}
              onClick={() => handleFilterProgress("done")}
            >
              Done ({done})
            </span>
          </div>
          <input
            type="text"
            className={`form-control w-25`}
            id="search"
            placeholder="Enter title to search ..."
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
            <th scope="col">Title</th>
            <th scope="col">Assignee</th>
            <th scope="col">State</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {listTasks && listTasks.length
            ? listTasks.map((item, index) => (
                <tr key={index}>
                  <th scope="row">
                    {(currentPage - 1) * currentLimit + index + 1}
                  </th>
                  <td>{item.title}</td>
                  <td>{item?.assignee?.username || "None"}</td>
                  <td>{item.state}</td>
                  <td className="d-flex gap-2 justify-content-center">
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
              ))
            : "No task exists"}
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

      <ModalEdit
        isShowModalEdit={isShowModalEdit}
        handleCloseModalEdit={handleCloseModalEdit}
        dataModal={dataModal}
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
