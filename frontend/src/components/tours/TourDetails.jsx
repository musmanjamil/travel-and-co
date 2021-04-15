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
          <div className="col-8">
            <h3>Description</h3>
            <p>
              {tour.description}
            </p>

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
                <i className="fa fa-cog fa-fw fa-cutlery" aria-hidden="true"></i>
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
        </div>
        </div>
    </Fragment>
  );
};

export default Product;
