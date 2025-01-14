import React, { useEffect, useRef } from "react";
import { PropsWithChildren } from "react";


export type ClickAwayProps = PropsWithChildren & {
    onClickAway: () => void
}

/**
 * Notify when the user click away from the wrapped container
 * @param props Event and children props
 * @returns 
 */
export default function ClickAway(props: ClickAwayProps) {

    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {

        function onClick(e: MouseEvent) {
            const clickInside = containerRef.current && containerRef.current.contains(e.target as HTMLElement)

            if (!clickInside)
                props.onClickAway();
        }

        window.addEventListener("click", onClick)
    }, [])

    return <div ref={containerRef}>
        {props.children}
    </div>
}