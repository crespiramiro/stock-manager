import Topbar from "./Topbar";
import { AreaChartComponent } from "./assets/AreaChartComponent";
import { ChartComponent2 } from "./assets/ChartComponent2";

export default function Maincontent () {

    return (
<main className="w-full h-screen overflow-auto bg-white shadow-md">
      <section className="topbar-container">
        <Topbar />
      </section>
      <section className="content p-12 flex flex-col gap-y-8">
        <div className="total-products">
          <h2 className="text-3xl font-medium">Total Products</h2>
        </div>
        <article className="charts flex flex-row w-full gap-x-8">
          <div className="chart1 w-1/2 h-96 p-4 bg-gray-50 shadow-sm rounded-md">
            <AreaChartComponent />
          </div>
          <div className="chart2 w-1/2 h-96 p-4 bg-gray-50 shadow-sm rounded-md">
            <ChartComponent2 />
          </div>
        </article>
      </section>
    </main>
    )
}