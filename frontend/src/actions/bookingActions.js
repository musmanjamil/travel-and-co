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

// // Get curretly logged in user orders
// export const myOrders = () => async (dispatch) => {
//     try {

//         dispatch({ type: MY_ORDERS_REQUEST });

//         const { data } = await axios.get('/api/v1/orders/me')

//         dispatch({
//             type: MY_ORDERS_SUCCESS,
//             payload: data.orders
//         })

//     } catch (error) {
//         dispatch({
//             type: MY_ORDERS_FAIL,
//             payload: error.response.data.message
//         })
//     }
// }

// // Get order details
// export const getOrderDetails = (id) => async (dispatch) => {
//     try {

//         dispatch({ type: ORDER_DETAILS_REQUEST });

//         const { data } = await axios.get(`/api/v1/order/${id}`)

//         dispatch({
//             type: ORDER_DETAILS_SUCCESS,
//             payload: data.order
//         })

//     } catch (error) {
//         dispatch({
//             type: ORDER_DETAILS_FAIL,
//             payload: error.response.data.message
//         })
//     }
// }

// // Get all orders - ADMIN
// export const allOrders = () => async (dispatch) => {
//     try {

//         dispatch({ type: ALL_ORDERS_REQUEST });

//         const { data } = await axios.get(`/api/v1/admin/orders`)

//         dispatch({
//             type: ALL_ORDERS_SUCCESS,
//             payload: data
//         })

//     } catch (error) {
//         dispatch({
//             type: ALL_ORDERS_FAIL,
//             payload: error.response.data.message
//         })
//     }
// }

// // update order
// export const updateOrder = (id, orderData) => async (dispatch) => {
//     try {

//         dispatch({ type: UPDATE_ORDER_REQUEST })

//         const config = {
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         }

//         const { data } = await axios.put(`/api/v1/admin/order/${id}`, orderData, config)

//         dispatch({
//             type: UPDATE_ORDER_SUCCESS,
//             payload: data.success
//         })

//     } catch (error) {
//         dispatch({
//             type: UPDATE_ORDER_FAIL,
//             payload: error.response.data.message
//         })
//     }
// }

// // Delete order
// export const deleteOrder = (id) => async (dispatch) => {
//     try {

//         dispatch({ type: DELETE_ORDER_REQUEST })

//         const { data } = await axios.delete(`/api/v1/admin/order/${id}`)

//         dispatch({
//             type: DELETE_ORDER_SUCCESS,
//             payload: data.success
//         })

//     } catch (error) {
//         dispatch({
//             type: DELETE_ORDER_FAIL,
//             payload: error.response.data.message
//         })
//     }
// }


// Clear Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: 'CLEAR_ERRORS'
    })
}