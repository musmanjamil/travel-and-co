export const toursReducer = (state = { tours: [] }, action) => {
    switch (action.type) {
        case 'ALL_TOURS_REQUEST':
            return {
                loading: true,
                tours: []
            }
        case 'ALL_TOURS_SUCCESS':
            return {
                loading: false,
                tours: action.payload.tours,
                toursCount: action.payload.toursCount,
                filteredToursCount: action.payload.filteredToursCount,
                resPerPage: action.payload.resPerPage
            }
        case 'ALL_TOURS_FAIL':
            return {
                loading: false,
                error: action.payload
            }
        case 'CLEAR_ERRORS':
            return {
                ...state,
                error: null,
            };
        default:
            return state
    }
}
export const toursByBudgetReducer = (state = {selectedTours: [] }, action) => {
    switch (action.type) {
        case 'FILTERED_TOURS_REQUEST':
            return {
                loading: true,
                selectedTours: []
            }
        case 'FILTERED_TOURS_SUCCESS':
            return {
                loading: false,
                selectedTours: action.payload.selectedTours,
                // toursCount: action.payload.toursCount,
                // filteredToursCount: action.payload.filteredToursCount,
                // resPerPage: action.payload.resPerPage
            }
        case 'FILTERED_TOURS_FAIL':
            return {
                loading: false,
                error: action.payload
            }
        case 'CLEAR_ERRORS':
            return {
                ...state,
                error: null,
            };
        default:
            return state
    }
}

export const tourDetailsReducer = (state = { tour: {} }, action) => {
    switch (action.type) {

        case 'TOUR_DETAILS_REQUEST':
            return {
                ...state,
                loading: true
            }

        case 'TOUR_DETAILS_SUCCESS':
            return {
                loading: false,
                tour: action.payload
            }

        case 'TOUR_DETAILS_FAIL':
            return {
                ...state,
                error: action.payload
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

export const newTourReducer = (state = { tour: {} }, action) => {
    switch (action.type) {

        case 'NEW_TOUR_REQUEST':
            return {
                ...state,
                loading: true
            }

        case 'NEW_TOUR_SUCCESS':
            return {
                loading: false,
                success: action.payload.success,
                product: action.payload.product
            }

        case 'NEW_TOUR_FAIL':
            return {
                ...state,
                error: action.payload
            }

        case 'NEW_TOUR_RESET':
            return {
                ...state,
                success: false
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