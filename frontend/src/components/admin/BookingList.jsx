import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'

import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { allBookings, deleteBooking, clearErrors } from '../../actions/bookingActions'

const BookingList = ({ history }) => {

    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, bookings } = useSelector(state => state.allBookings);
    const { isDeleted } = useSelector(state => state.booking)

    useEffect(() => {
        dispatch(allBookings());

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (isDeleted) {
            alert.success('Booking deleted successfully');
            history.push('/admin/bookings');
            dispatch({ type: 'DELETE_BOOKING_RESET' })
        }

    }, [dispatch, alert, error, isDeleted, history])

    const deleteBookingHandler = (id) => {
        dispatch(deleteBooking(id))
    }

    const setBookings = () => {
        const data = {
            columns: [
                {
                    label: 'Booking ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Package',
                    field: 'package',
                    sort: 'asc'
                },
                {
                    label: 'Amount',
                    field: 'amount',
                    sort: 'asc'
                },
                {
                    label: 'User',
                    field: 'user',
                    sort: 'asc'
                },
                {
                    label: 'Tour',
                    field: 'tour',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }
        console.log(bookings)
        bookings && bookings.map(booking => {
            data.rows.push({
                id: booking._id,
                package: booking.tourPackage,
                amount: `$${booking.price}`,
                user: booking.user.name,
                tour: booking.tour && booking.tour.name,
                actions: <Fragment>
                    {/* <Link to={`/admin/booking/${booking._id}`} className="btn btn-primary py-1 px-2">
                        <i className="fa fa-eye"></i>
                    </Link> */}
                    <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteBookingHandler(booking._id)}>
                        <i className="fa fa-trash"></i>
                    </button>
                </Fragment>
            })
        })

        return data;
    }


    return (
        <Fragment>
            <MetaData title={'All Bookings'} />
                    <Fragment>
                        <h1 className="my-5">All Bookings</h1>

                        {loading ? <Loader /> : (
                            <MDBDataTable
                                data={setBookings()}
                                className="px-3"
                                bordered
                                striped
                                hover
                            />
                        )}

                    </Fragment>
        </Fragment>
    )
}

export default BookingList