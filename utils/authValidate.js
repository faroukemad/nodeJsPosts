module.exports = function validateUser({ name, email, password }) {
    if (!name || !email || !password)
      return "Name, Email and password are required.";
  
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(email))
      return "Invalid email format.";
  
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(password))
      return "Password must be at least 8 characters and include letters and numbers.";
  
    return null; 
  };