import { SelectImplementationProps } from './properties/SelectImplementationProps';

import { Group } from '@bpmn-io/properties-panel';

const LOW_PRIORITY = 500;


export default class AsyncPropertiesProvider {

  constructor(propertiesPanel, translate) {

    propertiesPanel.registerProvider(LOW_PRIORITY, this);

    this._translate = translate;
  }

  getGroups(element) {
    return (groups) => {

      // add groups
      groups = groups.concat([
        SelectImplementationGroup(element)
      ]);

      // contract: if a group returns null, it should not be displayed at all
      return groups.filter(group => group !== null);
    };
  }
}

function SelectImplementationGroup(element) {
  const group = {
    label: 'Select implementation',
    id: 'Async_SelectImplementation',
    component: Group,
    entries: [
      ...SelectImplementationProps({ element })
    ]
  };

  if (group.entries.length) {
    return group;
  }

  return null;
}

AsyncPropertiesProvider.$inject = [ 'propertiesPanel', 'translate' ];