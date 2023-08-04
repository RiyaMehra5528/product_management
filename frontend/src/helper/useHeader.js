

function useHeader()
{
    const token=localStorage.getItem("token")
    const headers={
        headers:{
            Authorization:`Bearer ${token}`
        }
    }
    return headers
    
}

export default useHeader;