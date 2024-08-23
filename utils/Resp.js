const Resp = (res, type, message, data) => {
  if (type == "ERROR") {
    res.status(400).send({ message, data, type });
    return;
  }

  res.status(200).send({ message, data, type });
  return;
};

module.exports = {
  Resp,
};
