import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/Toaster";
import NotFound from "./pages/not-found";
import Home from "./pages/Home";
import VanConfigurator from "./pages/VanConfigurator";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/configurador" component={VanConfigurator} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
