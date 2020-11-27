// eslint-disable-next-line no-unused-vars
export const setCookie = (cname, cvalue, extimestamp) => {
  // const d = new Date(extimestamp);
  // const expires = `expires=${d.toUTCString()}`;
  document.cookie = `${cname}=${cvalue};path=/`;
};

export const getCookie = cname => {
  const name = `${cname}=`;
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
};

export const deleteCookie = cname => {
  document.cookie = `${cname}=; expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/`;
};
