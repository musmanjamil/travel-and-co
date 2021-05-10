import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

const Tour = ({ tour, col }) => {

    return (
        <Fragment>
            <div class="col-sm-12 col-md-6 col-lg-3 my-3">
            <div class="card p-2">
              <img
                class="card-img-top"
                 src={tour.images[0].url}
                 alt={tour.name}
              />
              <div class="card-body d-flex flex-column">
                <h5 class="card-title">
                <Link to={`/tour/${tour._id}`} >{tour.name}</Link>
                </h5>
                <h6 class="card-subtitle mb-2 text-muted">
                   {tour.description.substr(0,100)}...
                  </h6>
                <Link to={`/tour/${tour._id}`} id="view_btn" className="btn btn-block">View Details</Link>
              </div>
            </div>
          </div>
        </Fragment>
    )
}

export default Tour
