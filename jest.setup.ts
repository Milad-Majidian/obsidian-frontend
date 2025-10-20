import "@testing-library/jest-dom";

// If you’ll use MSW (mock service worker):
import { server } from "./src/mocks/server";

// Start and stop mock server for tests
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
