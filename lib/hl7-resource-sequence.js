
Sequences = new Meteor.Collection('sequences');

if (Meteor.isClient){
  Meteor.subscribe('sequences');
}



SequenceSchema = new SimpleSchema({
  "resourceType" : {
    type: String,
    defaultValue: "Sequence"
    },
  "variationID" : {
    optional: true,
    type: [ CodeableConcept ]
    },
  "referenceSeq" : {
    optional: true,
    type: CodeableConcept 
    }, 
  "quantity" : {
    optional: true,
    type: Quantity 
    }, 

  "coordinate.$.chromosome" : {
    optional: true,
    type: CodeableConcept 
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
    type: CodeableConcept 
    },

  "species" : {
    optional: true,
    type: CodeableConcept 
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
    type: Quantity 
    },
  "quality.$.platform" : {
    optional: true,
    type: CodeableConcept 
    },
  "allelicState" : {
    optional: true,
    type: CodeableConcept 
    },
  "allelicFrequency" : {
    optional: true,
    type: Number
    },
  "copyNumberEvent" : {
    optional: true,
    type: CodeableConcept 
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

