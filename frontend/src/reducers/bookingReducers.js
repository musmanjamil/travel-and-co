export const newBookingReducer = (state = {}, action) => {
    switch (action.type) {

        case 'CREATE_BOOKING_REQUEST':
            return {
                ...state,
                loading: true
            }

        case 'CREATE_BOOKING_SUCCESS':
            return {
                loading: false,
                success: true,
                booking: action.payload
            }

            case 'CREATE_BOOKING_RESET':
                return {
                    ...state,
                    success: false,
                }

        case 'CREATE_BOOKING_FAIL':
            return {
                loading: false,
                error: action.payload
            }

        case 'CLEAR_ERRORS':
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}
export const myBookingsReducer = (state = { bookings: [] }, action) => {
    switch (action.type) {

        case 'MY_BOOKINGS_REQUEST':
            return {
                loading: true
            }

        case 'MY_BOOKINGS_SUCCESS':
            return {
                loading: false,
                bookings: action.payload
            }

        case 'MY_BOOKINGS_FAIL':
            return {
                loading: false,
                error: action.payload
            }
        case 'CLEAR_ERRORS':
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}
export const allBookingsReducer = (state = { bookings: [] }, action) => {
    switch (action.type) {

        case 'ALL_BOOKINGS_REQUEST':
            return {
                loading: true
            }

        case 'ALL_BOOKINGS_SUCCESS':
            return {
                loading: false,
                bookings: action.payload.bookings,
            }

        case 'ALL_BOOKINGS_FAIL':
            return {
                loading: false,
                error: action.payload
            }
        case 'CLEAR_ERRORS':
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}
export const bookingReducer = (state = {}, action) => {
    switch (action.type) {

        case 'DELETE_BOOKING_REQUEST':
            return {
                ...state,
                loading: true
            }

        case 'DELETE_BOOKING_SUCCESS':
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }
        case 'DELETE_BOOKING_FAIL':
            return {
                ...state,
                error: action.payload
            }

        case 'UPDATE_BOOKING_RESET':
            return {
                ...state,
                isUpdated: false
            }

        case 'DELETE_BOOKING_RESET':
            return {
                ...state,
                isDeleted: false
            }

        case 'CLEAR_ERRORS':
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}
