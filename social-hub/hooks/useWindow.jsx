import React, { useEffect, useState } from 'react'

export default function useWindow() {

    const hasWindow = typeof window !== 'undefined'

    function getWindow () {
        const width = hasWindow ? innerWidth : null;
        const height = hasWindow ? innerHeight : null;

        return {
            width, 
            height
        }

    }

    const [windowDiemension, setWindowDiemension] = useState(getWindow())

    useEffect(()=> {
        if(hasWindow) {
            function handleResize() {
                setWindowDiemension(getWindow());
            }

            window.addEventListener('resize', handleResize)
            return ()=> window.removeEventListener('resize', handleResize);
        }
    }, [hasWindow])

    return windowDiemension;
 }

