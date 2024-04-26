import { Suspense, lazy, useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import dashboardRoutes from './routes/dashboard.route';
import Welcome from './pages/Welcome';
import Loader from './layouts/admin/Loader';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

const Dashboard = lazy(() => import('./pages/dashboard'));

function App() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate('/auth/sign-in');
    }
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
    <>
      <Routes>
        <Route
          path="/"
          element={<SignIn setUser={setUser} setIsLoading={setIsLoading} />}
        />
        <Route
          path="/auth/sign-in"
          element={<SignIn setUser={setUser} setIsLoading={setIsLoading} />}
        />
        <Route path="/auth/sign-up" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard user={user} />}>
          <Route index element={<Welcome user={user} />} />
          {dashboardRoutes.map((routes, index) => {
            const { path, component: Component } = routes;
            return (
              <Route
                key={index}
                path={path}
                element={
                  <Suspense fallback={<Loader />}>
                    <Component user={user} setUser={setUser} />
                  </Suspense>
                }
              />
            );
          })}
        </Route>
      </Routes>
    </>
  );
}

export default App;
