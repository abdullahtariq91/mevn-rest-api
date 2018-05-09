const _accessList = [
  {
    roles: 'a',
    allows: [
      {
        resources: [
            '/api/users'
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
          '/api/stuff'
        ], permissions: '*'
      },
    ]
  }
];

module.exports = {
    _accessList
};
