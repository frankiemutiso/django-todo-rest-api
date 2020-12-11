import React from "react";
import "./Form.css";

const Form = ({ activeItem, handleChange, handleSubmit }) => {
  return (
    <div className="form">
      <form action="" onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          type="text"
          placeholder="Create a new task..."
          name="title"
          value={activeItem.title}
        />

        <button type="submit">Create task</button>
      </form>
    </div>
  );
};

export default Form;
