import { useTheme } from '../../context/ThemeContext';
import { SparklesCore } from '../../ui/Aceternity/Sparkles';
import ShareLinks from '../Links/ShareLinks';

export default function HomeNoAuth() {
   const { theme } = useTheme(),
      isDark = theme === 'dark';

   return (
      <>
         <div className='home__no-auth'>
            <div className='home__no-auth--container'>
               <SparklesCore
                  id='tsparticlesfullpage'
                  background='transparent'
                  minSize={0.6}
                  maxSize={1.4}
                  particleDensity={100}
                  className='w-full h-full'
                  particleColor={isDark ? '#8debcf' : '#ed535b'}
               />
            </div>
            <h1 className='heading-primary'>Here comes some fancy title</h1>
         </div>
         <ShareLinks />
      </>
   );
}
