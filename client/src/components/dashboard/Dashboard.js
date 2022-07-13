import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';

const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);
  //   if profile is null and its still loading, show spinner, else frag
  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <section className='container'>
        <h1 className='large text-primary'>Dashboard</h1>
        <p className='lead'>
          <i className='fas fa-user'>
            {/* check the user exists before getting the user name */}
            Welcome {user && user.name}
          </i>
        </p>
        {/* if a user has a profile -> has, if not -> has not */}
        {profile !== null ? (
          <Fragment>
            <DashboardActions />
            <Experience experience={profile.experience} />
            <Education education={profile.education} />

            <div className='my-2'>
              <button
                className='btn btn-danger'
                onClick={() => deleteAccount()}
              >
                <i className='fas fa-user-minus'>Delete My Account</i>
              </button>
            </div>
          </Fragment>
        ) : (
          <Fragment>
            <p>
              You have not yet setup a profile, please add some information.
            </p>
            <Link to='/create-profile' className='btn btn-primary my-1'>
              Create Profile
            </Link>
          </Fragment>
        )}
      </section>
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);
