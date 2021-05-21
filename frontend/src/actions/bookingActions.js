import axios from 'axios'



export const createBooking = (booking) => async (dispatch, getState) => {
    try {

        dispatch({ type: 'CREATE_BOOKING_REQUEST' })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post('/api/v1/admin/booking/new', booking, config)

        dispatch({
            type: "CREATE_BOOKING_SUCCESS",
            payload: data
        })

    } catch (error) {
        console.log(error.response)
        dispatch({
            type: 'CREATE_BOOKING_FAIL',
            payload: error.response.data.message
        })
    }
}
// Get curretly logged in user bookings
export const myBookings = () => async (dispatch) => {
    try {

        dispatch({ type: 'MY_BOOKINGS_REQUEST' });

        const { data } = await axios.get('/api/v1/bookings/me')

        dispatch({
            type: 'MY_BOOKINGS_SUCCESS',
            payload: data.bookings
        })

    } catch (error) {
        dispatch({
            type: 'MY_BOOKINGS_FAIL',
            payload: error.response.data.message
        })
    }
}
// Get all bookings - ADMIN
export const allBookings = () => async (dispatch) => {
    try {

        dispatch({ type: 'ALL_BOOKINGS_REQUEST' });

        const { data } = await axios.get(`/api/v1/admin/booking`)
        dispatch({
            type: 'ALL_BOOKINGS_SUCCESS',
            payload: data
        })
       

    } catch (error) {
        dispatch({
            type: 'ALL_BOOKINGS_FAIL',
            payload: error.response.data.message
        })
    }
}


// Delete booking
export const deleteBooking = (id) => async (dispatch) => {
    try {

        dispatch({ type: 'DELETE_BOOKING_REQUEST' })

        const { data } = await axios.delete(`/api/v1/admin/booking/${id}`)

        dispatch({
            type: 'DELETE_BOOKING_SUCCESS',
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: 'DELETE_BOOKING_FAIL',
            payload: error.response.data.message
        })
    }
}
// Clear Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: 'CLEAR_ERRORS'
    })
}