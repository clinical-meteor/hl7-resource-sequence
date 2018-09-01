import { CardText, CardTitle } from 'material-ui/Card';
import {Tab, Tabs} from 'material-ui/Tabs';
import { GlassCard, VerticalCanvas, FullPageCanvas, Glass } from 'meteor/clinical:glass-ui';

import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

import SequenceDetail from './SequenceDetail';
import SequencesTable from './SequencesTable';

import React  from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin  from 'react-mixin';

export class SequencesPage extends React.Component {
  getMeteorData() {
    let data = {
      style: {
        opacity: Session.get('globalOpacity'),
        tab: {
          borderBottom: '1px solid lightgray',
          borderRight: 'none'
        }
      },
      tabIndex: Session.get('sequencePageTabIndex'),
      sequenceSearchFilter: Session.get('sequenceSearchFilter'),
      currentSequence: Session.get('selectedSequence')
    };

    data.style = Glass.blur(data.style);
    data.style.appbar = Glass.darkroom(data.style.appbar);
    data.style.tab = Glass.darkroom(data.style.tab);

    return data;
  }

  handleTabChange(index){
    Session.set('sequencePageTabIndex', index);
  }

  onNewTab(){
    Session.set('selectedSequence', false);
    Session.set('sequenceUpsert', false);
  }

  render() {
    if(process.env.NODE_ENV === "test") console.log('In SequencesPage render');
    return (
      <div id='sequencesPage'>
        <FullPageCanvas>
          <GlassCard height='auto'>
            <CardTitle title='Sequences' />
            <CardText>
              <Tabs id="sequencesPageTabs" default value={this.data.tabIndex} onChange={this.handleTabChange} initialSelectedIndex={1}>
               <Tab className='newSequenceTab' label='New' style={this.data.style.tab} onActive={ this.onNewTab } value={0}>
                 <SequenceDetail id='newSequence' />
               </Tab>
               <Tab className="sequenceListTab" label='Sequences' onActive={this.handleActive} style={this.data.style.tab} value={1}>
                <SequencesTable />
               </Tab>
               <Tab className="sequenceDetailsTab" label='Detail' onActive={this.handleActive} style={this.data.style.tab} value={2}>
                 <SequenceDetail 
                  id='sequenceDetails'
                  showDatePicker={true} 
                 />
               </Tab>
             </Tabs>
            </CardText>
          </GlassCard>
        </FullPageCanvas>
      </div>
    );
  }
}

ReactMixin(SequencesPage.prototype, ReactMeteorData);

export default SequencesPage;