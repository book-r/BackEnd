module.exports = roles => (req, res, next) => {
  if (req.token.roles) {
    if (req.token.roles.find(role => roles.includes(role))) {
      next();
    } else {
      res.status(403).json({message: 'User does not have sufficient privilege to perform this action.'});
    }
  } else {
    res.status(403).json({message: 'User does not have sufficient privilege to perform this action.'});
  }
};
