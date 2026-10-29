import './RecentStories.css'

const stories=[
  {title:'Kitchen tile ideas for a considered home',category:'KITCHEN DESIGN',image:'/images/ventozza-kitchen-upload.png',summary:'A practical guide to choosing a backsplash and floor finish that work together.'},
  {title:'Bring pattern to an outdoor space',category:'OUTDOOR TILES',image:'/images/ventozza-tile-assortment.png',summary:'Explore ways to use texture and pattern across balconies, patios and terraces.'},
  {title:'Make a living room feel complete',category:'LIVING ROOM',image:'/images/ventozza-marble-living-room.png',summary:'Use scale, tone and finish to create a calm foundation for the room.'},
  {title:'Choosing bathroom tiles with confidence',category:'BATHROOM DESIGN',image:'/images/ventozza-gold-marble-bathroom.png',summary:'Balance visual character with a considered choice of wall and floor finishes.'},
]

export default function RecentStories(){return <section className="recent-stories"><header><span className="eyebrow"><i/> THE VENTOZZA JOURNAL</span><h2>Ideas for considered<br/><em>spaces.</em></h2><p>Tile guides, room inspiration and simple notes to help you plan your surfaces.</p></header><div className="story-grid">{stories.map((story)=><article className="story-card" key={story.title}><div className="story-image"><img src={story.image} alt={story.category.toLowerCase().replace(' ',' ')}/><span>{story.category}</span></div><div className="story-copy"><small style={{ color:'#ff7911' }}>VENTOZZA · FIELD NOTES</small><h3>{story.title}</h3><p>{story.summary}</p><a href="#products">EXPLORE TILE IDEAS <span aria-hidden="true">↗︎</span></a></div></article>)}</div></section>}
