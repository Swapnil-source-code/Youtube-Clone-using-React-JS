import { useEffect, useState } from 'react'
import './Recommended.css'
import thumbnail1 from '../../assets/images/thumbnail1.png'
import { value_converter } from '../../data'



const Recommended = ({categoryId}) => {
  
  const [apiData, setApiData] = useState([]);
  
  const fetchData = async () => {
    
    const relatedVideo_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=45&regionCode=US&videoCategoryId=${categoryId}&key=${import.meta.env.VITE_API_KEY}`;
    
    await fetch(relatedVideo_url).then(res => res.json()).then(data => setApiData(data.items))

  }

  useEffect(() => {
    fetchData();
  },[])


  return (
    <div className='recommended'>
      {/* {apiData.map((item,index) => {
        return (
        <div key={index} className="side-video-list">
          <img src={item.snippet.thumbnails.medium.url} alt="" />
          <div className="vid-info">
            <h4>{item.snippet.Title}</h4>
            <p>{item.snippet.channelsTitle}</p>
            <p>{value_converter(item.statistics.viewCount)} Views</p>
          </div>
        </div>
        )
      })} */}
 
    </div>
  )
}

export default Recommended