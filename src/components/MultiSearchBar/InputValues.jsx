import * as React from "react"


const InputValues = ({ value, index, removeTag }) => {
  return (
    <li
      key={index}
      style={{
        fontSize: 12,
        height: 22,
        borderRadius: 3,
        background: "grey",
        justifyItems: "center",
        display: "flex",
        margin: `2px 0px 2px 4px`,
      }}
    >
      <span
        style={{
          color: "blue",
          alignSelf: "center",
          display: "flex",
          padding: "3px 10px 3px 10px !important",
        }}
      >
        {value}
      </span>
      {removeTag !== undefined && (
        <button
          style={{
            paddingLeft: `0px !important`,
          }}
          onClick={
            removeTag !== undefined && index !== undefined
              ? () => removeTag(index)
              : undefined
          }
        >
        </button>
      )}
    </li>
  )
}

export default InputValues
