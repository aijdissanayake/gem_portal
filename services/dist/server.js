'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
_mongoose2.default.Promise = global.Promise;
_mongoose2.default.connect('mongodb://localhost/gem_portal');

var size_model = _mongoose2.default.model('size', {
    value: String,
    date: {
        type: Date,
        default: Date.now
    }
});

var type_model = _mongoose2.default.model('type', {
    value: String,
    date: {
        type: Date,
        default: Date.now
    }
});

var gem_stone_model = _mongoose2.default.model('gem_stone', {
    //size: size_model,
    //type: type_model,
    date: {
        type: Date,
        default: Date.now
    },
    completed: {
        type: Boolean,
        default: false
    }
});

var logError = function logError(error) {
    if (error) throw error;
};

var server = function server() {
    // html and js static files are sent to the browser through the server
    app.use(_express2.default.static('client/public'));

    //find 
    app.get('/get/all_gem_stones', function (request, response) {
        gem_stone_model.find(function (error, gem_stones) {
            logError(error);
            response.send(gem_stones);
        });
    });

    app.get('/get/all_sizes', function (request, response) {
        size_model.find(function (error, sizes) {
            logError(error);
            response.send(sizes);
        });
    });

    app.get('/get/all_types', function (request, response) {
        type_model.find(function (error, types) {
            logError(error);
            response.send(types);
        });
    });

    //add
    app.get('/add_type/:value', function (request, response) {
        var value = request.params.value; //same as stone = req.par.stone

        new type_model({ value: value }).save(function (error, savedType) {
            // same as {value:value}
            logError(error);
            response.send(savedType);
        });
    });

    //remove
    app.get('/remove_type/:value', function (request, response) {
        var value = request.params.value;

        type_model.remove({ value: value }, function (error, removedType) {
            logError(error);
            response.send(removedType);
        });
    });

    //update
    app.get('/update_type/:value/:new_value', function (request, response) {
        var _request$params = request.params,
            value = _request$params.value,
            new_value = _request$params.new_value;

        type_model.findOneAndUpdate({ value: value }, { value: new_value }, { new: true }, function (error, updatedType) {
            logError(error);
            response.send(updatedType);
        });
    });

    //Start the server
    app.listen(3000, function () {
        console.log('App listening on port 3000!');
    });
};

exports.default = server;