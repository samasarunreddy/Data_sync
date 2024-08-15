import HandShakeComponent from '@/components/HandShake';
import MainFormComponent from '@/components/MainForm';
import ServerProgress from '@/components/ServerProgress';

export default function Home() {
  return (
    <main className='flex flex-col flex-auto text-white'>
      <div className='bg-form-bg-color bg-cover h-screen w-full flex flex-col justify-center items-center'>
        {/* <MainFormComponent /> */}
        {/* <HandShakeComponent /> */}
        <ServerProgress />
      </div>
    </main>
  );
}
