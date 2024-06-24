import Topbar from "./Topbar";
import { AreaChartComponent } from "./assets/AreaChartComponent";
import { ChartComponent2 } from "./assets/ChartComponent2";

export default function Maincontent () {

    return (

        <main className="w-full h-screen" >
            <section className="topbar-container" >
            <Topbar />
            </section>
            <section className="content p-12 flex flex-col  " >
                <div className="total-products">
                <h2 className="text-2xl font-medium" >Total Products</h2>
                </div>
                <article className="charts flex flex-row w-full gap-x-8 ">
                    <div className="chart1 w-1/2 ">
                    <AreaChartComponent />
                    </div>
                    <div className="chart2 w-1/2">
                        <ChartComponent2/>
                    </div>
                </article>
            </section>
        </main>
    )
}