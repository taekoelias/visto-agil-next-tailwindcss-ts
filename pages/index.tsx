import type { NextPage } from 'next';

const Home: NextPage = () => {

  return (
    <nav className='absolute top-0 left-0 w-full z-10 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center'>
      <div className='bg-slate-600 w-full mx-auto items-center flex justify-between md:flex-nowrap flex-wrap'>
        <h2 className={`text-slate-100 text-2xl leading-5 tracking-wider font-medium pl-2 mb-2 inline`}>
          Visto Ágil
        </h2>

        <div className={`w-full relative table bg-white px-4 m-0 h-auto transition-all duration-300 md:bg-inherit md:block`}>
          <div className={`basis-full grow items-center md:basis-auto md:flex`}>
            <ul className='flex flex-row flex-wrap rounded float-right pl-0 list-none md:flex-row'>
              <li className='relative float-left leading-4 ml-0'>
                <a className='pt-5 pr-0 pb-4 pl-3.5 text-slate-800 leading-4 block bg-transparent cursor-pointer md:px-2'>
                  <span className='mr-1 text-lg self-center md:text-white'>
                    Cadastre-se
                  </span>
                </a>
              </li>
              <li className='float-left ml-0 leading-4 relative'>
                <a className='pt-5 pr-0 pb-4 pl-3.5 text-slate-800 leading-4 block bg-transparent cursor-pointer md:px-2'>
                  <span className='mr-1 text-lg self-center md:text-white'>
                    Entrar
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Home
