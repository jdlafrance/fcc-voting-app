var mongo = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var express = require('express');
var url = require('url');
var app = express();

app.use(express.static('public'))
app.set('view engine', 'pug')



var urlM = 'mongodb://jd:admin@ds145295.mlab.com:45295/voting-polls';

mongo.connect(urlM, function(err, db){
    if (err) console.log('Cannot connect');
    
    db.collection('attempt').find().toArray(function(err, docs){
        if (err) throw err;
        
            var ids = [];
            var values = [];
            docs.forEach(function(val){
                values.push(val.title);
                ids.push(val._id)
            })
            
        app.get('/', function(req, res){
            res.render('index.pug', {title: 'VotingApp', values: values, display: ids});
            
})
})

app.get('/5*', function(req, res){
    var str = req.url.substring(1)
     db.collection('attempt').findOne({_id:ObjectId(str)}).then(function(result){
       res.render('displayPoll.pug', {message: "Please vote if you have not already done so!",title:result.title, choices: result.choices.map(function(val){return val[0]}), votes: result.choices.map(function(val){return val[1]})})
    })
})

})
    
app.listen(process.env.PORT);