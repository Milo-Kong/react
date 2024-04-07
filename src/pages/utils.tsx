export const parseUrlHash = (hash: string) => {
    hash = hash ? hash : window.location.hash;
    let search = hash.split('?')[1];
    let retObj: any = {};
    const searchArr = search && search.split("&") || [];
    searchArr.forEach((item) => {
      const [key, value] = item.split("=");
      retObj[key] = value;
    });
    return retObj;
  };