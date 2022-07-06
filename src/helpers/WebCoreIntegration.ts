import { WebCoreRuntimeDeps } from '../types';
import { IWebCoreIntegration } from './WebCoreIntegration.interface';

export const WebCoreIntegration: IWebCoreIntegration = {
  getWebCoreDependencies: (timeout: number): Promise<WebCoreRuntimeDeps> => {
    return new Promise<WebCoreRuntimeDeps>((resolve, reject) => {
      let timeouted = false;
      const dependenciesListener: EventListener = (event) => {
        event.preventDefault();
        const devoEvent = event as any;
        const devoDependencies: WebCoreRuntimeDeps | undefined =
          devoEvent?.detail?.dependencies;
        if (devoDependencies) {
          timeouted = true;
          resolve(devoDependencies);
        } else {
          reject(new Error('Devo dependencies not found'));
        }
      };

      document.addEventListener(
        'applicationBuilderDependencies',
        dependenciesListener
      );
      document.dispatchEvent(new CustomEvent('getVappDeps'));

      window.setTimeout(() => {
        if (!timeouted) {
          reject(new Error('Initialization timeout'));
        }
      }, timeout);
    });
  },

  listenForUnmount: (unmountCallback: () => void): void => {
    const onUnmount = (event: Event) => {
      event.preventDefault();
      unmountCallback();
    };
    document.addEventListener('beforeChangeContainer', onUnmount);
  },
};
