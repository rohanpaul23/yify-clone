import React from 'react'
import InputValues from "./InputValues"
import produce from "immer"
import { useState } from "react";
import SearchIcon from '@mui/icons-material/Search';

function SearchBar ({
  tags,
  onTagsUpdate,
  tagPrecheck
}) {
  
  const [focused, setFocused] = useState(false)

  const inputText = focused || (tags !== undefined && tags.length !== 0) ? "" : "Search Here"

  const clear = () => {
    onTagsUpdate([])
  }


  const keyPress= e => {
    if (e.key === "Escape") {
      e.stopPropagation()
      clear()
    } else if (e.key === "Backspace") {
      if ((e.target).value === "") {
        if (tags[tags.length - 1] !== undefined) {
          ;(e.target).value = tags[tags.length - 1]
          removeTags(tags.length - 1)
        }
      }
    }
  }


  const convertStringToTags = (string) => {
    let parts = string.split(";")
    parts = parts.filter(function (tag) {
      if (tag === "") {
        return false
      }

      return true
    })
    onTagsUpdate([...tags, ...parts])
  }


  const addTagsByKeyboard =
    event => {
      if (
        event.key === "Enter" &&
        (event.target).value !== ""
      ) {
        if (tags.includes((event.target).value)) return
        if (
          tagPrecheck !== undefined &&
          tagPrecheck((event.target).value, tags) === false
        )
          return

        if ((event.target).value.indexOf(";")) {
          if ((event.target).value.split(";").length > 0) {
            convertStringToTags((event.target).value)
          }
        } else {
          onTagsUpdate(
            produce(tags, draft => {
              draft.push((event.target).value)
            })
          )
        }

        ;(event.target).value = ""
      }
    }

  const removeTags = (index) => {
    const newTags = [...tags]
    newTags.splice(index, 1)
    onTagsUpdate(newTags)
  }



  return (
    <div 
    style={{
      display: "flex",
      width: "70%",
      height : 35, 
    }}
    > 
         <ul
          style={{
            display: "flex",
            alignSelf: "center !important",
            flexFlow: "row wrap",
            borderRadius: 4,
            width: "100%",
            background: "blanchedalmond",
            position: "relative",
            bottom: 17,
            height: 35,
          }}
        >
        
         {tags !== undefined && tags.length !==0 && tags.map((tag, index) => (
            <InputValues
              key={index}
              value={tag}
              index={index}
              deleteClickHandler={removeTags}
            />
          ))}

          <li
            style={{
              flexGrow: 1,
              display: "flex",
              position: "relative",
              right: 40,
              width: "100%",
            }}
          >
           <input
              style={{
                borderRadius: 4,
                textIndent: 7,
                border: "none",
                width: "100%",     
                background: "none",
                "&:focus": {
                  outline: `none !important`,
                },
              }}
              type="text"
              onKeyUp={event => addTagsByKeyboard(event)}
              onKeyDown={keyPress}
              autoComplete="off"
              placeholder={inputText}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
            />
          </li>
        </ul>
      </div> 
  )
}

export default SearchBar
