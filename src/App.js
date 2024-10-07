import { RouterProvider, createHashRouter } from 'react-router-dom';
import './App.css';
import Layout from './Components/Layout/Layout';
import Home from './Components/Home/Home';
import People from './Components/People/People';
import TvShows from './Components/TvShows/TvShows';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Notfound from './Components/Notfound/Notfound';
import AuthContextProvider from './Context/authContext';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import { QueryClient, QueryClientProvider } from 'react-query';
import Movie from './Components/Moive/Movie';
import MovieDetails from './Components/MovieDetails/MovieDetails';
import { Provider } from 'react-redux';
import { myStore } from './ReduxStore/ReduxStore';
import Reviews from './Components/Reviews/Reviews';
import TvListDetails from './Components/TvListDetails/TvListDetails';
import TvShowsReviews from './Components/Reviews/TvShowsReviews';
import PeopleDetails from './Components/PeopleDetails/PeopleDetails';
import PeopleImages from './Components/PeopleDetails/PeopleImages';
import PeopleMovies from './Components/PeopleDetails/PeopleMovies';
import PeopleTvShows from './Components/PeopleDetails/PeopleTvShows';

const router = createHashRouter([
  {
    path: "/", element: <Layout />, children: [
      { path:"/", element: <ProtectedRoute> <Home /> </ProtectedRoute> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "people", element: <ProtectedRoute> <People /> </ProtectedRoute> },
      { path: "movie", element: <ProtectedRoute> <Movie /> </ProtectedRoute> },
      { path: "tvShows", element: <ProtectedRoute> <TvShows /> </ProtectedRoute> },
      { path: "MovieDetails/:id", element: <ProtectedRoute> <MovieDetails /> </ProtectedRoute> },
      { path: "tvListDetails/:id", element: <ProtectedRoute> <TvListDetails /> </ProtectedRoute> },
      { path: "PeopleDetails/:id", element: <ProtectedRoute> <PeopleDetails /> </ProtectedRoute> },
      { path: "PeopleImages/:id", element: <ProtectedRoute> <PeopleImages /> </ProtectedRoute> },
      { path: "PeopleMovies/:id", element: <ProtectedRoute> <PeopleMovies /> </ProtectedRoute> },
      { path: "PeopleTvShows/:id", element: <ProtectedRoute> <PeopleTvShows /> </ProtectedRoute> },
      { path: "Reviews/:id", element: <ProtectedRoute> <Reviews /> </ProtectedRoute> },
      { path: "TvShowsReviews/:id", element: <ProtectedRoute> <TvShowsReviews /> </ProtectedRoute> },
      { path: "*", element: <Notfound /> },
    ]
  }
])

function App() {

  const myClient = new QueryClient()

  return <>
    <Provider store={myStore}>
      <QueryClientProvider client={myClient}>
        <AuthContextProvider>
          <RouterProvider router={router} />
        </AuthContextProvider>
      </QueryClientProvider>
    </Provider>
  </>;
}

export default App;
