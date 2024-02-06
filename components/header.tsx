export default function Header()
{
    return (
        <header className="sticky text-center w-screen p-4 top-5  before:absolute before:h-[300px] before:w-[480px]  before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px]  after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40">
            <h1 className="font-bold text-2xl text-center pt-3">
                <a href="/">Usecrets</a>
            </h1>
            {/*  an inline nav bar on large screen and list on small screen with link to login , privacy*/}
            <nav className="flex justify-center items-center space-x-4">
                <a href="/messages" className="text-md font-semibold ">Login</a>
                <a href="/privacy" className="text-md font-semibold ">Privacy</a>
            </nav>
        </header>
    )
}