var mongo = require('mongodb').MongoClient;
var express = require('express');
var app = express();
var urlM = 'mongodb://jd:admin@ds145295.mlab.com:45295/voting-polls';

app.set('view engine', 'pug')


mongo.connect(urlM, function(err, db){
    if (err) console.log('Cannot connect');
    
    db.collection('attempt').find({}, {title:1}).toArray(function(err, docs){
        if (err) throw err;
        app.get('/', function(req, res){
            
            var values = [];
            
            docs.forEach(function(val){
                values.push(val.title);
            })
            
            res.render('index', {title: 'VotingApp', message: 'Sign in to create a poll for you and your friends!', message1: 'Or select a poll below to see the results and vote.', values: values})
            
            function display(){
                console.log('hi!!!')
            }
    
})

    })
    
})


app.listen(process.env.PORT);