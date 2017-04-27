'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
    mongoose = require('mongoose'),
    Article = mongoose.model('Article'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

var _ = require('lodash'),
    fs = require('fs'),
    multer = require('multer'),
    config = require(path.resolve('./config/config')),
    User = mongoose.model('User'),
    nodemailer = require("nodemailer"),
    transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "way2closeapp@gmail.com",
            pass: "Way2Cl0$eApp"
        }
    });
/**
 * Create a article
 */



exports.create = function (req, res) {
    var finished = _.after(4, finished);
    var counter = 0;
    exports.userByEmail = function(email,firstName,lastName) {
        User.findOne({
            email: email
        }).exec(function(err, usr) {
            if (!usr || err) {
                 //create blank user and send them an email.
                var role = counter<=1 ? ['user'] : ['admin', 'user'];
                var pw = "aA@" + Date.now();
                usr = new User({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    username: email,
                    password: pw,
                    provider: 'local',
                    roles: role
                });
                usr.username = " "+ email + " ";
                usr.save(function (err) {
                    if (err) {
                        console.log("47" + err);
                    } else {
                        console.log(usr.email + "user created.");
                        var passage = "<!DOCTYPE html><html lang='en-US'><head><meta http-equiv='Content-Type' content='text/html; charset=utf-8' /></head>" +
                            "<body><h3>Hello!</h3>" +
                            "<p>An account has been created for you at Way2Close. You have been added"+
                            " to the property at " + req.body.street + ". </p>" +
                            "<p>Please sign in at way2close.herokuapp.com/settings/profile" +
                            " using this email and " + pw + " as your password, then edit your profile to reflect your information." +
                            "<h3>Regards,</h3><h4>The Way2Close Team</h4></body>" +
                            "<footer>Please do not reply to this email.</footer>" +
                            "</html>";
                        transporter.sendMail({
                            from: "way2closeapp@gmail.com",
                            to: email,
                            subject: 'New Account at Way2Close',
                            html: passage
                        }, (err, info) => {
                            if(err) {console.log("62 email " + err);}
                            else {console.log("message sent successfully to: " + email);}
                    });
                    }
                });
            } //else{//return next(new Error('Failed to load User ' + username));
            //add functionality to create new user and send them an email to get set up.
            console.log("user id:");
            console.log(usr._id);
            switch(counter) {
                case 0:req.body.buyer = usr; break;
                case 1: req.body.seller = usr; break;
                case 2: req.body.buyeragent = usr; break;
                case 3: req.body.selleragent = usr; break;
            }
            counter++;
            finished();
            return usr;//}
        });
    };
    req.body.buyer = exports.userByEmail(req.body.buyer);
    req.body.seller = exports.userByEmail(req.body.seller);
    req.body.buyeragent = exports.userByEmail(req.body.buyeragent);
    req.body.selleragent = exports.userByEmail(req.body.selleragent);
    //var trash = exports.userByEmail(req.body.selleragent);
    function finished() {
        console.log("81, FINISHED");
        var article = new Article(req.body);
        article.user = req.user;
        article.buyer = req.body.buyer;
        article.save(function (err) {
            if (err) {
                console.log("86"+err);
                res.json(err);
            } else {
                console.log(article.mlsCode + " property created.");
                res.json(article);
            }
        });}

};

/**
 * Show the current article
 */
exports.read = function (req, res) {
    res.json(req.article);
};

/**
 * Update a article
 */
exports.update = function (req, res) {
    var article = req.article;
    console.log(article);
    article.title = req.body.title;
    article.content = req.body.content;

    article.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(article);
        }
    });
};

/**
 * Delete an article
 */
exports.delete = function (req, res) {
    var article = req.article;

    article.remove(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(article);
        }
    });
};

/**
 * List of Articles
 */
exports.list = function (req, res) {
    Article.find().sort('-created').populate('user', 'displayName').exec(function (err, articles) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(articles);
        }
    });
};

/**
 * Article middleware
 */
exports.articleByID = function (req, res, next, id) {

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
            message: 'Article is invalid'
        });
    }

    Article.findById(id).populate('user', 'displayName').exec(function (err, article) {
        if (err) {
            return next(err);
        } else if (!article) {
            return res.status(404).send({
                message: 'No article with that identifier has been found'
            });
        }
        req.article = article;
        next();
    });
};


/*daily scheduler tues - sunday at 5 am for reminders*/

var schedule = require('node-schedule'),

    rule = new schedule.RecurrenceRule(),

    rule2 = new schedule.RecurrenceRule(),

    mongoose = require('mongoose'),

    Article = mongoose.model('Article'),

    Task = mongoose.model('Task'),

    User = mongoose.model('User');



 rule.dayOfWeek = [0, new schedule.Range(2, 6)];

 rule.hour = 5;

 rule.minute = 0;



/*DEBUG*/ //rule.minute = new schedule.Range(0, 59, 2);



schedule.scheduleJob(rule, function(){

    /*set today to the date. Inside the function to constantly reset today*/

    var todayStart = new Date(),

        todayEnd = new Date();

    todayStart.setHours(0,0,0,0);

    todayEnd.setHours(23,59,59,999);

    console.log("HELLO AGAIN");
    var userEmail, propertyAddress;
    Task

        .find({due: {$gte: todayStart, $lt: todayEnd}, complete: true})

        .sort({resUID: -1})

        .select({resUID: 1, property: 1, name: 1 })

        .exec(

            function(err,tasksToday){
                console.log("HELLO AGAIN "+ tasksToday.length);

                if(tasksToday.length === 0) return;


                for(var i = 0, len = tasksToday.length; i < len; i++){



                     var   taskName = tasksToday[i].name;

                    console.log(taskName + " today");
                    User.findById(tasksToday[i].resUID).exec(function(err,responsibleUser){

                       userEmail = responsibleUser.email;
                            console.log(userEmail + " jump");
                    })
                    Article.findById(tasksToday[i].property).exec(function (err,prop) {
                        propertyAddress = prop.street;
                        console.log(propertyAddress + " prop");

                    })

                            console.log(userEmail+" "+propertyAddress+ " " + taskName);
                            var passage = "<!DOCTYPE html><html lang='en-US'><head><meta http-equiv='Content-Type' content='text/html; charset=utf-8' /></head>" +

                                "<body><h3>Hello!</h3>" +

                                "<p>You have a task(s) due today for the property at : </p>" +

                                taskName + " " + propertyAddress +

                                "<p>If you have already completed this task(s), please sign in at way2close.herokuapp.com/settings/profile" +

                                " and mark the task as complete. If you would like to stop receiving notices from Way2Close, please follow" +

                                " this link " +

                                "<h3>Regards,</h3><h4>The Way2Close Team</h4></body>" +

                                "<footer>Please do not reply to this email.</footer>" +

                                "</html>";

                            transporter.sendMail({

                                from: "way2closeapp@gmail.com",

                                to: userEmail,

                                subject: 'Upcoming task from Way2Close',

                                html: passage

                            }, (err, info) => {

                                if(err) {console.log("62 email " + err);}

                                else {console.log("message sent successfully to: " + userEmail);}

                        });







                }

            });

})




// schedule.scheduleJob(rule, function(){
//
//     /*set today to the date. Inside the function to constantly reset today*/
//
//     var todayStart = new Date(),
//
//         todayEnd = new Date();
//
//     todayStart.setHours(0,0,0,0);
//
//     todayEnd.setHours(23,59,59,999);
//
//     var userEmail, propertyAddress,
//
//         taskName;
//
//     Task
//
//         .find({due: {$gte: todayStart, $lt: todayEnd}, complete: true})
//
//         .sort({user: -1})
//
//         .select({user: 1, property: 1, name: 1 })
//         .select({user: 1, property: 1, name: 1 })
//
//         .exec(
//
//             function(err,tasksToday){
//
//                 if(tasksToday.length===0) return;
//                 console.log("HELLO AGAIN "+ tasksToday.length);
//                 var ind = tasksToday.map(function (ta) {
//                     return ta._id;
//
//                  });
//                 console.log(ind +" ths ind");
//                 for(var i = 0, len = tasksToday.length; i < len; i++){}
//
//                     taskName = tasksToday[i].name;
//             });
//
//                     Article.findById(tasksToday[i].property).exec()
//
//                         .then(function(responsibleUser){
//
//                             userEmail = responsibleUser.buyer;
//                             console.log(userEmail);
//                             console.log(Article.findByID(ind).exec());
//                             return Article.findByID(ind).exec();
//
//                         })
//
//                         .then(function(taskAddress){
//
//                             propertyAddress = taskAddress.street;
//                             console.log(propertyAddress);
//
//                         })
//
//                         .then(function(){
//
//                             console.log(userEmail+" "+propertyAddress+ " " + taskName);
//
//                             var passage = "<!DOCTYPE html><html lang='en-US'><head><meta http-equiv='Content-Type' content='text/html; charset=utf-8' /></head>" +
//
//                                 "<body><h3>Hello!</h3>" +
//
//                                 "<p>You have a task due today for the property at " + propertyAddress + ": </p>" +
//
//                                 taskName +
//
//                                 "<p>If you have already completed this task(s), please sign in at way2close.herokuapp.com/settings/profile" +
//
//                                 " and mark the task as complete." +
//
//                                 "<h3>Regards,</h3><h4>The Way2Close Team</h4></body>" +
//
//                                 "<footer>Please do not reply to this email.</footer>" +
//
//                                 "</html>";
//
//                             transporter.sendMail({
//
//                                 from: "way2closeapp@gmail.com",
//
//                                 to: email,
//
//                                 subject: 'Upcoming task from Way2Close',
//
//                                 html: passage
//
//                             }, (err, info) => {
//
//                                 if(err) {console.log("62 email " + err);}
//
//                                 else {console.log("message sent successfully to: " + email);}
//
//                         });
//
//                         })
//
//
//
//
//
//
//
//
// });
