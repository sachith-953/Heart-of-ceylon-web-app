import React from "react"

export default function Accordion({children}:{
    children: React.ReactNode
}){
    return <ul>
        {children}
    </ul>
}