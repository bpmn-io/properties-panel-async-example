# async-properties-panel-example

This example uses [bpmn-js](https://github.com/bpmn-io/bpmn-js) and [@bpmn-io/bpmn-properties-panel](https://github.com/bpmn-io/bpmn-properties-panel). It implements a BPMN 2.0 modeler that allows you to handle asynchronous data inside a properties panel extension.

![Screenshot](./docs/screenshot.png)

## About

This example extends the properties panel to allow editing an `async:implementationDefinition` property on all events and tasks. The available implementation types are fetched from an asynchronous service and displayed in a select component once ready. 

In particular, this example includes

* Adding a group called "Select implementation"
* Adding a "Type" select field to select the implementation type
* Adding a "Connection key" text input field to define a resolvable key
* Displaying the connection key property only if the type is given (conditional rendering)

The properties will be persisted as an extension as part of the BPMN 2.0 document:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions ... xmlns:async="http://example.com" id="sample-diagram">
  <bpmn:process id="Process_1">
    <bpmn:startEvent id="StartEvent_1">
      <bpmn:extensionElements>
        <async:implementationDefinition type="external-service" connectionKey="order-food" />
      </bpmn:extensionElements>
    </bpmn:startEvent>
  </bpmn:process>
  ...
</bpmn:definitions>
```

Take a look inside the [properties provider](./src/provider) to gather details.

To ship our custom extension with the properties panel, we have to wire both the moddle extension and the properties provider when creating the modeler.

```javascript
import BpmnModeler from 'bpmn-js/lib/Modeler';

import {
  BpmnPropertiesPanelModule,
  BpmnPropertiesProviderModule
} from '@bpmn-io/bpmn-properties-panel';

import AsyncPropertiesProviderModule from './provider';

import asyncModdleDescriptors from './descriptors/async.json';


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
```

## Building the Example

You need a [NodeJS](http://nodejs.org) development stack with [npm](https://npmjs.org) and installed to build the project.

To install all project dependencies execute

```
npm install
```

Build the example using [webpack](https://webpack.js.org/) via

```
npm start
```

You may also spawn a development setup by executing

```
npm run dev
```