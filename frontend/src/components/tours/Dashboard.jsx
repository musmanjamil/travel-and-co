import React, { Fragment, useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import {Link} from "react-router-dom";
import Tour from "./Tours";
import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { getTours } from "../../actions/tourActions";

const Dashboard = ({ match }) => {
  const keyword = match.params.keyword;
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);

  const alert = useAlert();
  const {
    loading,
    error,
    tours,
    toursCount,
    resPerPage,
    filteredToursCount,
  } = useSelector((state) => state.tours);
  useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    dispatch(getTours(keyword, currentPage));
  }, [dispatch, alert, error, currentPage, keyword]);
  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber);
  }
  let count = toursCount;
  if (keyword) {
    count = filteredToursCount;
  }
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Best places to vist"} />
          <section id="properties" class="container mt-5">

      <h2 class='mb-3 ml-2 stays-heading'>Recomended Places</h2>

      <Link to='/searchbybudget' class='ml-2 back-to-search'> <i class='fa fa-arrow-right'></i>Search By your budget</Link>

                {
                  <Fragment>
                      <div className="row">
                        {tours.map((tour) => (
                          <Tour key={tour._id} tour={tour} col={6} />
                        ))}
                      </div>
                  </Fragment>
                }
            </section>

            {resPerPage <= count && (
              <div className="d-flex justify-content-center mt-5">
                <Pagination
                  activePage={currentPage}
                  itemsCountPerPage={resPerPage}
                  totalItemsCount={count}
                  onChange={setCurrentPageNo}
                  nextPageText={"Next"}
                  prevPageText={"Prev"}
                  firstPageText={"First"}
                  lastPageText={"Last"}
                  itemClass="page-item"
                  linkClass="page-link"
                />
              </div>
            )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Dashboard;
