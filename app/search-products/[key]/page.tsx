
export default function Page({ params }: { params: { key: string } }) {
    console.log("*********** key *************")
    console.log(params.key)
    return (
        <>
            <div>Search key: {params.key}</div>

        </>
    )
}