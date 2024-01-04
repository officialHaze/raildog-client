import { SHA256 } from "crypto-js";

export default class Hasher {
  public static hashPass(pass: string) {
    try {
      const nonce = process.env.REACT_APP_HASH_NONCE;
      if (!nonce) throw new Error("No nonce value found in env!");

      const hash = SHA256(pass + nonce).toString();
      return hash;
    } catch (error) {
      throw error;
    }
  }
}
