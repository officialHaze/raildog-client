import { SHA256 } from "crypto-js";

export default class Hasher {
  public static hashPass(pass: string) {
    try {
      const nonce = "thisismysecretnonce";
      const hash = SHA256(pass + nonce).toString();
      return hash;
    } catch (error) {
      throw error;
    }
  }
}
