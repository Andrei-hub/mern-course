import React from 'react'



export const LinkCard = ({ link }) => {
    return(
        <>
            <h2>Link</h2>
            <p>Link prescurtat: <a href={link.to} target="_blank" rel="noopener noreferrer">{link.to}</a></p>
            <p>Destinatia: <a href={link.from} target="_blank" rel="noopener noreferrer">{link.from}</a></p>
            <p>Numarul clik-urilor: <strong>{link.clicks}</strong></p>
            <p>Data Crearii <strong>{new Date(link.date).toLocaleDateString()}</strong></p>
        </>
    )
}