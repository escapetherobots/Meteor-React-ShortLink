import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';

import '../imports/api/users';
import { Links } from '../imports/api/links';
// custom error handling
import './../imports/startup/simple-schema-config';


Meteor.startup(() => {

  WebApp.connectHandlers.use( (req, res, next) => {
    //console.log('connecting handlers',req.url);
    // get the url from the request
    // remove the first character from the string and return result
    const _id = req.url.slice(1);
    //returns an object
    const link = Links.findOne({_id});
    // returns an array
    // const link = Links.find({_id: _id});
    if (link) {
      res.statusCode = 302;
      res.setHeader('Location', link.url);
      res.end();
      Meteor.call('links.trackVisit', _id);
    } else {
      next();
    }


  });


  // // CONNECT MODULE Provides the "use" method
  // // code to run on server at startup
  // WebApp.connectHandlers.use( (req, res, next) => {
  //   console.log('connecting Handlers from express and connect');
  //   console.log('req object', req.url);
  //   console.log('req methods', req.method);
  //   console.log('req headers', req.headers);
  //   console.log('req query', req.query);

    // // set http status request and headers
    // // =============================================
    // // set http status
    // res.statusCode = 404;
    //
    // // set http headers (add headers)
    // res.setHeader('zzz-custom', 'Zach was here');
    //
    // // set http body (overwrite)
    // res.write('<h1>ricky baker</h1>');
    //
    // // end http request
    // // this will terminate any further responses
    // res.end();
    //
    // // next will run any other middleware methods on the stack
    // // until next doesn't point to anything
    // // then the response will come back from server and page will load
  //   next();
  // });

  // // test method: redirect to google
  // WebApp.connectHandlers.use( (req, res, next) => {
  //   // status should be 302 redirect
  //   console.log('connecting handlers google');
  //   res.statusCode = 302;
  //   res.setHeader("location", "http://www.google.com");
  //   res.end();
  //   // set 'location' header to http://www.google.component
  //
  //   // call response end
  // });

});
