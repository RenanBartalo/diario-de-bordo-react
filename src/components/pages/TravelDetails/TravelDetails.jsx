/* eslint-disable no-console */
/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';


import TemplatePrivate from '../../templates/TemplatePrivate/TemplatePrivate';
import DayCard from '../../Card/DayCard';

import { getOneTravel, createOneDay } from '../../../services/api';
import './TravelDetails.css';

const schema = yup.object().shape({
  dia: yup.number().required('Required field').max(3, 'Minimum of 3 characters'),
  description: yup.string().required('Required field').min(15, 'Minimum of 15 characters').max(150, 'Minimum of 150 characters'),
});

const TravelDetails = ({ user }) => {
  const { travelId } = useParams();

  const [travel, setTravel] = useState({});
  const [show, setShow] = useState(false);

  const pegarUmaViagemPeloId = async () => {
    try {
      const token = localStorage.getItem('token');
      const foundTravel = await getOneTravel(travelId, token);
      setTravel(foundTravel);
    } catch (error) {
      console.log(error);
    }
  };

  const fechaModal = () => {
    setShow(false);
    // eslint-disable-next-line no-use-before-define
    handleLimpaTudo();
  };
  const abreModal = () => setShow(true);

  useEffect(() => {
    pegarUmaViagemPeloId();
  }, []);

  const {
    values, errors, touched, handleChange, handleBlur, handleSubmit, setTouched, setValues,
  } = useFormik({
    initialValues: { dia: '', description: '' },
    validationSchema: schema,
    onSubmit: async (formData) => {
      try {
        console.log(formData);
        const token = localStorage.getItem('token');
        await createOneDay(travelId, formData, token);

        await pegarUmaViagemPeloId();

        fechaModal();
      } catch (error) {
        console.log(error);
      }
    },
  });

  function handleLimpaTudo() {
    setValues({ dia: '', description: '' });
    setTouched({ dia: false, description: false });
  }

  console.log(travel)
  return (
    <TemplatePrivate user={user}>
      <section className="container-fluid details-container" style={{ backgroundImage: `url(${travel.photo})`}}>
        <div className="details-inner d-flex align-items-end">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <h1>{travel.cidade}</h1>
                <p>De {travel.dataDeIda} a {travel.dataDeVolta}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="container">
        <div className="row">
          <div className="col-12 py-4">
            <h2>Detalhes da viagem</h2>
            <p>{travel.description}</p>
          </div>
        </div>
        <div className="row">
          {travel.days && travel.days.map((day) => (
            <DayCard
              key={day._id}
              day={`Dia ${day.dia}`}
              description={day.description}
            />
          ))}
        </div>
      </section>
    </TemplatePrivate>
  );
};

export default TravelDetails;
