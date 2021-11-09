import BpmnModeler from 'bpmn-js/lib/Modeler';

import {
  BpmnPropertiesPanelModule,
  BpmnPropertiesProviderModule
} from '@bpmn-io/bpmn-properties-panel';

import AsyncPropertiesProviderModule from './provider';

import asyncModdleDescriptors from './descriptors/async.json';

import diagramXML from '../resources/diagram.bpmn';


const modeler = new BpmnModeler({
  container: '.diagram-container',
  propertiesPanel: {
    parent: '.properties-container'
  },
  additionalModules: [
    BpmnPropertiesPanelModule,
    BpmnPropertiesProviderModule,
    AsyncPropertiesProviderModule
  ],
  moddleExtensions: {
    async: asyncModdleDescriptors
  }
});

modeler.importXML(diagramXML)
  .then(_ => {
    const canvas = modeler.get('canvas');
    canvas.zoom('fit-viewport');
  })
  .catch(error => {
    console.error(error);
  });
