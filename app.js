let express = require('express'),
    path = require('path'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    cors = require('cors'),
    acl = require('acl');

// Initialize the server
global.ROOTURL = path.resolve(__dirname);
const app = express();

// Initialize the mongoose db
mongoose.Promise = require('bluebird');
mongoose.connect(require('./configurations/default').database.development, {useMongoClient: true, autoReconnect: true, reconnectInterval: 5000, reconnectTries: 60}, (err) => {
    if(err) throw err;
    else {
        acl = new acl(new acl.mongodbBackend(mongoose.connection.db, 'acl_'));
        acl.allow(require('./permission/Access')._accessList);
        global.ACL = acl;
        require("fs").readdirSync(path.join(__dirname, "models")).forEach(function(file) {
            if(file === 'Role.js'){
                mongoose.connection.db.listCollections({name: 'roles'}).next((err, collectionInfo) => {
                    if(!collectionInfo){
                        createRoles().then(() => {
                            console.log('Successfully connect database' );
                        }).catch((err) => { throw err; })
                    } else {
                        upsertRoles().then(() => {
                            console.log('Successfully connect database' );
                        }).catch((err) => { throw err; })
                    }
                });
            }
        });
    }
});

const createRoles = () => {
    return new Promise ((resolve, reject) => {
        require('async').forEachSeries(require('./configurations/default').role, (eachRole, callback) => {
            mongoose.connection.db.collection('roles').insert({
                name: eachRole.name,
                code: eachRole.code
            }).then(() =>{
                callback();
            }).catch((err) => {
                return reject(err);
            });
        }, () => {
            return resolve(true);
        });
    });
};

const upsertRoles = () => {
    return new Promise((resolve, reject) => {
        require('async').forEachSeries(require('./configurations/default').role, (eachRole, callback) => {
            require('./models/Role.js').findOneAndUpdate(
                {name: eachRole.name}, {name: eachRole.name, code: eachRole.code}, {upsert: true},
                (err) => {
                    if(err) return reject(err);
                    else callback();
                });
        }, () => {
            return resolve(true);
        });
    });
};

app.use(logger('dev'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false, parameterLimit: 1000000 }));
app.use(cors());

require('./routes/index')(app);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500).send({
        message : err.message || "Failed"
    });
  });
}

// production error handler
// no stack-traces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500).send({
        message : err.message || "Failed"
    });
});


module.exports = app;

