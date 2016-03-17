
Sequences = new Meteor.Collection('sequences');

if (Meteor.isClient){
  Meteor.subscribe('sequences');
}



SequenceSchema = new SimpleSchema({
  "resourceType" : {
    type: String,
    defaultValue: "Sequence"
    }
});
Sequences.attachSchema(SequenceSchema);
