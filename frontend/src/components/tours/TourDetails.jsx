import React, { Fragment, useState, useEffect } from "react";
import { Carousel } from "react-bootstrap";

import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { getTourDetails, clearErrors } from "../../actions/tourActions";
import {createBooking} from "../../actions/bookingActions"

const Product = ({ match }) => {

  const [startDate, setStartDate] = useState(new Date());

  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, tour } = useSelector((state) => state.tourDetails);
  const { success } = useSelector((state) => state.booking);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getTourDetails(match.params.id));

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if(success) {
      alert.success('Tour Booked Successfully.');
      dispatch({ type: 'CREATE_BOOKING_RESET' })
    }


  }, [dispatch, alert, error, match.params.id, success]);

  const bookRoom = (price , tourPackage) =>{

    const bookingData = { tour: tour._id, price, tourPackage, date: startDate }

    dispatch(createBooking(bookingData))

  }
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
                  <li> Transport : <b>{tour.silver && tour.silver.transport}</b></li>
                  <li> Room Type : <b>{tour.silver && tour.silver.roomType}</b></li>
                </ul>

                <DatePicker
                  selected={startDate}
                  minDate={new Date()}
                  onChange={date => setStartDate(date)}
                  className='form-control my-3'
                />

                <button
                  type="button"
                  className="btn btn-lg btn-block btn-p"
                  onClick={() => bookRoom(tour.silver.cost,'silver')}
                  disabled={loading||!user ? true: false}
                >
                  {!user ? 'Login to Book' : 'Book now'}
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
                  <li> Transport : <b>{tour.gold && tour.gold.transport}</b></li>
                  <li> Room Type : <b>{tour.gold && tour.gold.roomType}</b></li>
                </ul>

                <DatePicker
                  selected={startDate}
                  minDate={new Date()}
                  onChange={date => setStartDate(date)}
                  className='form-control my-3'
                />

                <button type="button" className="btn btn-lg btn-block btn-p" disabled={loading ||!user ? true: false} onClick={() => bookRoom(tour.gold.cost,'gold')}>
                {!user ? 'Login to Book' : 'Book now'}
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
                  <li> Transport : <b>{tour.platinum && tour.platinum.transport}</b></li>
                  <li> Room Type : <b>{tour.platinum && tour.platinum.roomType}</b></li>
                </ul>

                <DatePicker
                  selected={startDate}
                  minDate={new Date()}
                  onChange={date => setStartDate(date)}
                  className='form-control my-3'
                />


                <button type="button" className="btn btn-lg btn-block btn-p" disabled={loading||!user ? true: false} onClick={() => bookRoom(tour.platinum.cost,'platinum')}>
                {!user ? 'Login to Book' : 'Book now'}
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
