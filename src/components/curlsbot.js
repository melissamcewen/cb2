import Image from 'next/image';

export default function Curlsbot() {
  return (
    <div>
      <div className="card lg:bg-base-200 shadow mb-8 mt-5">
        <div className="card-content flex flex-col lg:flex-row items-start">
          <div className="prose text-center lg:text-left basis-1/2 pd-10">
            <Image src="/curlbot-small.png" height={176} width={135} />
            <div className="form-control  mx-auto">
              <label className="label cursor-pointer">
                <span className="label-text text-xl">Sulfate-free</span>
                <input
                  type="checkbox"
                  checked="checked"
                  className="checkbox checkbox-lg checkbox-primary"
                />
              </label>
              <label className="label cursor-pointer">
                <span className="label-text text-xl">Silicone-Free</span>
                <input
                  type="checkbox"
                  checked="checked"
                  className="checkbox checkbox-lg checkbox-primary"
                />
              </label>
            </div>
            <div tabIndex={0} className="collapse">
              <input type="checkbox" />
              <div className="collapse-title text-xl font-medium mx-auto px-1	py-2	 flex justify-between">
                <p>More</p>
                <button class="btn btn-square btn-sm btn-primary">+</button>
              </div>
              <div className="collapse-content">
                <p>
                  tabindex="0" attribute is necessary to make the div focusable
                </p>
              </div>
            </div>
          </div>
          <div className="card basis-2/3 w-full bg-neutral text-neutral-content">
            <div className="card-body">
              <h1 className="text-xl font-bold">
                Curlsbot Ingredients Analyzer
              </h1>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-neutral-content">
                    Paste an ingredients list here
                  </span>
                </label>
                <textarea
                  className="textarea textarea-bordered h-52"
                  placeholder="Find the ingredients list on the brand website and paste it here"
                  defaultValue={''}
                />
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Analyze</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid lg:grid-cols-2 gap-6">
        <div class="card bg-neutral text-neutral-content col-span-2">
          <div class="card-body items-center text-center">
            <h2 class="card-title">Results</h2>
            <p>We've detected stuff, see below for details.</p>
            <div class="card-actions justify-end">
              <button class="btn btn-primary">New Analysis</button>
            </div>
          </div>
        </div>
        <div class="card bg-warning text-primary-content">
          <div class="card-body prose">
            <h2 class="card-title">Sulfates Detected</h2>
            <ul>
              <li>Sulfate 1 </li>
              <li>Sulfate 2 </li>
            </ul>
            <div class="card-actions justify-end">
              <button class="btn">More info</button>
            </div>
          </div>
        </div>
        <div class="card bg-error text-primary-content">
          <div class="card-body">
            <h2 class="card-title">Card title!</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-end">
              <button class="btn">Buy Now</button>
            </div>
          </div>
        </div>
        <div class="card bg-info text-primary-content">
          <div class="card-body">
            <h2 class="card-title">Card title!</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-end">
              <button class="btn">Buy Now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
