import * as Yup from "yup";

export const validationSchemaQuiz = Yup.object({
  name: Yup.string().required('Required'),
  description: Yup.string().required('Required'),
  frequency_days: Yup.number().min(1, "must be greater than 0").required('Required'),
  questions: Yup.array().of(
    Yup.object({
      question_text: Yup.string().required('Required'),
      correct_answer: Yup.array().of(Yup.string().required('Required')),
      answer_options: Yup.array().of(Yup.string().required('Required')).min(2, 'At least two options required')
    })
  ).min(2, 'At least two questions required')
})
