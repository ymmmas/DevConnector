import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addEducation } from '../../actions/profile';
import { Link, useNavigate } from 'react-router-dom';

const AddEducation = ({ addEducation }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    school: '',
    degree: '',
    fieldofstudy: '',
    from: '',
    to: '',
    current: false,
    description: '',
  });

  const { school, degree, fieldofstudy, from, to, current, description } =
    formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Fragment>
      <section className='container'>
        <h1 className='large text-primary'>Add Your Education</h1>
        <p className='lead'>
          <i className='fas fa-code-branch'></i> Add any school or bootcamp that you have attended
        </p>
        <small>* = required field</small>
        <form
          className='form'
          onSubmit={(e) => {
            e.preventDefault();
            addEducation(formData, navigate);
          }}
        >
          <div className='form-group'>
            <input
              type='text'
              placeholder='* School or Bootcamp'
              name='school'
              required
              vale={school}
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              placeholder='* Degree or Certificate'
              name='degree'
              required
              vale={degree}
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              placeholder='Field of Study'
              name='fieldofstudy'
              vale={fieldofstudy}
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
              Current School
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
              placeholder='Program Description'
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

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
};

export default connect(null, { addEducation })(AddEducation);
