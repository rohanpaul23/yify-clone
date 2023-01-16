import * as React from "react"
import { css } from "emotion/macro"
import Icon from "app/components/Icon"
import { useTheme } from "app/components/ThemeProvider"
import IconButton from "app/components/IconButton"
import Hints from "app/components/FilterBar/Hints"
import { useEffect, useRef } from "react"
import TagInput from "app/components/FilterBar/TagInput"
import useResizeObserver from "use-resize-observer"
import produce from "immer"
type Props = {
  value: Array<string>
  tags: Array<string>
  onUpdate: (value: Array<string>) => unknown
  className?: string
  expandable?: boolean
  hints?: Array<{
    label: string
    tags?: Array<string>
  }>
  placeholder?: string
  hintsPlaceholder?: string
  onTagsUpdate: (arg0: Array<string>) => void
  tagPrecheck?: (tag: string, tags: Array<string>) => boolean
  showFilterOptions?: (value: boolean) => unknown
}

const FilterBar = ({
  tags,
  onUpdate,
  expandable,
  hints,
  placeholder,
  hintsPlaceholder,
  onTagsUpdate,
  tagPrecheck,
  showFilterOptions,
}: Props) => {
  const [focused, setFocused] = React.useState(false)
  const theme = useTheme()
  const ref = useRef(null)
  const { height } = useResizeObserver({
    ref,
  })
  useEffect(() => {
    onUpdate(tags)
  }, [tags, onUpdate])
  const inputText = focused || tags.length !== 0 ? "" : placeholder

  const clear = () => {
    onTagsUpdate([])
  }

  const keyPress: React.KeyboardEventHandler<HTMLInputElement> = e => {
    if (e.key === "Escape") {
      e.stopPropagation()
      clear()
    } else if (e.key === "Backspace") {
      if ((e.target as HTMLInputElement).value === "") {
        if (tags[tags.length - 1] !== undefined) {
          ;(e.target as HTMLInputElement).value = tags[tags.length - 1]
          removeTags(tags.length - 1)
        }
      }
    }
  }

  const convertStringToTags = (string: string) => {
    let parts = string.split(";")
    parts = parts.filter(function (tag) {
      if (tag === "") {
        return false
      }

      return true
    })
    onTagsUpdate([...tags, ...parts])
  }

  const addTags = (tag: string) => {
    if (tags.includes(tag)) return
    if (tagPrecheck !== undefined && tagPrecheck(tag, tags) === false) return
    onTagsUpdate(
      produce(tags, draft => {
        draft.push(tag)
      })
    )
  }

  const addTagsByKeyboard: React.KeyboardEventHandler<HTMLInputElement> =
    event => {
      if (
        event.key === "Enter" &&
        (event.target as HTMLInputElement).value !== ""
      ) {
        if (tags.includes((event.target as HTMLInputElement).value)) return
        if (
          tagPrecheck !== undefined &&
          tagPrecheck((event.target as HTMLInputElement).value, tags) === false
        )
          return

        if ((event.target as HTMLInputElement).value.indexOf(";")) {
          if ((event.target as HTMLInputElement).value.split(";").length > 0) {
            convertStringToTags((event.target as HTMLInputElement).value)
          }
        } else {
          onTagsUpdate(
            produce(tags, draft => {
              draft.push((event.target as HTMLInputElement).value)
            })
          )
        }

        ;(event.target as HTMLInputElement).value = ""
      }
    }

  const removeTags = (index: number) => {
    const newTags = [...tags]
    newTags.splice(index, 1)
    onTagsUpdate(newTags)
  }

  return (
    <div
      ref={ref}
      className={css({
        display: "flex",
        minHeight: 28,
        width: `100%`,
      })}
    >
      <div
        className={css({
          border: `1px solid ${theme.selectColorDisabled}`,
          display: "flex",
          borderRadius: 4,
          flex: 1,
          flexFlow: `row wrap`,
          position: `relative`,
          paddingRight: 24,
          minHeight: 28,
        })}
      >
        <ul
          className={css({
            display: `flex`,
            alignSelf: `center !important`,
            flexFlow: `row wrap`,
            borderRadius: 4,
            width: `100%`,
            marginLeft: 5,
          })}
        >
          {showFilterOptions ? (
            <IconButton
              className={css({
                position: "relative",
                left: 3,
              })}
              icon={"filter"}
              color={theme.baseBrandColor}
              onClick={() => {
                showFilterOptions && showFilterOptions(true)
              }}
            />
          ) : (
            tags.length === 0 && (
              <Icon
                name="search"
                className={css({
                  color: `${theme.baseIconColor}`,
                  marginLeft: 5,
                })}
              />
            )
          )}

          {tags.map((tag, index) => (
            <TagInput
              key={index}
              value={tag}
              index={index}
              deleteClickHandler={removeTags}
            />
          ))}
          <li
            className={css({
              flexGrow: 1,
              display: `flex`,
            })}
          >
            <input
              className={css({
                borderRadius: 4,
                textIndent: 7,
                border: `none`,
                width: `100%`,
                color: `${theme.baseColor}`,
                background: `none`,
                "&:focus": {
                  outline: `none !important`,
                },
              })}
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
        {tags.length !== 0 && (
          <IconButton
            size="small"
            className={css(css`
              padding: 8px 10px !important;
              position: absolute;
              right: 0;
              top: 0;
            `)}
            icon="close"
            onClick={() => {
              clear()
            }}
          />
        )}
        {focused && expandable !== undefined && hints !== undefined && (
          <Hints
            placeholder={hintsPlaceholder}
            hints={hints}
            onClickHandler={addTags}
            // @ts-expect-error - height can be undefined
            height={height}
          />
        )}
      </div>
    </div>
  )
}

export default FilterBar

