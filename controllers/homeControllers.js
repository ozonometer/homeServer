let helper = require('../config/helper.js');
const mariadb = require('mariadb');
const pool = mariadb.createPool({
    host: '127.0.0.1',
    user:'****',
    password: '****',
    connectionLimit: 5
});

const BAD_REQUEST = 400;
const INTERNAL_SERVER_ERROR = 500;


module.exports = function (server) {
    server.use(require('restify-plugins').queryParser());

    server.get("/getpumplog", function(req, res, next) {
        let data = {
            'message': 'Get works!'
        }
        pool.getConnection()
            .then(conn => {

                conn.query("SELECT * FROM monitoring.sumpump s ")
                    .then((rows) => {
                        helper.success(res, next, rows);
                    })
                    .then((res) => {
                        conn.end();
                    })
                    .catch(err => {
                        conn.end();
                        helper.failure(res, next, err, INTERNAL_SERVER_ERROR);
                    })

            }).catch(err => {
            helper.failure(res, next, err, INTERNAL_SERVER_ERROR);
        });
    });

    server.post("/savetolog", function(req, res, next) {
        req.params.operation = req.query.operation;
        req.params.voltage = req.query.voltage;
        req.assert('operation', 'Operation status is required').notEmpty();
        req.assert('voltage', 'Voltage is required').notEmpty();
        let errors = req.validationErrors();
        if (errors){
            helper.failure(res, next, errors, BAD_REQUEST);
        } else {
            let operation = req.query.operation;
            let voltage = req.query.voltage;
            pool.getConnection()
                .then(conn => {
                    return conn.query("INSERT INTO monitoring.sumpump (operation, batteryVoltage, timestamp) VALUES (?, ?, CURRENT_TIMESTAMP())", [operation, voltage])
                        .then((rows) => {
                        helper.success(res, next, rows);
                    })
                        .then((res) => {
                            conn.end();
                        })
                        .catch(err => {
                            conn.end();
                            helper.failure(res, next, err, INTERNAL_SERVER_ERROR);
                        })
                }).catch(err => {
                    helper.failure(res, next, err, INTERNAL_SERVER_ERROR);
            });
        }

    });
};