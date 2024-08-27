import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import {Formik} from 'formik';
import * as yup from 'yup';
import EditQuizModal from "../components/EditQuizModal/EditQuizModal";

const mockCloseModal = jest.fn();
const mockHandleSubmit = jest.fn();

const formikProps = {
  values: {
    name: 'Sample Quiz',
    description: 'This is a sample quiz',
    frequency_days: 7,
    questions: [
      {
        question_text: 'Sample question 1?',
        correct_answer: ['Option 1'],
        answer_options: ['Option 1', 'Option 2'],
      },
    ],
  },
  touched: {},
  errors: {},
  handleChange: jest.fn(),
  handleBlur: jest.fn(),
  handleSubmit: mockHandleSubmit,
  setFieldValue: jest.fn(),
};

const validationSchema = yup.object({
  name: yup.string().required('Name is required'),
  description: yup.string().required('Description is required'),
  frequency_days: yup.number().required('Frequency is required'),
  questions: yup.array().of(
    yup.object().shape({
      question_text: yup.string().required('Question text is required'),
      correct_answer: yup.array().of(yup.string()).required('At least one correct answer is required'),
      answer_options: yup.array().of(yup.string().required('Answer option is required')).min(2, 'At least two options are required'),
    })
  ),
});

const renderComponent = (openModal: boolean) => {
  return render(
    <Formik
      initialValues={formikProps.values}
      validationSchema={validationSchema}
      onSubmit={mockHandleSubmit}
    >
      {(formik) => (
        <EditQuizModal
          openModal={openModal}
          closeModal={mockCloseModal}
          style_close="close-style"
          color_off="primary"
          style_title="title-style"
          formikEditQuiz={formik}
          title="Edit Quiz"
          title_name="Quiz Name"
          title_description="Quiz Description"
          title_frequency_days="Frequency (days)"
          title_questions="Questions"
          title_answer_options="Answer Options"
        />
      )}
    </Formik>
  );
};

describe('EditQuizModal', () => {
  it('renders the modal with form elements', () => {
    renderComponent(true);

    expect(screen.getByText(/edit quiz/i)).toBeInTheDocument();
  });

  it('calls closeModal when the close icon is clicked', () => {
    renderComponent(true);

    fireEvent.click(screen.getByTestId('HighlightOffIcon'));
    expect(mockCloseModal).toHaveBeenCalled();
  });


  it('does not render the modal when openModal is false', () => {
    renderComponent(false);

    expect(screen.queryByText(/edit quiz/i)).not.toBeInTheDocument();
  });
});
