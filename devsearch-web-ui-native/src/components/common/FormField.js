import React from "react";

function FormField(input) {
  return (
    <div className="form__field">
      <label htmlFor="formInput#text">Username: </label>
      <input
        className="input input--text"
        id="formInput#text"
        type="text"
        name="text"
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />
    </div>
  );
}

export default FormField;
