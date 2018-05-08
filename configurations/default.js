module.exports = {
  database: {
    development : 'mongodb://127.0.0.1:27017/mevn-db',
    production  : ''
  },
  role: [
    {
      name: 'Admin',
      code: 'a'
    },
    {
      name: 'User',
      code: 'u'
    }
  ]
};
