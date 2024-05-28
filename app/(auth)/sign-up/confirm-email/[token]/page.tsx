

export default function EmailVerifyTokenAccept({ params, } : { params : {token : string}}){
    return (
        <>
            <h1>Please Wait... checking you token</h1>
            <h1>Token : {params.token}</h1>
        </>
    )
}