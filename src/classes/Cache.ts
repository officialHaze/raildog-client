import { AES } from "crypto-js";

export default class Cache {
  public static saveInLocalStorage({ key, value }: { key: string; value: string }) {
    // encrypt the value
    const encrypted = AES.encrypt(value, "mysecretaeskey").toString();
    // save the encrypted value
    localStorage.setItem(key, encrypted);
  }

  public static deleteFromLocalStorage({ key }: { key: string }) {
    localStorage.removeItem(key);
  }

  public static saveInCookie({
    cname,
    cvalue,
    expiryDays,
  }: {
    cname: string;
    cvalue: string;
    expiryDays: number;
  }) {
    const d = new Date();
    d.setTime(d.getTime() + expiryDays * 24 * 60 * 60 * 1000);

    const expiry = `expires=${d.toUTCString()}`;

    document.cookie = `${cname}=${cvalue};${expiry};path=/`;
  }

  public static getCookie({ cname }: { cname: string }) {
    const cookieStr = document.cookie;
    console.log("Cookie string: ", cookieStr);

    if (!cookieStr.includes(cname)) return null;

    const startPos = cookieStr.indexOf(cname);
    console.log("Start pos of the specified cookie: ", startPos);

    const endPos = cookieStr.length;

    const requiredCookiePortion = cookieStr.substring(startPos, endPos + 1);

    const splits = requiredCookiePortion.split("; ");

    const cookie = splits[0]; // First element will always be the required cookie
    console.log("Cookie: ", cookie);

    return cookie;
  }

  public static deleteCookie({ cname }: { cname: string }) {
    document.cookie = `${cname}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }
}
