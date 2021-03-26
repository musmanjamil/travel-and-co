import React, { Fragment, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from "react-alert";
import MetaData from '../layout/MetaData';

import { forgotPassword, clearErrors } from '../../actions/userActions'

const ForgotPassword = () => {
    const alert = useAlert();

    const [email, setEmail] = useState('');

    const dispatch = useDispatch();

    const { error, message } = useSelector(state => state.forgotPassword);

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (message) {
            alert.success(message);
        }

    }, [dispatch, alert, error, message])

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('email', email)

        dispatch(forgotPassword(formData))
    }

    return (
        <Fragment>
            <MetaData title={'Forgot Password'} />

            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler}>
                        <h1 className="mb-3">Forgot Password</h1>
                        <div className="form-group">
                            <label htmlFor="email_field">Enter Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <button
                            id="forgot_password_button"
                            type="submit"
                            className="btn btn-block py-3">
                            Send Email
                    </button>

                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default ForgotPassword
