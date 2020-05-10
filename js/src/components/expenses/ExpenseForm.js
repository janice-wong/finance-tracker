import React from 'react';
import { Formik, Field, Form } from 'formik';
import api from "../common/api";

class ExpenseForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expenseCategories: []
    };
  }

  componentDidMount() {
    api.getExpenseCategories()
      .then(response => response.data)
      .then(data => this.setState({ expenseCategories: data }))
  }

  render() {
    const e = this.props.expense;

    return (
      <div>
        <h2>
          {this.props.isEditMode ? "Edit" : "Create"} Expense
        </h2>
        <Formik
          initialValues={{
            uuid: e ? e.uuid : '',
            name: e ? e.name : '',
            category: e ? e.category.uuid : '',
            description: e ? e.description : '',
            date: e ? e.date : '',
            amount: e ? e.amount : 0
          }}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            if (!this.props.isEditMode) {
              delete values.uuid;
            }

            var acUuid = values.category;
            values.category = {
              uuid: acUuid
            };

            this.props.doSubmit(values);
            setSubmitting(false);
            resetForm();
          }}
        >
          <Form>
            <label htmlFor="name">Name</label>
            <Field name="name" type="text" />
            <label htmlFor="category">Category</label>
            <Field name="category" as="select">
              <option defaultValue="">Select Category</option>
              {this.state.expenseCategories.map(expenseCategory => (
                <option
                  key={expenseCategory.uuid}
                  value={expenseCategory.uuid}
                >
                  {expenseCategory.name}
                </option>
              ))}
            </Field>
            <label htmlFor="description">Description</label>
            <Field name="description" type="text" />
            <label htmlFor="date">Date</label>
            <Field name="date" type="text" />
            <label htmlFor="amount">Amount</label>
            <Field name="amount" type="number" />
            <button type="submit">
              {this.props.isEditMode ? "Update" : "Create"}
            </button>
          </Form>
        </Formik>
      </div>
    );
  }
}

export default ExpenseForm;