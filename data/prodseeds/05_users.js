exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(() => knex('users').insert([
      // 1
      {username: 'henry', password: '$2b$10$bJbwX1VNjEqH5KTRtGMbz.xfs7gTxP47Lvss6L8TmkwXZbN/z6U7.'},
      // 2
      {username: 'blevins', password:  '$2b$10$bJbwX1VNjEqH5KTRtGMbz.xfs7gTxP47Lvss6L8TmkwXZbN/z6U7.'},
      // 3
      {username: 'IamReal', password: '$2b$10$bJbwX1VNjEqH5KTRtGMbz.xfs7gTxP47Lvss6L8TmkwXZbN/z6U7.'},
      // 4
      {username: 'CoolGuy123', password:  '$2b$10$bJbwX1VNjEqH5KTRtGMbz.xfs7gTxP47Lvss6L8TmkwXZbN/z6U7.'},
      // 5
      {username: 'Shadow366', password:  '$2b$10$bJbwX1VNjEqH5KTRtGMbz.xfs7gTxP47Lvss6L8TmkwXZbN/z6U7.'},
      // 6
      {username: 'bookr-lovr', password:  '$2b$10$bJbwX1VNjEqH5KTRtGMbz.xfs7gTxP47Lvss6L8TmkwXZbN/z6U7.'},
    ]));
};
