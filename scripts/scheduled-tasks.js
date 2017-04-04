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


rule.dayOfWeek = [0, new schedule.Range(2, 6)];
rule.hour = 5;
rule.minute = 0;


var j = schedule.scheduleJob(rule, function(){
    var today = new Date(); /*set today to the date. Inside the function to constantly reset today*/

    db.Task.aggregate(
        [
            {
                $match : {due: today, complete: false} /* Due today and not completed*/
            },
            {
                $group: {email: "$resUID.email", property: "$property.street", tasks: {$push: "$name"}} /*group by ID, then by property (for agents with tasks from different properties, then array the tasks for each property*/

            }
        ],
        function(err, result){
            for(var email in result){         /*loop through the object by email*/

                } )



        }
    )
});




/*weekly on Monday at 5am*/

rule2.dayOfWeek = 1;
rule2.hour = 5;
rule2.minute = 0;

var j2 = schedule2.scheduleJob(rule2, function(){
    /*insert code here*/
});
