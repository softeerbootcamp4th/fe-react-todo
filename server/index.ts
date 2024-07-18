import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";

export const worker = setupWorker(...handlers);
await worker.start({
  onUnhandledRequest: "bypass",
});
