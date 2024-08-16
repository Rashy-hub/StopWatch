import './App.css'
import Stopwatch from './components/StopWatch'
import Header from './containers/Header'
import Footer from './containers/Footer'

function App() {
    const title = 'StopWatch App'

    return (
        <>
            <Header title={title} />
            <main className="container mx-auto my-10 px-4  pb-20">
                <div className="container mx-auto p-4">
                    <Stopwatch />
                </div>
            </main>
            <Footer title={title} />
        </>
    )
}

export default App
