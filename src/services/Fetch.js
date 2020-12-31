import {useState, useEffect} from 'react'
import {decode as atob, encode as btoa} from 'base-64'

const useFecth = (url, token) => {
    const [data, setData] = useState(0)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)


    useEffect(() => {
        
        const fetchResource = async () => {
          try{
              let res = await fetch(url, {
                method: 'GET',
                headers: { 'Authorization' : 'Bearer ' + token}
            })
              let data = await res.json()
            //console.log(data.access_token)
              setData(data)
              setLoading(false)
              
          } catch (error){
              setLoading(false)
              setError(error)
          }  
          }

        fetchResource()
    }, [url])

    return {data, loading, error}
}

const Token = (ClientId,ClientSecret) => {
    const [data, setData] = useState(0)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)


    useEffect(() => {
    
        const fetchResource = async () => {
          try{
              let res = await fetch('https://accounts.spotify.com/api/token', {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/x-www-form-urlencoded', 
                    'Authorization' : 'Basic ' + btoa(ClientId + ':' + ClientSecret)
                },
                body: 'grant_type=client_credentials'
            })
            ;
              let data = await res.json()
              //console.log(data.access_token)
              setData(data)
              setLoading(false)
              
          } catch (error){
              setLoading(false)
              setError(error)
          }  
          }

        fetchResource()
    }, [])

    return {data, loading, error}
}

export default {useFecth, Token}