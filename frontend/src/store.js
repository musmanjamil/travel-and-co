import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {authReducer, userReducer, forgotPasswordReducer} from './reducers/userReducers'
import { toursReducer, toursByBudgetReducer, tourDetailsReducer,newTourReducer} from './reducers/tourReducers'
import { newBookingReducer, allBookingsReducer, bookingReducer, myBookingsReducer} from './reducers/bookingReducers'

const reducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  forgotPassword: forgotPasswordReducer,
  tours: toursReducer,
  filteredTours:toursByBudgetReducer,
  tourDetails:tourDetailsReducer,
  newbooking:newBookingReducer,
  newTour:newTourReducer,
  allBookings:allBookingsReducer,
  booking:bookingReducer,
  myBookings:myBookingsReducer
});

let initialState = {
  
  
}

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
