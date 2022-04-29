export default function Curlsbot() {
  return (
    <div>
      <div className="hero bg-accent shadow">
        <div className="hero-content flex-col lg:flex-row">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl font-bold">
              Curlsbot Ingredients Analyzer
            </h1>
            <div class="divider"></div>

            <div className="form-control w-3/5 mx-auto">
              <label className="label cursor-pointer">
                <span className="label-text text-xl">Sulfates</span>
                <input
                  type="checkbox"
                  checked="checked"
                  className="checkbox checkbox-lg"
                />
              </label>
              <label className="label cursor-pointer">
                <span className="label-text text-xl">Silicones</span>
                <input
                  type="checkbox"
                  checked="checked"
                  className="checkbox checkbox-lg"
                />
              </label>
            </div>
            <div tabIndex={0} className="collapse">
              <input type="checkbox" />
              <div className="collapse-title text-xl font-medium w-3/5 mx-auto p-1 flex justify-between">
                <p>More</p>
                <button class="btn btn-square btn-sm btn-active">+</button>
              </div>
              <div className="collapse-content">
                <p>
                  tabindex="0" attribute is necessary to make the div focusable
                </p>
              </div>
            </div>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="text"
                  placeholder="email"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="text"
                  placeholder="password"
                  className="input input-bordered"
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
