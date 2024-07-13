import React from 'react'

function Logo({
    width = '100px',
    className='',
    color = 'black'
}) {
    const blacklogoUrl = 'https://cloud.appwrite.io/v1/storage/buckets/669010400037811ac494/files/669010720027f9ba856c/view?project=6677d09f00334bdb2a9e&mode=admin'
    const whitelogoUrl = 'https://cloud.appwrite.io/v1/storage/buckets/669010400037811ac494/files/6690ec8800322142e900/view?project=6677d09f00334bdb2a9e&mode=admin'

            if(color=='black'){
                return <img src={blacklogoUrl} width={width} className={`${className}`}></img>
            }
            else{
                return <img src={whitelogoUrl} width={width} className={`${className}`}></img>
            }

}

export default Logo
