exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(() => knex('users').insert([
      {username: 'henry', password: '$2b$10$bJbwX1VNjEqH5KTRtGMbz.xfs7gTxP47Lvss6L8TmkwXZbN/z6U7.'},
      {username: 'blevins', password:  '$2b$10$bJbwX1VNjEqH5KTRtGMbz.xfs7gTxP47Lvss6L8TmkwXZbN/z6U7.'},
      {username: 'IamReal', password: '$2b$10$bJbwX1VNjEqH5KTRtGMbz.xfs7gTxP47Lvss6L8TmkwXZbN/z6U7.'},
      {username: 'CoolGuy123', password:  '$2b$10$bJbwX1VNjEqH5KTRtGMbz.xfs7gTxP47Lvss6L8TmkwXZbN/z6U7.'},
      {username: 'Shadow366', password:  '$2b$10$bJbwX1VNjEqH5KTRtGMbz.xfs7gTxP47Lvss6L8TmkwXZbN/z6U7.'},
      {username: 'bookr-lovr', password:  '$2b$10$bJbwX1VNjEqH5KTRtGMbz.xfs7gTxP47Lvss6L8TmkwXZbN/z6U7.'},
    ]));
};
