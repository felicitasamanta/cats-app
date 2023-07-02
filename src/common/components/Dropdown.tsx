import { useEffect, useState } from "react";
import classes from "../styles/Dropdown.module.css";
import classNames from "classnames";

const IconDown = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="20"
      width="20"
      viewBox="0 0 30 30"
    >
      <path
        d="M 2.65625 6.25 L 1.34375 7.75 L 11.34375 16.75 L 12 17.34375 L 12.65625 16.75 L 22.65625 7.75 L 21.34375 6.25 L 12 14.65625 L 2.65625 6.25 z"
        fill="#000000"
      />
    </svg>
  );
};

const IconUp = () => {
  return (
    <svg
      height="20"
      width="20"
      viewBox="0 0 30 30"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 6.65625L11.34375 7.25L1.34375 16.25L2.65625 17.75L12 9.34375L21.34375 17.75L22.65625 16.25L12.65625 7.25L12 6.65625Z"
        fill="#000000"
      />
    </svg>
  );
};

export interface Option {
  name: string;
  value: string | number;
  selected?: boolean;
}

export type Options = Option[];

interface Props {
  options: Options;
  placeHolder?: string;
  preselect?: boolean;
  isDisabled?: boolean;
  isLoading?: boolean;
  onChange: (option: Option) => void;
}

const Dropdown: React.FC<Props> = ({
  options,
  placeHolder,
  preselect,
  isDisabled,
  isLoading,
  onChange,
}) => {
  const [optionsVisible, setShowOptions] = useState(false);
  const preselectedOption = options.find((option) => option.selected);
  const disabled = isDisabled || isLoading;

  const getInitialOption = () => {
    if (preselectedOption) return preselectedOption;
    if (!preselectedOption && preselect) return options[0];
  };

  const [selectedOption, setSelectedOption] = useState<Option | undefined>(
    getInitialOption()
  );

  useEffect(() => {
    if (isLoading === false) {
      const initialOption = getInitialOption();

      if (initialOption?.value !== selectedOption?.value) {
        setSelectedOption(initialOption);
      }
    }
  }, [isLoading]);

  const close = () => setShowOptions(false);

  useEffect(() => {
    window.addEventListener("click", close);

    return () => {
      window.removeEventListener("click", close);
    };
  }, []);

  const onSelect = (option: Option) => {
    setSelectedOption(option);
    onChange(option);
  };

  const show = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!disabled) setShowOptions(!optionsVisible);
  };

  if (!options.length) return null;

  return (
    <div
      className={classNames(classes.container, {
        [classes.container__disabled]: disabled,
      })}
    >
      <div onClick={show} className={classes.input}>
        <div className={classes.selected}>
          {isLoading ? "Loading..." : selectedOption?.name || placeHolder}
        </div>
        <div className={classes.tools}>
          <div className={classes.tool}>
            {optionsVisible ? <IconUp /> : <IconDown />}
          </div>
          {optionsVisible && (
            <div className={classes.menu}>
              {options.map((option) => (
                <div
                  key={option.value}
                  className={classNames(classes.dropdown_item, {
                    [classes.selected]: option.value === selectedOption?.value,
                  })}
                  onClick={() => onSelect(option)}
                >
                  {option.name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export { Dropdown };
