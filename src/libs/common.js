const routing = (type, fileName) => {
  return require('path').join(ROOTURL, '/' + type + '/', fileName);
};

const paging = (dataList, pageIndex) => {
  let limit = 20,
    startIndex = pageIndex * limit,
    endIndex = Math.min(startIndex + limit - 1, dataList.length - 1);
  return dataList.slice(startIndex, endIndex + 1);
};

const random = () => {
  return '4xyxxxxyxxxx3xxxyxx8xxxxxyxxxxxuxxxyxxxx'.replace(/[xy]/g, (c) =>  {
    let r = Math.random() * 16 | 0,
      v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

const logging = (funcDir, funcName, funcMessage) => {
  return " -- Directory : " + funcDir +  " -- Name : " + funcName + " -- Message : " + funcMessage;
};

const success = (res, data, message) => {
  return res.status(200).send({
    status : 200,
    message : message || "Successfully",
    data : data
  });
};

const fail = (res, message) => {
  return res.status(200).send({
    status : 400,
    message : message || "Failed"
  });
};

module.exports = {
  routing,
  paging,
  random,
  logging,
  success,
  fail
};
