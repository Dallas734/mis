import { Suspense } from "react";
import AppRouter from "./providers/router/ui/AppRouter";
import { Toaster } from "react-hot-toast";

function App() {

  return (
    // <div className={classNames('app', theme)}*/}>
    <Suspense fallback="">
      <AppRouter />
    </Suspense>
    // </div>
  );
}

export default App;
