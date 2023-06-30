// import React from "react";
// import classes from "../../../../common/styles/Filters.module.css";
// import { useQueryParams } from "../hooks/useQueryParams";

// type DropdownProps = {
//   value: string;
//   options: { value: string; label: string }[];
//   onChange: (value: string) => string;
//   isLoading: boolean;
// };

// const Dropdown: React.FC<DropdownProps> = ({
//   value,
//   options,
//   onChange,
//   isLoading,
// }) => {
//   const { params, setQueryParams } = useQueryParams();

//   const onValueChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     const queryParams = { ...params };
//     delete queryParams.page;

//     const selectedValue = event.target.value;
//     setQueryParams(selectedValue);
//   };

//   return (
//     <div className={classes.filter}>
//       <select
//         onChange={onValueChange}
//         className={classes.select_btn}
//         defaultValue={value}
//         disabled={isLoading}
//         name={""}
//         id={""}
//       >
//         {
//           <option key={value} value={value}>
//             ?{value}
//           </option>
//         }
//       </select>
//     </div>
//   );
// };

// export { Dropdown };
