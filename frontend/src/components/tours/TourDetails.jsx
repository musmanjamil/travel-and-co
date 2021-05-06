import React, { Fragment, useState, useEffect } from "react";
import { Carousel } from "react-bootstrap";

import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { getTourDetails, clearErrors } from "../../actions/tourActions";

const Product = ({ match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, tour } = useSelector((state) => state.tourDetails);
  useEffect(() => {
    console.log(match.params.id);
    dispatch(getTourDetails(match.params.id));

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, error, match.params.id]);
  return (
    <Fragment>
      <div className="container container-fluid">
        <h2 className="mt-5">{tour.name}</h2>
        <Carousel pause="hover">
          {tour.images &&
            tour.images.map((image) => (
              <Carousel.Item key={image.public_id}>
                <img
                  className="d-block w-100 property-details-image m-auto"
                  src={image.url}
                  alt={tour.title}
                />
              </Carousel.Item>
            ))}
        </Carousel>
        <div className="row my-5">
            <h3>Description</h3>
            <p>{tour.description}</p>
          </div>
        {/* <div className="row my-5">
          <div className="col-8">
            <h3>Description</h3>
            <p>{tour.description}</p>

            <div className="features mt-5">
              <h3 className="mb-4">Features:</h3>
              <div className="room-feature">
                <i className="fa fa-cog fa-fw fa-users" aria-hidden="true"></i>
                <p>6 Guests</p>
              </div>

              <div className="room-feature">
                <i className="fa fa-cog fa-fw fa-bed" aria-hidden="true"></i>
                <p>2 Beds</p>
              </div>

              <div className="room-feature">
                <i className="fa fa-cog fa-fw fa-bath" aria-hidden="true"></i>
                <p>2 Baths</p>
              </div>

              <div className="room-feature">
                <i
                  className="fa fa-cog fa-fw fa-cutlery"
                  aria-hidden="true"
                ></i>
                <p>Kitchen</p>
              </div>
            </div>
          </div>

          <div className="col-4">
            <div className="booking-card shadow-lg p-4">
              <p className="price-per-night">
                <b>$28</b> / night
              </p>

              <div className="form-group">
                <label for="check_in_field">Check In</label>
                <input
                  type="text"
                  className="form-control"
                  id="check_in_field"
                  placeholder="MM-DD-YYYY"
                />
              </div>

              <div className="form-group">
                <label for="check_out_field">Check Out</label>
                <input
                  type="text"
                  className="form-control"
                  id="check_out_field"
                  placeholder="MM-DD-YYYY"
                />
              </div>

              <div className="form-group">
                <label for="guest_field">No. of Guests</label>
                <select className="form-control" id="guest_field">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                </select>
              </div>

              <button className="btn btn-block py-3 booking-btn">
                Check availability
              </button>
            </div>
          </div>
        </div> */}
      </div>
      <Fragment>
        <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
          <h1 class="display-4">Pakages</h1>
          <p class="lead">
          Pellentesque sodales, leo sit amet condimentum vulputate, risus nibh mollis risus, in placerat mi ipsum id lacus. Sed dictum rutrum porta. Etiam ut ante ex. Nam in mauris vitae purus faucibus tincidunt.
          </p>
        </div>
        <div class="container">
          <div class="card-deck mb-3 text-center">
            <div class="card mb-4 box-shadow">
              <div class="card-header">
                <h4 class="my-0 font-weight-normal">Silver</h4>
              </div>
              <div class="card-body">
                <h1 class="card-title pricing-card-title">
                 {tour.silver && tour.silver.cost} <small className="text-muted">Rs/-</small>
                </h1>
                <ul className="list-unstyled mt-3 mb-4">
                  <li>1 person included</li>
                  <li> Breakfast {tour.silver && tour.silver.breakfast && <i className="fas fa-check"></i>}{tour.silver && !tour.silver.breakfast && <i className="fas fa-times"></i>}</li>
                  <li> Lunch {tour.silver && tour.silver.lunch && <i className="fas fa-check"></i>}{tour.silver && !tour.silver.lunch && <i className="fas fa-times"></i>}</li>
                  <li> Dinner {tour.silver && tour.silver.dinner && <i className="fas fa-check"></i>}{tour.silver && !tour.silver.dinner && <i className="fas fa-times"></i>}</li>
                  <li> Transport {tour.silver && tour.silver.transport && <i className="fas fa-check"></i>}{tour.silver && !tour.silver.transport && <i className="fas fa-times"></i>}</li>
                </ul>
                <button
                  type="button"
                  className="btn btn-lg btn-block btn-p"
                >
                  Book now
                </button>
              </div>
            </div>
            <div className="card mb-4 box-shadow">
              <div className="card-header">
                <h4 className="my-0 font-weight-normal">Gold</h4>
              </div>
              <div className="card-body">
                <h1 className="card-title pricing-card-title">
                {tour.gold && tour.gold.cost} <small className="text-muted">Rs/- </small>
                </h1>
                <ul className="list-unstyled mt-3 mb-4">
                <li>1 person included</li>
                  <li> Breakfast {tour.gold && tour.gold.breakfast && <i className="fas fa-check"></i>}{tour.gold && !tour.gold.breakfast && <i className="fas fa-times"></i>}</li>
                  <li> Lunch {tour.gold && tour.gold.lunch && <i className="fas fa-check"></i>}{tour.gold && !tour.gold.lunch && <i className="fas fa-times"></i>}</li>
                  <li> Dinner {tour.gold && tour.gold.dinner && <i className="fas fa-check"></i>}{tour.gold && !tour.gold.dinner && <i className="fas fa-times"></i>}</li>
                  <li> Transport {tour.gold && tour.gold.transport && <i className="fas fa-check"></i>}{tour.gold && !tour.gold.transport && <i className="fas fa-times"></i>}</li>
                </ul>
                <button type="button" className="btn btn-lg btn-block btn-p">
                  Book now
                </button>
              </div>
            </div>
            <div className="card mb-4 box-shadow">
              <div className="card-header">
                <h4 className="my-0 font-weight-normal">platinum</h4>
              </div>
              <div className="card-body">
                <h1 className="card-title pricing-card-title">
                {tour.platinum && tour.platinum.cost}  <small className="text-muted">Rs/-</small>
                </h1>
                <ul className="list-unstyled mt-3 mb-4">
                <li>1 person included</li>
                <li> Breakfast {tour.platinum && tour.platinum.breakfast && <i className="fas fa-check"></i>}{tour.platinum && !tour.platinum.breakfast && <i className="fas fa-times"></i>}</li>
                  <li> Lunch {tour.platinum && tour.platinum.lunch && <i className="fas fa-check"></i>}{tour.platinum && !tour.platinum.lunch && <i className="fas fa-times"></i>}</li>
                  <li> Dinner {tour.platinum && tour.platinum.dinner && <i className="fas fa-check"></i>}{tour.platinum && !tour.platinum.dinner && <i className="fas fa-times"></i>}</li>
                  <li> Transport {tour.platinum && tour.platinum.transport && <i className="fas fa-check"></i>}{tour.platinum && !tour.platinum.transport && <i className="fas fa-times"></i>}</li>
                </ul>
                <button type="button" className="btn btn-lg btn-block btn-p">
                  Book now
                </button>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    </Fragment>
  );
};

export default Product;
