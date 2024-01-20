export default function LiveStatus403ResponseCol() {
  return (
    <tr>
      <td className="py-2 px-4 white-border-all">403</td>
      <td className="w-[70%] py-2 px-4 white-border-all">
        Bad response. This response is received when the server encounters a captcha verification
        while scrapping for information. It triggers an authentication. You must call the 'Bypass
        Captcha API' to get a new 'phpsessid'.
      </td>
    </tr>
  );
}
