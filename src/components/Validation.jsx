import { useEffect } from "react";
import { validationRules } from "../helper/validationRules";
import { ValidIcon } from "./ValidIcon";

export default function Validation({ field, label, value, onValidate }) {
  const rule = validationRules[field];
  const isValid = rule ? rule(value) : false;

  useEffect(() => {
    if(onValidate) {
      onValidate(field, isValid)
    }
  }, [value]);

  return (
    <li className="flex items-center justify-between">
      <span>
        <b>{label}:</b> {value || "N/A"}
      </span>

      <ValidIcon isValid={isValid} />
    </li>
  );
}
