import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import {Formik} from 'formik';
import * as yup from 'yup';
import EditCompanyModal from "../components/EditCompanyModal/EditCompanyModal";

const mockCloseModal = jest.fn();
const mockHandleSubmit = jest.fn();
const mockHandleChange = jest.fn();
const mockHandleBlur = jest.fn();

const formikProps = {
  values: {
    name: 'Test Company',
    description: 'This is a test company',
    visible: true,
  },
  touched: {
    name: false,
    description: false,
  },
  errors: {
    name: '',
    description: '',
  },
  handleChange: mockHandleChange,
  handleBlur: mockHandleBlur,
  handleSubmit: mockHandleSubmit,
};

const validationSchema = yup.object({
  name: yup.string().required('Name is required'),
  description: yup.string().required('Description is required'),
  visible: yup.boolean(),
});

const renderComponent = (openModal: boolean) => {
  return render(
    <Formik
      initialValues={formikProps.values}
      validationSchema={validationSchema}
      onSubmit={mockHandleSubmit}
    >
      {(formik) => (
        <EditCompanyModal
          openModal={openModal}
          closeModal={mockCloseModal}
          style_close="close-style"
          color_off="primary"
          style_title="title-style"
          title="Edit Company"
          formikEditCompany={formik}
          name="Company Name"
          description="Company Description"
          visible="Visibility"
          style_done={{color: 'green'}}
        />
      )}
    </Formik>
  );
};

describe('EditCompanyModal', () => {

  it('should call closeModal when the close icon is clicked', () => {
    renderComponent(true);

    const closeButton = screen.getByTestId('HighlightOffIcon');
    fireEvent.click(closeButton);

    expect(mockCloseModal).toHaveBeenCalled();
  });


  it('should not render the modal when openModal is false', () => {
    renderComponent(false);

    expect(screen.queryByText(/edit company/i)).not.toBeInTheDocument();
  });
});
