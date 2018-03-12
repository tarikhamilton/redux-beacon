import { Target } from 'redux-beacon';
import { Options } from './types';

export const GoogleTagManager = ({
  dataLayerName = 'dataLayer',
}: Options = {}): Target => events => {
  if (typeof window === 'undefined') {
    return;
  }
  if (
    !(window as any)[dataLayerName] ||
    typeof (window as any)[dataLayerName].push !== 'function'
  ) {
    throw new Error(
      `redux-beacon error: window.${dataLayerName} is not defined. Have you forgotten to include Google Tag Manager and dataLayer?`
    );
  }
  events.forEach(event => {
    const eventToPush = (() => {
      if (event.event === undefined && event.hitType !== undefined) {
        return Object.assign({}, event, { event: event.hitType });
      }
      return event;
    })();
    (window as any)[dataLayerName].push(eventToPush);
  });
};
