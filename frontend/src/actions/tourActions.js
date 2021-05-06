import axios from 'axios';

export const getTours = (keyword = '', currentPage = 1) => async (dispatch) => {
    try {

        dispatch({ type: 'ALL_TOURS_REQUEST' })

        let link = `/api/v1/tour?keyword=${keyword}&page=${currentPage}`

        const { data } = await axios.get(link)
        
        dispatch({
            type: 'ALL_TOURS_SUCCESS',
            payload: data
        })
    } catch (error) {
        dispatch({
            type: 'ALL_TOURS_FAIL',
            payload: error.response.data.message
        })
    }
}
export const newTour = (tourData) => async (dispatch) => {
    try {

        dispatch({ type: 'NEW_TOUR_REQUEST' })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post(`/api/v1/admin/tour/new`, tourData, config)

        dispatch({
            type: 'NEW_TOUR_SUCCESS',
            payload: data
        })

    } catch (error) {
        dispatch({
            type: 'NEW_TOUR_FAIL',
            payload: error.response.data.message
        })
    }
}
export const getToursByBudget = (budget) => async (dispatch) => {
    try {

        dispatch({ type: 'FILTERED_TOURS_REQUEST' })
        let link = `/api/v1/tours/search/${budget}`

        const { data } = await axios.get(link);
        
        dispatch({
            type: 'FILTERED_TOURS_SUCCESS',
            payload: data
        })
    } catch (error) {
        console.log(error);
        dispatch({
            type: 'FILTERED_TOURS_FAIL',
            payload: error.response.data.message
        })
    }
}
export const getTourDetails = (id) => async (dispatch) => {
    try {

        dispatch({ type: 'TOUR_DETAILS_REQUEST' })

        const { data } = await axios.get(`/api/v1/tour/${id}`)

        dispatch({
            type: 'TOUR_DETAILS_SUCCESS',
            payload: data.tour
        })

    } catch (error) {
        dispatch({
            type: 'TOUR_DETAILS_FAIL',
            payload: error.response.data.message
        })
    }
}
// Clear Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: 'CLEAR_ERRORS',
    });
};