import Image from 'next/image';

export default function Curlsbot() {
  return (
    <div>
      <div className="card lg:bg-accent lg:shadow mb-8 mt-5 flex">
        <div className="card-content grid-cols-5 lg:grid	">
          <div className="prose col-span-2 flex flex-wrap lg:text-left p-5 justify-center">
            <div className="self-center">
              <Image
                src="/curlbot-small.png"
                className=""
                height={176}
                width={135}
              />
            </div>
            <div className="form-control w-full">
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
            <div tabindex="0" class="collapse collapse-plus">
              <div class="text-xl font-medium label ">
                <span className="label-text text-xl">More options</span>
              </div>
              <div class="collapse-content">
                <p>
                  tabindex="0" attribute is necessary to make the div focusable
                </p>
              </div>
            </div>
          </div>
          <div className="card col-span-3 w-full bg-accent-focus text-neutral-content">
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
                  className="textarea textarea-bordered h-52 bg-accent"
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
