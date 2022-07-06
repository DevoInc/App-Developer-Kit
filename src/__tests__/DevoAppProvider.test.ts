import { DevoAppMock } from '../devoApp/__mocks__/DevoApp';
import { mockedWebCoreIntegration } from '../helpers/__mocks__/WebCoreIntegration';
import { DevoAppProvider } from '../DevoAppProvider';

jest.mock('../helpers/WebCoreIntegration', () => ({
  __esModule: true,
  WebCoreIntegration: mockedWebCoreIntegration,
}));

jest.mock('../devoApp/DevoApp', () => ({
  __esModule: true,
  DevoApp: DevoAppMock,
}));

describe('DevoApp Provider Test', () => {
  it('Throws error if DevoAppProvider is not initialized', () => {
    expect(() => {
      DevoAppProvider.getInstance();
    }).toThrowError('DevoAppProvider is not initialized');
  });

  it('Returns singleton instance', () => {
    const app1 = DevoAppProvider.init();

    const app2 = DevoAppProvider.getInstance();

    expect(app1).toEqual(app2);
  });
});
