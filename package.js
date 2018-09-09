Package.describe({
  name: 'clinical:hl7-resource-sequence',
  version: '1.3.1',
  summary: 'HL7 FHIR Resource - Sequence',
  git: 'https://github.com/clinical-meteor/hl7-resource-sequence',
  documentation: 'README.md'
});

Package.onUse(function (api) {
  api.versionsFrom('1.1.0.3');

  api.use('meteor-platform');
  api.use('mongo');
  api.use('ecmascript@0.9.0');

  api.use('aldeed:collection2@3.0.0');
  api.use('clinical:hl7-resource-datatypes@4.0.0');
  api.use('clinical:hl7-resource-bundle@1.4.0');

  api.use('clinical:glass-ui@2.2.7');
  api.use('clinical:base-model@1.4.0');

  api.use('simple:json-routes@2.1.0');
  api.use('prime8consulting:meteor-oauth2-server@0.0.2');

  api.addFiles('lib/hl7-resource-sequence.js', ['client', 'server']);
  api.addFiles('server/rest.js', 'server');
  api.addFiles('server/initialize.js', 'server');

  api.export('Sequence');
  api.export('Sequences');
  api.export('SequenceSchema');

  api.mainModule('index.jsx', 'client');
});

Npm.depends({
  "simpl-schema": "1.5.3"
})