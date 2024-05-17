import { Link } from 'react-router-dom';
import * as userService from '../../utilities/users-service';

export default function NavBar({ user, setUser }) {
  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  return (
    <nav>
      <div className="welcome-tag">Welcome to the Pokedex, {user.name}!</div>
      &nbsp;&nbsp;
      <Link className="nav-link" to="/">Pokemon</Link>
      &nbsp;&nbsp;
      <Link className="nav-link" to="/pokemonParty">My Pokemon Party</Link>
      &nbsp;&nbsp;<Link className="nav-link" to="" onClick={handleLogOut}>Log Out</Link>
    </nav>
  );
}