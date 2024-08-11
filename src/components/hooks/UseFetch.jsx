import { useEffect, useRef, useState } from "react"

const useFetch = (fetchData) => {
    const [ data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const hasFetched = useRef(false)

    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true

        const loadData = async () => {
            try {
                const result = await fetchData()
                setData(result)
                setLoading(false)
            } catch (error) {
                setError(error)
                setLoading(false)
            }
        }
        loadData()
    }, [fetchData])

    return { data, loading, error }
}

export default useFetch
