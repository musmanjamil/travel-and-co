import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "react-js-pagination";
import Tour from "./Tours";
import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { getToursByBudget } from "../../actions/tourActions";

const SearchedByBudget = ({ match }) => {
  const budget = match.params.budget;
  const dispatch = useDispatch();
  // const [currentPage, setCurrentPage] = useState(1);

  const alert = useAlert();
  const {
    loading,
    error,
    selectedTours,
    //   toursCount,
    //   resPerPage,
    //   filteredToursCount,
  } = useSelector((state) => state.filteredTours);
  useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    dispatch(getToursByBudget(budget));
  }, [dispatch, alert, error, budget]);

  return (
    <>
    {loading ? (
        <Loader />
      ) : (
      selectedTours && (
        <div className="row">
          {selectedTours.length === 0 ? <div className='alert alert-danger mt-5 w-100'><b>No Tours found with this budget ({budget}).</b></div> 
                          :
          selectedTours.map((tour) => (
            <div class="col-sm-12 col-md-6 col-lg-3 my-3">
              <div class="card p-2">
                <img
                  class="card-img-top"
                  src={tour.images[0].url}
                  alt={tour.name}
                />
                <div class="card-body d-flex flex-column">
                  <h5 class="card-title">
                    <Link to={`/tour/${tour.tourId}`}>{tour.name}</Link>
                  </h5>
                  <h6 class="card-subtitle mb-2 text-muted">
                   {tour.description.substr(0,100)}...
                  </h6>

                  <p class="card-text">
                    <b>Package: {tour.type}</b>
                  </p>

                  <p class="card-text">
                    <b>Rs: {tour.details.cost}</b> / Person
                  </p>
                  <Link to={`/tour/${tour.tourId}`} id="view_btn" className="btn btn-block">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))
        }
        </div>
      )
      )}
    </>
  );
};

export default SearchedByBudget;
