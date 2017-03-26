import express from 'express';
import mongoose from 'mongoose';

var app = express();
mongoose.connect('mongodb://localhost/gem_portal');

let size_model = mongoose.model('size',{
    value: String,
    date: {
        type: Date,
        default: Date.now
    }
});

let type_model = mongoose.model('type',{
    value: String,
    date: {
        type: Date,
        default: Date.now
    }
});

let gem_stone_model = mongoose.model('gem_stone',{
    //size: size_model,
    //type: type_model,
    date: {
        type: Date,
        default: Date.now
    },
    completed: {
        type : Boolean,
        default: false
    }
});

var logError = (error) => {
    if (error)
        throw error;
}

var server = () => {
    // html and js static files are sent to the browser through the server
    app.use(express.static('client/public'))

    //find 
    app.get('/get/all_gem_stones',(request, response)=>{
        gem_stone_model.find((error, gem_stones)=>{
            logError(error);
            response.send(gem_stones);
        })
    });

    app.get('/get/all_sizes',(request, response)=>{
        size_model.find((error, sizes)=>{
            logError(error);
            response.send(sizes);
        })
    });

    app.get('/get/all_types',(request, response)=>{
        type_model.find((error, types)=>{
            logError(error);
            response.send(types);
        })
    });

    //add
    app.get('/add_type/:value',(request,response)=>{
        let {value} = request.params; //same as stone = req.par.stone
        new type_model({value}).save((error,savedType) => { // same as {value:value}
            logError(error);
            response.send(savedType);
        });
    });

    //remove
    app.get('/remove_type/:value',(request,response)=>{
        let {value} = request.params;
        type_model.remove({value},(error,removedType)=>{
            logError(error);
            response.send(removedType);
        });
    });

    //Start the server
    app.listen(3000, () => {
        console.log('App listening on port 3000!')
    })
}

export default server;
