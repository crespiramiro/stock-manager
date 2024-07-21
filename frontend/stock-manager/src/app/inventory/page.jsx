import { ToastWrapper } from "keep-react"
import Slidebar from "../dashboard/Slidebar"
import AuthGuard from "../components/AuthGuard"
import { Suspense, lazy } from "react"
const TableComponent = lazy(() => import('./TableComponent') )
export default function Inventory() {

    return( 
            <AuthGuard>
        <main className="min-h-screen w-full flex flex-row " >
            <Slidebar />
            <section className="content w-full h-full  px-12 mt-4 scroll ">
                <ToastWrapper 
                    toastOptions={{
                        classNames: {
                          toast: 'dark:bg-metal-900 border dark:border-metal-800 border-white bg-white',
                          title: 'text-metal-900 dark:text-white',
                          description: 'dark:text-metal-300 text-metal-600',
                          actionButton: 'dark:bg-metal-800 bg-metal-900 text-white',
                          cancelButton: 'dark:bg-metal-800 bg-metal-900 text-white',
                          closeButton: 'dark:bg-metal-800 bg-metal-900 text-white',
                          error: 'text-error-500',
                          success: 'text-success-500',
                          warning: 'text-warning-500',
                          info: 'text-primary-500',
                        },
                      }}
                />
                <Suspense fallback={<div>Loading Table...</div>} >
                    <TableComponent/>
                </Suspense>
            </section>
        </main>
        </AuthGuard>
    )
};