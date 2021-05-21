import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import MetaData from '../layout/MetaData';

const Profile = () => {

    const { user, loading } = useSelector(state => state.auth)

    return (
        <Fragment>
            {!loading && (
                <Fragment>
                    <MetaData title={'Your Profile'} />

                    <h2 className="mt-5 ml-5">My Profile</h2>
                    <div className="row justify-content-around mt-5 user-info">
                        <div className="col-12 col-md-3">
                            <figure className='avatar avatar-profile'>
                                <img className="rounded-circle img-fluid" src={user.avatar.url} alt={user && user.name} />
                            </figure>
                            <Link to="/me/update" id="edit_profile" className="btn btn-p btn-block my-5">
                                Edit Profile
                            </Link>
                        </div>

                        <div className="col-12 col-md-5">
                            <h4>Full Name</h4>
                            <p>{user && user.name}</p>

                            <h4>Email Address</h4>
                            <p>{user && user.email}</p>

                            <h4>Joined On</h4>
                            <p>{user && String(user.createdAt).substring(0, 10)}</p>

                            {user && user.role !== 'admin' && (
                                <Link to="/booking/me" className="btn btn-danger btn-block mt-5">
                                    My Bookings
                                </Link>
                            )}

                            <Link to="/password/update" className="btn btn-p btn-block mt-3">
                                Change Password
                            </Link>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    )
}

export default Profile
