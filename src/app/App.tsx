import { Suspense } from 'react';
//import { AppRouter } from './providers/router';
//import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import classNames from 'classnames';

function App() {
    //const { theme } = useTheme();

    return (
        // <div {/*className={classNames('app', theme)}*/}>
            <Suspense fallback="">
                    {/* <AppRouter /> */}
            </Suspense>
        // </div>
    );
}

export default App;
