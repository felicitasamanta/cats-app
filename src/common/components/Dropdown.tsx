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

interface Option {
  name: string;
  value: string | number;
  selected?: boolean;
}

export type Options = Option[];

interface Props {
  options: Options;
  placeHolder?: string;
}

const Dropdown: React.FC<Props> = ({ options, placeHolder }) => {
  const [optionsVisible, setShowOptions] = useState(false);
  const initialOption = options.find((option) => option.selected);
  const [selectedOption, setSelectedOption] = useState<Option | undefined>(
    initialOption
  );

  const close = () => setShowOptions(false);

  useEffect(() => {
    window.addEventListener("click", close);

    return () => {
      window.removeEventListener("click", close);
    };
  }, []);

  const onChange = (option: Option) => setSelectedOption(option);

  const show = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowOptions(!optionsVisible);
  };

  return (
    <div className={classes.container}>
      <div onClick={show} className={classes.input}>
        <div className={classes.selected}>
          {selectedOption?.name || placeHolder}
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
                  onClick={() => onChange(option)}
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
