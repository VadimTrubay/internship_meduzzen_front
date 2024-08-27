export const mockFormikValues = {
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

export const mockFormikErrors = {
  name: '',
  description: '',
  frequency_days: '',
  questions: [
    {
      question_text: '',
      correct_answer: '',
      answer_options: '',
    },
  ],
};

export const mockFormikTouched = {
  name: false,
  description: false,
  frequency_days: false,
  questions: [
    {
      question_text: false,
      correct_answer: false,
      answer_options: [false, false],
    },
  ],
};
