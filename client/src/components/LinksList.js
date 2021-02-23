import React from 'react'
import {Link} from "react-router-dom";

 export  const LinksList = ({ links }) => {

    if (!links.length){
        return (
            <p className="center">Linkuri momentan nu-s</p>
        )
    }
    return(
        <>
            <table>
                <thead>
                <tr>
                    <th>Nr</th>
                    <th>Original</th>
                    <th>Prescurtat</th>
                    <th>Deschide</th>

                </tr>
                </thead>
                <tbody>
                { links.map( (link, index) =>{
                    return (
                        <tr key={link._id}>
                            <td>{index + 1}</td>
                            <td>{link.from}</td>
                            <td>{link.to}</td>
                            <td>
                                <Link to={`/detail/${link._id}`}>Deschide</Link>
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </>
    )
 }