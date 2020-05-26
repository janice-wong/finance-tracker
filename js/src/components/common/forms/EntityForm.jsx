import React from 'react';
import { Form, Formik } from 'formik';
import { DatePickerField } from './DatePickerField';
import { LabeledField } from './LabeledField';

export const EntityForm = ({
  entityName,
  entity,
  getInitialValues,
  isCreateMode,
  options,
  doExtraModifications,
  doSubmit,
  doFinalState
}) => {
  const initialValues = getInitialValues === undefined
    ? entity
    : getInitialValues(entity);

  return (
    <div className='entity-form'>
      <h2>
        {isCreateMode ? 'Create' : 'Edit'} {entityName}
      </h2>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          if (isCreateMode) {
            delete values.uuid;
          }

          if (doExtraModifications !== undefined) {
            doExtraModifications(values);
          }

          doSubmit(values);
          setSubmitting(false);
          resetForm();

          if (doFinalState !== undefined) {
            doFinalState();
          }
        }}
      >
        <Form>
          {entity.hasOwnProperty('name') && <LabeledField name='name' fieldType='text'/>}
          {entity.hasOwnProperty('category') && <LabeledField name='category' options={options}/>}
          {entity.hasOwnProperty('account') && <LabeledField name='account' options={options}/>}
          {entity.hasOwnProperty('description') && <LabeledField name='description' fieldType='text'/>}
          {entity.hasOwnProperty('tickerSymbol') && <LabeledField name='tickerSymbol' fieldType='text'/>}
          {entity.hasOwnProperty('date') && <DatePickerField name='date'/>}
          {entity.hasOwnProperty('amount') && <LabeledField name='amount' fieldType='number'/>}
          {entity.hasOwnProperty('sharePrice') && <LabeledField name='sharePrice' fieldType='number'/>}
          <button type='submit'>
            {isCreateMode ? 'Create' : 'Update'}
          </button>
        </Form>
      </Formik>
    </div>
  );
};
