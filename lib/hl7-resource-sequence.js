
// create the object using our BaseModel
Sequence = BaseModel.extend();


//Assign a collection so the object knows how to perform CRUD operations
Sequence.prototype._collection = Sequences;

// Create a persistent data store for addresses to be stored.
// HL7.Resources.Patients = new Mongo.Collection('HL7.Resources.Patients');
Sequences = new Mongo.Collection('Sequences');

//Add the transform to the collection since Meteor.users is pre-defined by the accounts package
Sequences._transform = function (document) {
  return new Sequence(document);
};


if (Meteor.isClient){
  Meteor.subscribe("Sequences");
}

if (Meteor.isServer){
  Meteor.publish("Sequences", function (argument){
    if (this.userId) {
      return Sequences.find();
    } else {
      return [];
    }
  });
}



SequenceSchema = new SimpleSchema({
  "resourceType" : {
    type: String,
    defaultValue: "Sequence"
    },
  "variationID" : {
    optional: true,
    type: [ CodeableConceptSchema]
    },
  "referenceSeq" : {
    optional: true,
    type: CodeableConceptSchema
    },
  "quantity" : {
    optional: true,
    type: QuantitySchema
    },

  "coordinate.$.chromosome" : {
    optional: true,
    type: CodeableConceptSchema
    },
  "coordinate.$.start" : {
    optional: true,
    type: Number
    },
  "coordinate.$.end" : {
    optional: true,
    type: Number
    },
  "coordinate.$.genomeBuild" : {
    optional: true,
    type: CodeableConceptSchema
    },

  "species" : {
    optional: true,
    type: CodeableConceptSchema
    },
  "observedAllele" : {
    optional: true,
    type: String
    },
  "referenceAllele" : {
    optional: true,
    type: String
    },
  "cigar" : {
    optional: true,
    type: String
    },

  "quality.$.start" : {
    optional: true,
    type: Number
    },
  "quality.$.end" : {
    optional: true,
    type: Number
    },
  "quality.$.score" : {
    optional: true,
    type: QuantitySchema
    },
  "quality.$.platform" : {
    optional: true,
    type: CodeableConceptSchema
    },
  "allelicState" : {
    optional: true,
    type: CodeableConceptSchema
    },
  "allelicFrequency" : {
    optional: true,
    type: Number
    },
  "copyNumberEvent" : {
    optional: true,
    type: CodeableConceptSchema
    },
  "readCoverage" : {
    optional: true,
    type: Number
    },
  "chip.chipId" : {
    optional: true,
    type: String
    },
  "chip.manufacturerId" : {
    optional: true,
    type: String
    },
  "chip.version" : {
    optional: true,
    type: String
    },
  "repository.$.url" : {
    optional: true,
    type: String
    },
  "repository.$ name" : {
    optional: true,
    type: String
    },
  "repository.$.structure" : {
    optional: true,
    type: String
    },
  "repository.$.variantId" : {
    optional: true,
    type: String
    },
  "repository.$.readGroupSetId" : {
    optional: true,
    type: String
    }

});
Sequences.attachSchema(SequenceSchema);
