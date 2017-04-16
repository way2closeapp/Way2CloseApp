/**
 * Created by gcaudill on 3/28/2017.
 */
/*** Created by gcaudill on 3/27/2017.*/
'use strict';


/*daily scheduler tues - sunday at 5 am for reminders*/
var schedule = require('node-schedule'),
    rule = new schedule.RecurrenceRule(),
    rule2 = new schedule.RecurrenceRule(),
    mongoose = require('mongoose'),
    Article = mongoose.model('Article'),
    Task = mongoose.model('Task'),
    User = mongoose.model('User');

/*
rule.dayOfWeek = [0, new schedule.Range(2, 6)];
rule.hour = 5;
rule.minute = 0;
*/
/*DEBUG*/ rule.minute = new schedule.Range(0, 59, 10);

schedule.scheduleJob(rule, function(){
    var today = new Date(); /*set today to the date. Inside the function to constantly reset today*/
    db.Task.aggregate(
        [
            /* Due today and not completed*/
            {$match : {due: today, complete: false}},
            /*group by ID, then by property (for agents with tasks from different properties, then array the tasks for each property*/
            {$group: {email: "$resUID.email", property: "$property.street", subscribed:"$resUID.subscribed", tasks: {$push: "$name"}}}
        ],
        function(err, result){
            for(var email in result) {
                if (result.subscribed = true) {
                    var tasklist = "";
                    for(var task in result.tasks){
                        tasklist = task + " ";
                    }
                    /*loop through the object by email*/
                    /*DEBUG*/var email="gregoryallencaudill@gmail.com";
                    var passage = "<!DOCTYPE html><html lang='en-US'><head><meta http-equiv='Content-Type' content='text/html; charset=utf-8' /></head>" +
                        "<body><h3>Hello!</h3>" +
                        "<p>You have a task(s) due today for the property at " + result.property + ": </p>" +
                        tasklist +
                        "<p>If you have already completed this task(s), please sign in at way2close.herokuapp.com/settings/profile" +
                        " and mark the task as complete. If you would like to stop receiving notices from Way2Close, please follow" +
                        " this link " + link +
                        "<h3>Regards,</h3><h4>The Way2Close Team</h4></body>" +
                        "<footer>Please do not reply to this email.</footer>" +
                        "</html>";
                    transporter.sendMail({
                        from: "way2closeapp@gmail.com",
                        to: email,
                        subject: 'Upcoming task from Way2Close',
                        html: passage
                    }, (err, info) => {
                        if(err) {console.log("62 email " + err);}
                        else {console.log("message sent successfully to: " + email);}
                });
                }

            }
        }
    )
});




/*weekly on Monday at 5am*/

rule2.dayOfWeek = 1;
rule2.hour = 5;
rule2.minute = 0;

var j2 = schedule2.scheduleJob(rule2, function(){
    var startDate = new Date(), /*set today to the date. Inside the function to constantly reset today*/
        endDate = new Date(startDate.getTime() + 7 * 24 * 60 * 60 * 1000)
    db.Task.aggregate(
        [
            /* Due today and not completed*/
            {$match : {due: {$gt: startDate, $lt: endDate}, complete: false}},
            /*group by ID, then by property (for agents with tasks from different properties, then array the tasks for each property*/
            {$group: {email: "$resUID.email", property: "$property.street", subscribed:"$resUID.subscribed", tasks: {$push: "$name"}}}
        ],
        function(err, result){
            for(var email in result) {
                if (result.subscribed = true) {
                    var tasklist = "";
                    for(var task in result.tasks){
                        tasklist = task + " ";
                    }
                    /*loop through the object by email*/
                    var passage = "<!DOCTYPE html><html lang='en-US'><head><meta http-equiv='Content-Type' content='text/html; charset=utf-8' /></head>" +
                        "<body><h3>Hello!</h3>" +
                        "<p>You have a task(s) due this week for the property at " + result.property + ": </p>" +
                        tasklist +
                        "<p>If you have already completed this task(s), please sign in at way2close.herokuapp.com/settings/profile" +
                        " and mark the task as complete. If you would like to stop receiving notices from Way2Close, please follow" +
                        " this link " + link +
                        "<h3>Regards,</h3><h4>The Way2Close Team</h4></body>" +
                        "<footer>Please do not reply to this email.</footer>" +
                        "</html>";
                    transporter.sendMail({
                        from: "way2closeapp@gmail.com",
                        to: email,
                        subject: 'Weekly update from Way2Close',
                        html: passage
                    }, (err, info) => {
                        if(err) {console.log("62 email " + err);}
                        else {console.log("message sent successfully to: " + email);}
                });
                }

            }
        }
    )
});
