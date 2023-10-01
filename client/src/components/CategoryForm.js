import React from "react";

const CategoryForm = ({ handleSubmit, value, setValue }) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="FormControlInput1" className="form-label">
            New category
          </label>
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="form-control"
            id="FormControlInput1"
            placeholder="new category"
          />
        </div>
        <button type="submit" className="btn btn-dark">
          ADD
        </button>
      </form>
    </div>
  );
};

export default CategoryForm;
