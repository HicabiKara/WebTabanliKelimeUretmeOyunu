import { useState, useEffect } from "react";

const useValidation = (value, regex) => {
  const [isValid, setIsValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (value === "") {
      setIsValid(true);
      setErrorMessage("");
    } else if (!regex.test(value)) {
      setIsValid(false);
      setErrorMessage("Kullanıcı adı uygun değil.");
    } else {
      setIsValid(true);
      setErrorMessage("");
    }
  }, [value, regex]);

  return { isValid, errorMessage };
};

export default useValidation;