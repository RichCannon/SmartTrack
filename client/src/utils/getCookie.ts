export const getCookie = (name: string, cookie: string) => {
   const nameEQ = name + "=";
   const ca = cookie.split(';');
   for (var i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
   }
   return null;
}