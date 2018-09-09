import SimpleSchema from 'simpl-schema';

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


if(typeof Sequences === 'undefined'){
  if(Package['clinical:autopublish']){
    Sequences = new Mongo.Collection('Sequences');
  } else if(Package['clinical:desktop-publish']){    
    Sequences = new Mongo.Collection('Sequences');
  } else {
    Sequences = new Mongo.Collection('Sequences', {connection: null});
  }
}


SequenceSchema = new SimpleSchema({
  "resourceType" : {
    type: String,
    defaultValue: "Sequence"
    },
  "identifier" : {
    optional: true,
    type:  Array
    },
  "identifier.$" : {
    optional: true,
    type:  IdentifierSchema 
    },
  "type" : {
    optional: true,
    type: Code,
    allowedValues: [ 'aa', 'dna', 'rna']
  },
  "patient" : {
    optional: true,
    type: ReferenceSchema
  },
  "specimen" : {
    optional: true,
    type: ReferenceSchema
  },
  "device" : {
    optional: true,
    type: ReferenceSchema
  },
  "performer" : {
    optional: true,
    type: ReferenceSchema
  },
  "quantity" : {
    optional: true,
    type: QuantitySchema
    },

  "referenceSeq" : {
    optional: true,
    type:  Array 
    },  
  "referenceSeq.$" : {
    optional: true,
    type: Object
  },
  "referenceSeq.$.chromosome" : {
    optional: true,
    type: CodeableConceptSchema
    },
  "referenceSeq.$.genomeBuild" : {
    optional: true,
    type: CodeableConceptSchema
    },
  "referenceSeq.$.referenceSeqPointer" : {
    optional: true,
    type: CodeableConceptSchema
    },
  "referenceSeq.$.strand" : {
    optional: true,
    type: Number
    },
  "referenceSeq.$.windowStart" : {
    optional: true,
    type: Number
    },
  "referenceSeq.$.windowEnd" : {
    optional: true,
    type: Number
    },

  "variant" : {
    optional: true,
    type:  Array 
    },  
  "variant.$" : {
    optional: true,
    type: Object
  },

  "variant.$.start" : {
    optional: true,
    type: Number
    },
  "variant.$.end" : {
    optional: true,
    type: Number
    },
  "variant.$.observedAllele" : {
    optional: true,
    type: String
    },
  "variant.$.referenceAllele" : {
    optional: true,
    type: String
    },
  "variant.$.cigar" : {
    optional: true,
    type: String
    },

  "quality" : {
    optional: true,
    type:  Array 
    },  
  "quality.$" : {
    optional: true,
    type: Object
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
  // "allelicState" : {
  //   optional: true,
  //   type: CodeableConceptSchema
  //   },
  // "allelicFrequency" : {
  //   optional: true,
  //   type: Number
  //   },
  // "copyNumberEvent" : {
  //   optional: true,
  //   type: CodeableConceptSchema
  //   },
  "readCoverage" : {
    optional: true,
    type: Number
    },

  "repository" : {
    optional: true,
    type:  Array 
    },  
  "repository.$" : {
    optional: true,
    type: Object
  },
  "repository.$.type" : {
    optional: true,
    type: String
    },
  "repository.$.url" : {
    optional: true,
    type: String
    },
  "repository.$.name" : {
    optional: true,
    type: String
    },
  "repository.$.datasetId" : {
    optional: true,
    type: String
    },
  "repository.$.variantsetId" : {
    optional: true,
    type: String
    },
  "repository.$.readsetId" : {
    optional: true,
    type: String
    },
  "pointer" : {
    optional: true,
    type: ReferenceSchema
  }
});

BaseSchema.extend(SequenceSchema);
DomainResourceSchema.extend(SequenceSchema);
Sequences.attachSchema(SequenceSchema);

export default { Sequence, Sequences, SequenceSchema };