import { CardActions, CardText, DatePicker, RaisedButton, TextField } from 'material-ui';
import { Col, Grid, Row } from 'react-bootstrap';

import { Bert } from 'meteor/clinical:alert';
import React from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin from 'react-mixin';
import { browserHistory } from 'react-router';
import { get } from 'lodash';
import PropTypes from 'prop-types';

let defaultSequence = {
  'resourceType': 'Sequence',
  'status': 'unknown',
  'identifier': [{
    'use': 'official',
    'value': ''
  }],
  'code': {
    'text': ''
  }
};



Session.setDefault('sequenceUpsert', false);
Session.setDefault('selectedSequence', false);


export class SequenceDetail extends React.Component {
  getMeteorData() {
    let data = {
      sequenceId: false,
      sequence: defaultSequence,
      showDatePicker: false
    };

    if(this.props.showDatePicker){
      data.showDatePicker = this.props.showDatePicker
    }

    if (Session.get('sequenceUpsert')) {
      data.sequence = Session.get('sequenceUpsert');
    } else {
      // if (Session.get('selectedSequence')) {
      //   data.sequenceId = Session.get('selectedSequence');
        console.log("selectedSequence", Session.get('selectedSequence'));

        let selectedSequence = Sequences.findOne({_id: Session.get('selectedSequence')});
        console.log("selectedSequence", selectedSequence);

        if (selectedSequence) {
          data.sequence = selectedSequence;
        }
      // } else {
      //   data.sequence = defaultSequence;
      // }
    }

    if (Session.get('selectedSequence')) {
      data.sequenceId = Session.get('selectedSequence');
    }      

    return data;
  }

  renderDatePicker(showDatePicker, datePickerValue){
    if (showDatePicker) {
      return (
        <DatePicker 
          name='performedDateTime'
          hintText="Performed Date/Time" 
          container="inline" 
          mode="landscape"
          value={ datePickerValue ? datePickerValue : ''}    
          onChange={ this.changeState.bind(this, 'performedDateTime')}      
          />
      );
    }
  }

  render() {
    return (
      <div id={this.props.id} className="sequenceDetail">
        <CardText>
          <Row>
            <Col md={4} >
              <TextField
                id='identifierInput'
                ref='identifier'
                name='identifier'
                floatingLabelText='Identifier'
                value={ get(this, 'data.sequence.identifier[0].value') ? get(this, 'data.sequence.identifier[0].value') : ''}
                onChange={ this.changeState.bind(this, 'identifier')}
                fullWidth
                /><br/>
            </Col>
            <Col md={4} >
              <TextField
                id='codeInput'
                ref='code'
                name='code'
                floatingLabelText='Code'
                value={this.data.sequence.code ? this.data.sequence.code.text : ''}
                onChange={ this.changeState.bind(this, 'code')}
                fullWidth
                /><br/>
            </Col>
            <Col md={4} >
              <TextField
                id='statusInput'
                ref='status'
                name='status'
                floatingLabelText='Status'
                value={this.data.sequence.status ? this.data.sequence.status : ''}
                onChange={ this.changeState.bind(this, 'status')}
                fullWidth
                /><br/>
            </Col>
          </Row>
          <Row>

            
          </Row>

            {/* <br/>
          { this.renderDatePicker(this.data.showDatePicker, get(this, 'data.sequence.performedDateTime') ) }
          <br/> */}

        </CardText>
        <CardActions>
          { this.determineButtons(this.data.sequenceId) }
        </CardActions>
      </div>
    );
  }


  addToContinuityOfCareDoc(){
    console.log('addToContinuityOfCareDoc', Session.get('sequenceUpsert'));

    var sequenceUpsert = Session.get('sequenceUpsert');

    var newSequence = {
      'resourceType': 'Sequence',
      'status': sequenceUpsert.status,
      'identifier': sequenceUpsert.identifier,
      'code': {
        'text': sequenceUpsert.code.text
      },
      'performedDateTime': sequenceUpsert.performedDateTime  
    }

    console.log('Lets write this to the profile... ', newSequence);

    Meteor.users.update({_id: Meteor.userId()}, {$addToSet: {
      'profile.continuityOfCare.sequences': newSequence
    }}, function(error, result){
      if(error){
        console.log('error', error);
      }
      if(result){
        browserHistory.push('/continuity-of-care');
      }
    });
  }
  determineButtons(sequenceId){
    if (sequenceId) {
      return (
        <div>
          <RaisedButton id="saveSequenceButton" label="Save" primary={true} onClick={this.handleSaveButton.bind(this)} style={{marginRight: '20px'}}  />
          <RaisedButton id="deleteSequenceButton" label="Delete" onClick={this.handleDeleteButton.bind(this)} />

          <RaisedButton id="addSequenceToContinuityCareDoc" label="Add to CCD" primary={true} onClick={this.addToContinuityOfCareDoc.bind(this)} style={{float: 'right'}} />
        </div>
      );
    } else {
      return(
        <RaisedButton id="saveSequenceButton" label="Save" primary={true} onClick={this.handleSaveButton.bind(this)} />
      );
    }
  }



  // this could be a mixin
  changeState(field, event, value){
    let sequenceUpdate;

    if(process.env.NODE_ENV === "test") console.log("SequenceDetail.changeState", field, event, value);

    // by default, assume there's no other data and we're creating a new sequence
    if (Session.get('sequenceUpsert')) {
      sequenceUpdate = Session.get('sequenceUpsert');
    } else {
      sequenceUpdate = defaultSequence;
    }



    // if there's an existing sequence, use them
    if (Session.get('selectedSequence')) {
      sequenceUpdate = this.data.sequence;
    }

    switch (field) {
      case "identifier":
        sequenceUpdate.identifier = [{
          use: 'official',
          value: value
        }];
        break;
      case "code":
        sequenceUpdate.code.text = value;
        break;
      case "status":
        sequenceUpdate.status = value;
        break;
      case "performedDateTime":
        sequenceUpdate.performedDateTime = value;
        break;

      default:
    }

    if(process.env.NODE_ENV === "test") console.log("sequenceUpdate", sequenceUpdate);
    Session.set('sequenceUpsert', sequenceUpdate);
  }

  handleSaveButton(){
    let sequenceUpdate = Session.get('sequenceUpsert', sequenceUpdate);

    if(process.env.NODE_ENV === "test") console.log("sequenceUpdate", sequenceUpdate);


    if (Session.get('selectedSequence')) {
      if(process.env.NODE_ENV === "test") console.log("Updating sequence...");
      delete sequenceUpdate._id;

      // not sure why we're having to respecify this; fix for a bug elsewhere
      sequenceUpdate.resourceType = 'Sequence';

      Sequences.update(
        {_id: Session.get('selectedSequence')}, {$set: sequenceUpdate }, function(error, result) {
          if (error) {
            console.log("error", error);

            Bert.alert(error.reason, 'danger');
          }
          if (result) {
            HipaaLogger.logEvent({eventType: "update", userId: Meteor.userId(), userName: Meteor.user().fullName(), collectionName: "Sequences", recordId: Session.get('selectedSequence')});
            Session.set('sequencePageTabIndex', 1);
            Session.set('selectedSequence', false);
            Session.set('sequenceUpsert', false);
            Bert.alert('Sequence updated!', 'success');
          }
        });
    } else {

      if(process.env.NODE_ENV === "test") console.log("create a new sequence", sequenceUpdate);

      Sequences.insert(sequenceUpdate, function(error, result) {
        if (error) {
          console.log("error", error);
          Bert.alert(error.reason, 'danger');
        }
        if (result) {
          HipaaLogger.logEvent({eventType: "create", userId: Meteor.userId(), userName: Meteor.user().fullName(), collectionName: "Sequences", recordId: result});
          Session.set('sequencePageTabIndex', 1);
          Session.set('selectedSequence', false);
          Session.set('sequenceUpsert', false);
          Bert.alert('Sequence added!', 'success');
        }
      });
    }
  }

  handleCancelButton(){
    Session.set('sequencePageTabIndex', 1);
  }

  handleDeleteButton(){
    Sequence.remove({_id: Session.get('selectedSequence')}, function(error, result){
      if (error) {
        Bert.alert(error.reason, 'danger');
      }
      if (result) {
        HipaaLogger.logEvent({eventType: "delete", userId: Meteor.userId(), userName: Meteor.user().fullName(), collectionName: "Sequences", recordId: Session.get('selectedSequence')});
        Session.set('sequencePageTabIndex', 1);
        Session.set('selectedSequence', false);
        Session.set('sequenceUpsert', false);
        Bert.alert('Sequence removed!', 'success');
      }
    });
  }
}


SequenceDetail.propTypes = {
  hasUser: PropTypes.object
};
ReactMixin(SequenceDetail.prototype, ReactMeteorData);
export default SequenceDetail;