const pick = (object, keys) => {
  schema = {};
  keys.forEach((key) => {
    if (object && Object.prototype.hasOwnProperty.call(object, key)) {
      schema[key] = object[key];
    }
  });
  return schema;
};
module.exports = pick;
