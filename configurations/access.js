const _accessList = [
    {
        roles: 'a',
        allows: [
            { resources: [
                'api/super-admin/'
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
