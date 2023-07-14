import { useEffect, useState } from "react";
import classes from "@common/styles/Dropdown.module.css";
import classNames from "classnames";
import { ArrowUp } from "./icons/ArrowUp";
import { ArrowDown } from "./icons/ArrowDown";

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
  const disabled = isDisabled || isLoading;
  const [selectedOption, setSelectedOption] = useState<Option | undefined>();

  const onSelect = (option: Option) => {
    setSelectedOption(option);
    onChange(option);
  };

  const setInitialOption = () => {
    let initialOption = options.find((option) => option.selected);

    if (!initialOption && preselect) initialOption = options[0];

    if (initialOption && initialOption?.value !== selectedOption?.value) {
      onSelect(initialOption);
    }
  };

  useEffect(() => {
    setInitialOption();
  }, []);

  useEffect(() => {
    if (isLoading === false) setInitialOption();
  }, [isLoading]);

  const close = () => setShowOptions(false);

  useEffect(() => {
    window.addEventListener("click", close);

    return () => {
      window.removeEventListener("click", close);
    };
  }, []);

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
      <div data-testid="dropdown" onClick={show} className={classes.input}>
        <div className={classes.selected} data-testid="dropdown-selected">
          {isLoading ? "Loading..." : selectedOption?.name || placeHolder}
        </div>
        <div className={classes.tools}>
          <div className={classes.tool}>
            {optionsVisible ? <ArrowUp /> : <ArrowDown />}
          </div>
          {optionsVisible && (
            <div
              className={classes.menu}
              id="menu"
              data-testid="dropdown-options"
            >
              {options.map((option) => (
                <div
                  data-testid="dropdown-option"
                  role="option"
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
