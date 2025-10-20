import { setupServer } from "msw/node";
import { handlers } from "./handlers/categoryHandlers";

export const server = setupServer(...handlers);
