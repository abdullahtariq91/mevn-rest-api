const _accessList = [
  {
    roles: 'a',
    allows: [
      {
        resources: [
          '/api/users',
          '/api/secret'
        ],
        permissions: '*'
      },
    ]
  },
  {
    roles: 'u',
    allows: [
      {
        resources: [
          '/api/users'
        ],
        permissions: '*'
      },
    ]
  }
];

module.exports = {
    _accessList
};
