import { useEffect, useState } from 'react'
import './PlayVideo.css'
import like from '../../assets/images/like.png'
import dislike from '../../assets/images/dislike.png'
import share from '../../assets/images/share.png'
import save from '../../assets/images/save.png'
import { value_converter } from '../../data'
import moment from 'moment'


const PlayVideo = ({ videoId }) => {
  
  const [apiData, setApiData] = useState(null);
  const [channelData, setChannelData] = useState(null);
  const [commentData, setCommentData] = useState([]);
  
  const fetchVideoData = async () => {
    //Fetching Video Data
    const videoDetails_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${import.meta.env.VITE_API_KEY}`;
    
    await fetch(videoDetails_url).then(response=>response.json()).then(data=>setApiData(data.items[0]))
  }

  const fetchOtherData = async () => {
    //Fetching Channel data  
    const channelData_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${import.meta.env.VITE_API_KEY}`;
    await fetch(channelData_url).then(response => response.json()).then(data => setChannelData(data.items[0]))
    
    //fetching comment data
    const comment_url=`https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=100&videoId=${videoId}&key=${import.meta.env.VITE_API_KEY}`
    await fetch(comment_url).then(response => response.json()).then(data => setCommentData(data.items))

  }
  
  useEffect(() => {
    fetchVideoData();
  },[])

  useEffect(() => {
    fetchOtherData();
  },[apiData])

  return (
      <div className="play-video">
        
        <iframe src={`https://www.youtube.com/embed/${videoId}?autoplay=1`} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
      
        <h3>{apiData ? apiData.snippet.title : "Title Here"}</h3>
        <div className='play-video-info'>
          <p>{apiData ? value_converter(apiData.statistics.viewCount) : "16K"} view &bull; {apiData?moment(apiData.snippet.publishedAt).fromNow():""}</p>
          <div>
          <span><img src={like} alt="" />{apiData?value_converter(apiData.statistics.likeCount):"155" }</span>
            <span><img src={dislike} alt="" /></span>
            <span><img src={share} alt="" />share</span>
            <span><img src={save} alt="" /> Save</span>
          </div>
        </div>
      
        <div className="publisher">
          <img src={channelData?channelData.snippet.thumbnails.default.url:""} alt="" />
          <div>
          <p>{apiData?apiData.snippet.channelTitle:""}</p>
          <span>{channelData?value_converter(channelData.statistics.subscriberCount):"1M"} Subscrbers</span>
          </div>
          <button>Subscribe</button>
        </div>
        <div className="vid-description">
        <div className="description">
          <p>{apiData ? apiData.snippet.description.slice(0, 250) : "Description Here"}</p>
        </div>
        <hr />
        <h4>{apiData ? value_converter(apiData.statistics.commentCount) : "102"} Comments</h4>
        {commentData.map((item,index) => {
          return (
            <div key={index} className="comment">
              <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="" />
              <div>
                <h3>{item.snippet.topLevelComment.snippet.authorDisplayName}<span>1 day ago</span></h3>
                <p>{item.snippet.topLevelComment.snippet.textDisplay}</p>
                <div className="comment-action">
                  <img src={like} alt="" />
                  <span>{value_converter(item.snippet.topLevelComment.snippet.likeCount)}</span>
                  <img src={dislike} alt="" />
                </div>
              </div>
            </div>
          )
        })}
        </div>
      </div>
  )
}

export default PlayVideo