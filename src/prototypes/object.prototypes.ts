Object.isEmpty = function (object) {
  return Object.keys(object).length === 0;
};

Object.isNotEmpty = function (object) {
  return Object.keys(object).length !== 0;
};
