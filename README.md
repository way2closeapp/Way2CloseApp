[![MEAN.JS Logo](http://meanjs.org/img/logo-small.png)](http://meanjs.org/)

## Way2Close -- https://way2close.herokuapp.com/

## Code Used
* meanjs-calendar https://github.com/tonymullen/meanjs-calendar
* Users-views and controllers https://github.com/jngriffin/Way2CloseApp/tree/master/modules/users
* Properties views and controllers https://github.com/jngriffin/Way2CloseApp/tree/master/modules/articles
* Task view and creation https://github.com/jngriffin/Way2CloseApp/tree/master/modules/tasks
* Account creation for new clients and email notification https://github.com/jngriffin/Way2CloseApp/blob/master/modules/articles/server/controllers/articles.server.controller.js


## Features
* Main Page
![modules/core/](/img/homepage.PNG)
* Signup
![modules/core/](/img/signup.PNG)
* Signin
![modules/core/](/img/signin.PNG)
* Profile Management
![modules/core/](/img/profileedit.PNG)
* User Management
![modules/users](/img/userlist.PNG)
![modules/users](/img/userpage.PNG)
* Multiple Property Dashboard
![modules/articles](/img/multidash.PNG)
* Single Property Dashboard
![modules/articles](/img/singledash.PNG)
* Property Creation
![modules/articles](/img/propcreate.PNG)
* Tasks List
![modules/tasks](/img/tasklist.PNG)
* Task Creation
![modules/tasks](/img/taskcreate.PNG)
* Calendar
![modules/calendar](/img/calendar.PNG)
## Installation
* Clone or Download from the [GitHub page](https://github.com/jngriffin/Way2CloseApp/).
* Install Node.js and Bower
```bash

$ npm install
$ npm install -g bower

```


## Database Association
* Go to [Way2CloseApp/config/env/development.js](/config/env/development.js).
* On line 9, change `uri: process.env.MONGOHQ_URL || 'mongodb://username:password@ds151279.mlab.com:51279/property'` to the database you would like to use.

### Property of Segway Group Real Estate
