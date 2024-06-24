import React from "react"

export default function AccordionItem({title, children}:{
    title:React.ReactNode
    children: React.ReactNode
}){
    return <li>
        <h3>{title}</h3>
        <div>{children}</div>
    </li>
}