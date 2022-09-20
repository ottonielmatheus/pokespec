import React from 'react'
import Select from 'react-select'

function CustomSelect ({ className, placeholder, defaultValue, options, value, isDisabled, onChange, isMulti = false }) {
  const styles = {
    container: (styles) => ({
      ...styles,
      width: '100%',
      height: '100%',
      boxShadow: 'none'
    }),
    control: (styles, { isFocused }) => ({
      ...styles,
      backgroundColor: 'var(--primary-color)',
      height: '100%',
      borderStyle: 'solid',
      borderWidth: '1px',
      borderColor: isFocused ? 'var(--outline-color)' : 'var(--primary-color)',
      ':focus': {
        boxShadow: 'none',
        borderColor: isFocused ? 'var(--outline-color)' : 'var(--primary-color)',
      },
      ':hover': {
        borderColor: isFocused ? 'var(--outline-color)' : 'var(--primary-color)',
        boxShadow: 'none'
      }
    }),
    option: (styles, { isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        backgroundColor: isFocused
          ? 'var(--third-color)'
          : 'var(--secondary-color)',
        color: 'var(--font-color)',
        cursor: isDisabled ? 'not-allowed' : 'default',
        ':active': {
          ...styles[':active'],
          backgroundColor: !isDisabled
            ? isSelected
              ? 'var(--third-color)'
              : 'var(--third-color)'
            : undefined
        }
      }
    },
    indicatorSeparator: (styles) => {
      return {
        ...styles,
        backgroundColor: 'var(--secondary-color)'
      }
    },
    singleValue: (styles) => {
      return {
        ...styles,
        color: 'var(--font-color)'
      }
    },
    input: (styles) => {
      return {
        ...styles,
        color: 'var(--font-color)'
      }
    },
    menuList: (styles) => {
      return {
        ...styles,
        backgroundColor: 'var(--secondary-color)'
      }
    },
    multiValue: (styles) => {
      return {
        ...styles,
        backgroundColor: 'var(--secondary-color)',
      }
    },
    multiValueLabel: (styles) => ({
      ...styles,
      color: 'var(--font-color)',
      fontWeight: '600'
    }),
    multiValueRemove: (styles) => ({
      ...styles,
      ':hover': {
        backgroundColor: 'var(--secondary-color)',
        color: 'white',
        cursor: 'pointer'
      }
    })
  }

  return <Select
    placeholder={placeholder}
    className={className}
    styles={styles}
    defaultValue={defaultValue}
    options={options}
    isMulti={isMulti}
    value={value}
    isDisabled={isDisabled}
    onChange={onChange}
  />
}

export default CustomSelect