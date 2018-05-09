const _accessList = [
    {
        roles: 'a',
        allows: [
            { resources: [
                '/api/users'
            ], permissions: '*' },
        ]
    },
    {
        roles: 'u',
        allows: []
    }
];

module.exports = {
    _accessList
};
