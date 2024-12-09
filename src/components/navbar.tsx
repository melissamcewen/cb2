export default function Navbar(): JSX.Element {
  return (
    <div className="navbar bg-primary text-primary-content">
      <div className="navbar-start">
        <a className="btn btn-ghost normal-case text-xl">Curlsbot</a>
      </div>
      <div className="navbar-center">
        <ul className="menu menu-horizontal p-0">
          <li>
            <a>Blog</a>
          </li>
          <li>
            <a>Hair Quiz</a>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <a className="btn">Get started</a>
      </div>
    </div>
  );
}