import React from 'react';
import { Form } from 'react-bootstrap';
import { DarklyReactSelect } from '../common/DarklyReactSelect';
import {
  getOptionsArrayFromKey,
  titleCase
} from '../../common/helpers';

export const LabeledCategoryFilter = ({
  filterCategory,
  options,
  setFilterCategory
}) => {
  const displayName = titleCase(filterCategory.name);
  const opts = getOptionsArrayFromKey(options, filterCategory.name)
    .map(o => {
      return {
        value: o[filterCategory.optionValue],
        label: o[filterCategory.optionDisplay]
      }
    });

  return (
    <>
      <Form.Label>{displayName}</Form.Label>
      <DarklyReactSelect
        isMulti
        placeholder={`Filter by ${displayName}...`}
        options={opts}
        value={filterCategory.value}
        onChange={value => setFilterCategory(filterCategory.name, value)}
      />
    </>
  );
};
