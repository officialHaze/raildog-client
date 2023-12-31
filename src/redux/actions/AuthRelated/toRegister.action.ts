import { ToRegister } from "../../../interfaces/states/ToRegister";
import { TO_REGISTER } from "../action.types";

const isUserRegistering: ToRegister = (toRegister: boolean) => ({
  type: TO_REGISTER,
  payload: toRegister,
});

export default isUserRegistering;
