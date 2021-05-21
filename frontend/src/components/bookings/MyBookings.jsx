import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'

import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { myBookings, clearErrors } from '../../actions/bookingActions'

const MyBookings = () => {

    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, bookings } = useSelector(state => state.myBookings);

    useEffect(() => {
        dispatch(myBookings());

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }
    }, [dispatch, alert, error])

    const setOrders = () => {
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
                    label: 'Tour',
                    field: 'tour',
                    sort: 'asc'
                },
                
            ],
            rows: []
        }

        bookings && bookings.forEach(booking => {
            data.rows.push({
                id: booking._id,
                package: booking.tourPackage,
                amount: `$${booking.price}`,
                tour: booking.tour && booking.tour.name,
            })
        })

        return data;
    }

    return (
        <Fragment>

            <MetaData title={'My Bookings'} />

            <h1 className="my-5">My Bookings</h1>

            {loading ? <Loader /> : (
                <MDBDataTable
                    data={setOrders()}
                    className="px-3"
                    bordered
                    striped
                    hover
                />
            )}

        </Fragment>
    )
}

export default MyBookings