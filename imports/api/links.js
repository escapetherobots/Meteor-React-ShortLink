import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
// Validate Data
import SimpleSchema from 'simpl-schema';
// short ids
import shortid from 'shortid';

export const Links = new Mongo.Collection('links');

// Meteor.publish;
// Meteor.isServer;
if(Meteor.isServer) {
  // first argument does not refer to the collection!!!
  Meteor.publish('links', function() {
    // can't use Meteor.getUser()
    // must use this.userId property in api to both client and server
    let user = this.userId;
    //return Links.find({url: 'something'});
    return Links.find({userId: user});
  });
}


// Methods defined for server and client
// simulate on client and run on server
// we need this bound to the methods

Meteor.methods({
  //******************************************************
  //******************************************************
  'links.insert'(url){
    if(!this.userId) {
      throw new Meteor.Error('You are not authorized to perform that action');
    }

    // validate the data before submit to DB
    new SimpleSchema({
      url: {
        type: String,
        label: 'Link Url',
        regEx: SimpleSchema.RegEx.Url
      }
    }).validate({
      url: url
    });
    //error validation handled from custom simple-schema errors

    // ADD RECORD
    Links.insert({
      _id: shortid.generate(),
      url,
      userId: this.userId,
      visible: true,
      visitedCounter: 0,
      lastVisitedAt: null,
    })
  },

  //******************************************************
  //******************************************************
  'links.setVisibility'(_id, visible){
    //----------------------------------
    // require user auth
    if(!this.userId){
      throw new Meteor.Error('You are not authorized to perform that action');
    }

    //----------------------------------
    // set schema for data
    new SimpleSchema({
      _id: {
        type: String,
        min: 1,
        label: 'link id'
      },
      visible: {
        type: Boolean,
        label: 'link visibility'
      }
    }).validate({
      _id,
      visible
    });
    //error validation handled from custom simple-schema errors

    //----------------------------------
    // update the single document on the DB
    Links.update({_id, userId: this.userId}, {$set: {visible}});
  },


  //******************************************************
  //******************************************************
  'links.trackVisit'(_id){
    //----------------------------------
    // require user auth not required
    // if(!this.userId){
    //   throw new Meteor.Error('You are not authorized to perform that action');
    // }

    //----------------------------------
    // set schema for data
    new SimpleSchema({
      _id: {
        type: String,
        min: 1,
        label: 'link id'
      }
    }).validate({
      _id
    });
    //error validation handled from custom simple-schema errors

    //----------------------------------
    // update the single document on the DB
    Links.update({_id}, {
      $set: {
        lastVisitedAt: new Date().getTime()
      },
      $inc: {
        visitedCounter: 1
      }
    });
  },

  // EXAMPLE METHODS
  //==========================================================
  // greetUser(someName = "jimmy jones default"){
  //   console.log('greetUser is running');
  //
  //   if(!someName) {
  //     throw new Meteor.Error('invalid arg', 'name is required');
  //   }
  //
  //   return `Hello user ${someName}`;
  // },
  //
  // addNumbers(num1 = 5, num2 = 4){
  //   console.log('addNumbers is running');
  //   if(typeof num1 !== 'number' || typeof num2 !== 'number'){
  //     throw new Meteor.Error('invalid args', 'numbers are required');
  //   }
  //
  //   return num1 + num2;
  // }
});
