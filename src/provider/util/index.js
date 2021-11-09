import {
  getBusinessObject,
  is
} from 'bpmn-js/lib/util/ModelUtil';

export function createElement(elementType, properties, parent, factory) {
  const element = factory.create(elementType, properties);
  element.$parent = parent;

  return element;
}

export function getExtensionElementsList(businessObject, type = undefined) {
  const elements = ((businessObject.get('extensionElements') &&
                  businessObject.get('extensionElements').get('values')) || []);

  return (elements.length && type) ?
    elements.filter((value) => is(value, type)) :
    elements;
}

export function getImplementationType(element) {
  const definition = getImplementationDefinition(element);
  return definition && definition.get('type');
}

export function getImplementationDefinition(element) {
  const businessObject = getBusinessObject(element);
  const elements = getExtensionElementsList(businessObject, 'async:ImplementationDefinition');

  return (elements || [])[0];
}

export function isSupported(element) {
  return is(element, 'bpmn:Task') || is(element, 'bpmn:Event');
}