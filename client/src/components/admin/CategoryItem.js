import React from "react";

function CategoryItem({ item, i, handleClick }) {
  return (
    <tr>
      <td>{i + 1}</td>
      <td>{item}</td>
      <td>
        <button
          onClick={() => handleClick(item)}
          className="del-btn input-border cat--item"
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

export default CategoryItem;
