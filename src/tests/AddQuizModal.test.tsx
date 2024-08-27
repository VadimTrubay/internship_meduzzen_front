import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import {Formik} from 'formik';
import '@testing-library/jest-dom';
import {mockFormikValues, mockFormikErrors, mockFormikTouched} from './mocks/formikMocks';
import AddQuizModal from "../components/AddQuizModal/AddQuizModal";

const mockFormikInitialValues = {
  name: '',
  description: '',
  frequency_days: '',
  questions: [
    {
      question_text: '',
      correct_answer: [''],
      answer_options: ['', ''],
    },
  ],
};

const mockCloseModal = jest.fn();

describe('AddQuizModal', () => {
  beforeEach(() => {
    render(
      <Formik
        initialValues={mockFormikInitialValues}
        onSubmit={jest.fn()}
      >
        {(formikProps) => (
          <AddQuizModal
            openModal={true}
            closeModal={mockCloseModal}
            style_close=""
            color_off="primary"
            style_title=""
            formikAddQuiz={{
              ...formikProps,
              values: mockFormikValues,
              errors: mockFormikErrors,
              touched: mockFormikTouched
            }}
            title="Add New Quiz"
            title_name="Quiz Name"
            title_description="Quiz Description"
            title_frequency_days="Frequency (Days)"
            title_questions="Questions"
            title_answer_options="Answer Options"
          />
        )}
      </Formik>
    );
  });

  test('renders the modal with the correct title', () => {
    const titleElement = screen.getByText(/add new quiz/i);
    expect(titleElement).toBeInTheDocument();
  });

});
