import IsUserRegistering from "../../../interfaces/states/ToRegister";
import { TO_REGISTER } from "../../actions/action.types";

const isRegistering = (state = false, action: IsUserRegistering) => {
  const { type, payload } = action;
  if (type === TO_REGISTER) return payload;
  return state;
};

export default isRegistering;
