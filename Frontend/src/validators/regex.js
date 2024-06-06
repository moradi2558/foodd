const testEmail = (value) => {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/g;
  return emailPattern.test(value);
};

const testPassword = (value) => {
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/g;
    return passwordPattern.test(value);
  };

export {testEmail,testPassword}