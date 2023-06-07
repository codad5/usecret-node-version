export default function AuthPage(){
    return (
      <>
      <section className='w-full pt-10 p-4 text-center grid place-items-center'>
        <h3 className='text-3xl font-bold w-4/5'>
          GET FEEDBACKS FROM FRiENDS
        </h3>
      </section><section className='w-full p-4'>
          <div className='w-full grid place-items-center p-4'>
            <button name="sign-in-with-google" type="button" className='bg-red-600 px-3 py-1 text-xl rounded-md text-center'>
              Continue with google
            </button>
          </div>
          <div className='w-full grid place-items-center p-1'>
            <span className='text-2xl font-bold'>OR</span>
          </div>
          <div className='w-full grid place-items-center p-4 pt-1'>
            <form className='w-4/5 p-2 max-w-screen-md'>
              <label htmlFor="username" className='w-full text-base text-sky-900 font-semibold'></label>
              <input type="tel" name="username" placeholder='Username' id="username" className='mb-3 outline-none bg-transparent border border-zinc-500 p-2 w-full' />
              <label htmlFor="whatsapp-no" className='w-full text-base text-sky-900 font-semibold'></label>
              <input type="tel" name="whatsapp-no" placeholder='WhatsApp No' id="whatsapp-no" className='mb-3 outline-none bg-transparent border border-zinc-500 p-2 w-full' />
              <button name="sign-in-with-google" type="button" className='bg-green-600 px-2 py-1 text-xl rounded-md text-center'>
                Continue with Whatsapp
              </button>
            </form>
          </div>
        </section>
        </>)
}