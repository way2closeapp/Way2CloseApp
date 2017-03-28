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
    Article = mongoose.model('Article');

rule.dayOfWeek = [0, new schedule.Range(2, 6)];
rule.hour = 5;
rule.minute = 0;

var j = schedule.scheduleJob(rule, function(){
    /*insert code here*/
});




/*weekly on Monday at 5am*/

rule2.dayOfWeek = [0, new schedule.Range(1, 6)];
rule2.hour = 5;
rule2.minute = 0;

var j2 = schedule2.scheduleJob(rule2, function(){
    /*insert code here*/
});
