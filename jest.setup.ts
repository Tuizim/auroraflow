import '@testing-library/jest-dom'

// Mock para window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,          // você pode alterar para true se quiser testar mobile
    media: query,
    onchange: null,
    addListener: jest.fn(),  // deprecated, mas algumas libs ainda usam
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }),
})

global.ResizeObserver = class ResizeObserver {
  observe() { }
  unobserve() { }
  disconnect() { }
};

beforeAll(() => {
    window.HTMLElement.prototype.scrollIntoView = function () { };
    window.HTMLElement.prototype.hasPointerCapture = function () { return false; };
});