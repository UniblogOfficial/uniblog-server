export const url2obj = (url: string) => {
  const pattern =
    /^(?:([^:\/?#\s]+):\/{2})?(?:([^@\/?#\s]+)@)?([^\/?#\s]+)?(?:\/([^?#\s]*))?(?:[?]([^#\s]+))?\S*$/;
  const matches = url.match(pattern);
  const params = {};
  if (matches[5] != undefined) {
    matches[5].split('&').map(function (x) {
      const a = x.split('=');
      params[a[0]] = a[1];
    });
  }

  return {
    protocol: matches[1],
    user: matches[2] != undefined ? matches[2].split(':')[0] : undefined,
    password: matches[2] != undefined ? matches[2].split(':')[1] : undefined,
    host: matches[3],
    hostname: matches[3] != undefined ? matches[3].split(/:(?=\d+$)/)[0] : undefined,
    port: matches[3] != undefined ? matches[3].split(/:(?=\d+$)/)[1] : undefined,
    segments: matches[4] != undefined ? matches[4].split('/') : undefined,
    params: params,
  };
};
