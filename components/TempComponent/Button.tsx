import React from 'react';
import rightIcon from './right.svg';
import icon from './landing-icon.svg';
import wIcon from './state2-b.png';
import doc from './doc.svg';
import review from './code-review.svg';

export const Button = ({
  isDisable = false,
  children = '',
  click = () => {},
  width = '',
  height = '',
  className = '',
  type = 1,
  darkMode = true
}) => {
  return (
    <div
      className={`${className} button ${
        !darkMode ? 'w-button' : ``
      } select-none ${isDisable ? ` pointer-events-none opacity-50` : ``}`}
      onClick={click}
      style={{ width: width, height: height }}
    >
      {type === 2 && (
        <img className="btn-icon" src={darkMode ? icon : wIcon} alt="" />
      )}
      {type === 3 && <img className="btn-icon" src={doc} alt="" />}
      {type === 4 && <img className="btn-icon" src={review} alt="" />}
      <p className="text">{children}</p>
      {type === 1 && <img className="right-icon" src={rightIcon} alt="" />}
      {type === 6 && ''}
      {type === 5 && (
        <svg
          className="animate-spin ml-[20px] h-[30px] w-[30px] text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
    </div>
  );
};
