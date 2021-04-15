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
  // function setCurrentPageNo(pageNumber) {
  //   setCurrentPage(pageNumber);
  // }
  // let count = toursCount;
  // if (budget) {
  //   count = filteredToursCount;
  // }
  return (
    <>
    {/* {selectedTours && <div className="mt-5">Not any Place in your budget</div> } */}
      {selectedTours && 
        <div className="row">
          {selectedTours.map((tour) => (
            <div class="col-sm-12 col-md-6 col-lg-3 my-3">
              <div class="card p-2">
                <img
                  class="card-img-top"
                  src={tour.images[0].url}
                  alt={tour.name}
                />
                <div class="card-body d-flex flex-column">
                  <h5 class="card-title">
                    <Link to="#">{tour.name}</Link>
                  </h5>
                  <h6 class="card-subtitle mb-2 text-muted">
                   Breakfast {tour.details.breakfast && <i class="fas fa-check"></i>}{!tour.details.breakfast && <i class="fas fa-times"></i>} 
                  </h6>
                  <h6 class="card-subtitle mb-2 text-muted">
                  Lunch {tour.details.lunch && <i class="fas fa-check"></i>}{!tour.details.lunch && <i class="fas fa-times"></i>}
                  </h6>
                  <h6 class="card-subtitle mb-2 text-muted">
                  Dinner {tour.details.dinner && <i class="fas fa-check"></i>}{!tour.details.dinner && <i class="fas fa-times"></i>}
                  </h6>
                  <h6 class="card-subtitle mb-2 text-muted">
                  Transport {tour.details.transport && <i class="fas fa-check"></i>}{!tour.details.transport && <i class="fas fa-times"></i>}
                  </h6>
                  <h6 class="card-subtitle mb-2 ">
                    Room: {tour.details.roomType}
                  </h6>
                  <p class="card-text">
                    <b>Rs: {tour.details.cost}</b> / Person
                  </p>
                  <Link to="#" id="view_btn" className="btn btn-block">
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
          }
        
        
    </>
  );
};

export default SearchedByBudget;
