import { RouterProvider } from "@tanstack/react-router";
import { router } from "./routes/index";
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
