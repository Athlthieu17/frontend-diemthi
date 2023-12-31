const provinceCodes = {
  1: "Hà Nội",
  2: "TP. Hồ Chí Minh",
  3: "Hải Phòng",
  4: "Đà Nẵng",
  5: "Hà Giang",
  6: "Cao Bằng",
  7: "Lai Châu",
  8: "Lào Cai",
  9: "Tuyên Quang",
  10: "Lạng Sơn",
  11: "Bắc Kạn",
  12: "Thái Nguyên",
  13: "Yên Bái",
  14: "Sơn La",
  15: "Phú Thọ",
  16: "Vĩnh Phúc",
  17: "Quảng Ninh",
  18: "Bắc Giang",
  19: "Bắc Ninh",
  21: "Hải Dương",
  22: "Hưng Yên",
  23: "Hoà Bình",
  24: "Hà Nam",
  25: "Nam Định",
  26: "Thái Bình",
  27: "Ninh Bình",
  28: "Thanh Hoá",
  29: "Nghệ An",
  30: "Hà Tĩnh",
  31: "Quảng Bình",
  32: "Quảng Trị",
  33: "Thừa Thiên Huế",
  34: "Quảng Nam",
  35: "Quảng Ngãi",
  36: "Kon Tum",
  37: "Bình Định",
  38: "Gia Lai",
  39: "Phú Yên",
  40: "Đắk Lắk",
  41: "Khánh Hoà",
  42: "Lâm Đồng",
  43: "Bình Phước",
  44: "Bình Dương",
  45: "Ninh Thuận",
  46: "Tây Ninh",
  47: "Bình Thuận",
  48: "Đồng Nai",
  49: "Long An",
  50: "Đồng Tháp",
  51: "An Giang",
  52: "Bà Rịa-Vũng Tàu",
  53: "Tiền Giang",
  54: "Kiên Giang",
  55: "Cần Thơ",
  56: "Bến Tre",
  57: "Vĩnh Long",
  58: "Trà Vinh",
  59: "Sóc Trăng",
  60: "Bạc Liêu",
  61: "Cà Mau",
  62: "Điện Biên",
  64: "Hậu Giang",
};

function checkProvince(sbd) {
  // Make sure sbd is a string
  const sbd_string = sbd.toString();

  // Check if the length of sbd_string is less than 7, then return null
  if (sbd_string.length < 7) {
    return null;
  }

  // Pad the sbd_string with leading zeros
  const padded_sbd = sbd_string.padStart(7, "0");

  // Extract the first two characters (province code)
  const code = padded_sbd.substring(0, 2);

  return provinceCodes[parseInt(code)] || null;
}
console.log(checkProvince("29004923"));
