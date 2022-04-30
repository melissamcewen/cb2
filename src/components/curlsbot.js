import { InformationCircleIcon } from '@heroicons/react/solid';

export default function Curlsbot() {
  return (
    <div>
      <div className="hero bg-accent shadow">
        <div className="hero-content flex-col lg:flex-row items-start">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl font-bold">
              Curlsbot Ingredients Analyzer
            </h1>
            <div class="divider"></div>

            <div className="form-control  mx-auto">
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
              <div className="collapse-title text-xl font-medium mx-auto px-1	py-2	 flex justify-between">
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
          <div className="card shadow-2xl bg-base-100">
            <div className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">
                    Paste your ingredients list here
                  </span>
                </label>
                <textarea
                  className="textarea textarea-bordered h-52"
                  placeholder="Paste an ingredient list here- we recommend finding the list on the brand's website or ulta and pasting it here rather than trying to type yourself. Typing yourself may result in inaccuracies."
                  defaultValue={''}
                />
                <div className="alert alert-info">
                  <div>
                    <InformationCircleIcon className="inline flex-shrink-0 w-6 h-6" />
                    <div>
                      <h3 className="font-bold">Tip</h3>
                      <div className="text-xs">
                        It's a good idea to find the list on the brand's website
                        so you can paste it here rather than trying to type
                        yourself. Typing yourself may result in inaccuracies.
                      </div>
                    </div>
                  </div>

                </div>

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
