// if the database is empty on server start, create some sample data.
Meteor.startup(function () {
  if (process.env.INITIALIZE) {
    console.log('INITIALZING');
    if (Sequences.find().count() === 0) {
    console.log('No Sequences found.  Creating some...');



    }
  }
});
