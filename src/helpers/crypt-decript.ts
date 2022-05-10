import CryptoJS from "crypto-js";

const Criptography = (value: string) => {
  let key = process.env.REACT_APP_CRIPT_DECRYPT_KEY?.toString();
  var cryptdata = CryptoJS.AES.encrypt(value, key ? key : "").toString();
  return cryptdata;
};

const Decriptography = (value: string) => {
  let key = process.env.REACT_APP_CRIPT_DECRYPT_KEY?.toString();
  var bytes = CryptoJS.AES.decrypt(value, key ? key : "");
  var decryptedData = bytes.toString(CryptoJS.enc.Utf8);
  return decryptedData;
};

export { Criptography, Decriptography };
