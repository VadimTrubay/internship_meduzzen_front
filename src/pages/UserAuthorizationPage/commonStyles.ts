const commonStyles = {
  button: {
    backgroundColor: 'var(--brand-color-contactbook)',
    marginBottom: '20px',
    marginTop: '20px',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    color: 'white',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  buttonHover: {
    backgroundColor: 'var(--brand-color-contactbook-hover)',
  },
  buttonDisabled: {
    backgroundColor: 'var(--brand-color-contactbook-hover)',
    color: '#adb5bd',
    cursor: 'not-allowed',
  },
  span: {
    marginRight: '4px',
  },
  box: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: '8px',
    backgroundColor: 'var(--brand-color-contactbook-hover)',
    width: '50px',
    height: '50px',
    borderRadius: '50%',
  },
  boxSubmit: {
    marginTop: '1em',
    borderColor: 'red',
  },
  success: {
    backgroundColor: 'var(--brand-color-contactbook)',
    color: 'white',
    padding: '10px',
    borderRadius: '5px',
  },
};

export default commonStyles;
