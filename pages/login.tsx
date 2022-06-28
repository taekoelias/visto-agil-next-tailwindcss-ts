import { NextPageContext } from 'next'
import { ClientSafeProvider, getProviders, signIn, signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { FormEvent } from 'react'
import { Button } from '../app/common/components/elements/Button'

interface LoginProps {
  providers: ClientSafeProvider[]
}

const Login = ({providers}: LoginProps) => {

  const { data: session } = useSession();

  const router = useRouter()

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    router.push('/admin')
  }

  if (session) {
    return (
      <div className='font-serif flex justify-center items-center min-h-screen flex-col'>
        <h1 className='text-4xl font-bold text-center py-8'>
          Hi, {session.user?.name}!
        </h1>
        <div className='w-[380px] px-8 py-6 mt-4 text-left rounded bg-white shadow-lg'>
          <Button onClick={() => signOut()}
            type='button' 
            className='w-full'>
            Sign out
          </Button>
        </div>
      </div>
    )
  }

  return (
      <div className='font-serif flex justify-center items-center min-h-screen flex-col'>
        
        <h1 className='text-4xl font-bold text-center py-8'>
          Sign into your account
        </h1>
        <div className='w-[380px] px-8 py-6 mt-4 text-left rounded bg-white shadow-lg'>
          {
            /*
            <div className=''>
              <form onSubmit={handleSubmit}>
                <InputText 
                  label='Email'
                />
                <InputPassword 
                  label='Password'
                />
                <div className='flex items-baseline justify-between'>
                  <fieldset>
                    <input className='rounded' type='checkbox'/>
                    <label className='ml-2'>Remember me</label>
                  </fieldset>

                  <a className='text-sm text-blue-600 hover:underline'
                    href=''>
                    <span>Forgot password?</span>
                  </a>
                </div>
                <div className='mt-8'>
                  <Button type='submit' className='w-full'>
                    Login
                  </Button>
                </div>
              </form>
            </div>
            <div className='mt-4 text-center'>
              <span className='text-sm text-slate-500 bg-white'>Or</span>
            </div>
            */
          }
          <div className='flex items-baseline justify-between pt-4'>
            {
              /** 
            <a className='px-10 py-1 rounded border border-slate-300 text-slate-500 hover:bg-slate-200 transition-colors' 
              href="">
                <FacebookLogo size={24} weight='fill'/>
            </a>
            <a className='px-10 py-1 rounded border border-slate-300 text-slate-500 hover:bg-slate-200 transition-colors' 
              href="">
                <TwitterLogo size={24} weight='fill'/>
            </a>
            <a className='px-8 py-1 rounded border border-slate-300 text-slate-500 hover:bg-slate-200 transition-colors' 
              href=""
              onClick={() => signIn()}>
                <GoogleLogo size={24} weight='fill'/>
            </a>
              */
            }
            {Object.values(providers).map(provider => (
              <div className='w-full' key={provider.name}>
                <Button onClick={() => signIn(provider.id)}
                  className='w-full flex justify-center items-center gap-2'>
                  <span>{provider.name}</span>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
  )
}

export default Login

export async function getServerSideProps(context: NextPageContext) {
  const providers = await getProviders()
  return {
    props: { providers },
  }
}