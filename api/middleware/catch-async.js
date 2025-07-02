export default (handler) => {
  return (req, res, next) => {
    handler(req, res, next).catch(next);
  };
};