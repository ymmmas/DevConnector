import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addExperience } from '../../actions/profile';
import { Link, useNavigate } from 'react-router-dom';

const AddExperience = ({ addExperience }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    company: '',
    title: '',
    location: '',
    from: '',
    to: '',
    current: false,
    description: '',
  });

  const { company, title, location, from, to, current, description } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Fragment>
      <section className='container'>
        <h1 className='large text-primary'>Add An Experience</h1>
        <p className='lead'>
          <i className='fas fa-code-branch'></i> Add any developer/programming
          positions that you have had in the past
        </p>
        <small>* = required field</small>
        <form
          className='form'
          onSubmit={(e) => {
            e.preventDefault();
            addExperience(formData, navigate);
          }}
        >
          <div className='form-group'>
            <input
              type='text'
              placeholder='* Job Title'
              name='title'
              required
              vale={title}
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              placeholder='* Company'
              name='company'
              required
              vale={company}
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              placeholder='Location'
              name='location'
              vale={location}
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <h4>From Date</h4>
            <input type='date' name='from' vale={from} onChange={onChange} />
          </div>
          <div className='form-group'>
            <p>
              <input
                type='checkbox'
                name='current'
                value=''
                checked={current}
                vale={current}
                onChange={() => {
                  setFormData({ ...formData, current: !current });
                }}
              />{' '}
              Current Job
            </p>
          </div>
          <div className='form-group'>
            <h4>To Date</h4>
            <input
              type='date'
              name='to'
              vale={to}
              onChange={onChange}
              disabled={current}
            />
          </div>
          <div className='form-group'>
            <textarea
              name='description'
              cols='30'
              rows='5'
              placeholder='Job Description'
              vale={description}
              onChange={onChange}
            ></textarea>
          </div>
          <input type='submit' className='btn btn-primary my-1' />
          <Link className='btn btn-light my-1' to='/dashboard'>
            Go Back
          </Link>
        </form>
      </section>
    </Fragment>
  );
};

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
};

export default connect(null, { addExperience })(AddExperience);
