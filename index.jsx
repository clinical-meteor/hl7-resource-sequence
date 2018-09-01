

import SequencesPage from './client/SequencesPage';
import SequencesTable from './client/SequencesTable';

var DynamicRoutes = [{
  'name': 'SequencesPage',
  'path': '/sequences',
  'component': SequencesPage,
  'requireAuth': true
}];

var SidebarElements = [{
  'primaryText': 'Sequences',
  'to': '/sequences',
  'href': '/sequences'
}];

export { 
  SidebarElements, 
  DynamicRoutes, 

  SequencesPage,
  SequencesTable
};


