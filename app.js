let express = require('express'),
    path = require('path'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    cors = require('cors'),
    cookieParser = require('cookie-parser'),
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
        acl.allow(require('./configurations/access')._accessList);
        global.ACL = acl;
        require("fs").readdirSync(path.join(__dirname, "/src/database/models")).forEach(function(file) {
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

app.use(cors())

// const index = require('./src/routes/index');
const { apiRoutes } = require('./src/routes/index')
const { webROutes } = require('./src/routes/index')

// Use native ES6 Promises since mongoose's are deprecated.
mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGO_URI, { useMongoClient: true })
mongoose.connection.on('error', error => { throw error })


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', apiRoutes);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
});

module.exports = app;

console.log("App running on localhost:" + process.env.PORT)
