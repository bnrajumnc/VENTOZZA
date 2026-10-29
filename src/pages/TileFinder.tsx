import { useEffect, useRef, useState, type ChangeEvent, type DragEvent } from 'react'
import './TileFinder.css'

type Product = { name:string; code:string; size:string; finish:string; image:string; alt:string }
type Props = { products:Product[]; onEnquire:(name:string)=>void }

const averageColor = (src: string) => new Promise<[number, number, number]>((resolve, reject) => {
  const image = new Image()
  image.onload = () => {
    try {
      const canvas = document.createElement('canvas')
      canvas.width = 24
      canvas.height = 24
      const context = canvas.getContext('2d', { willReadFrequently: true })
      if (!context) throw new Error('Canvas unavailable')
      context.drawImage(image, 0, 0, 24, 24)
      const pixels = context.getImageData(0, 0, 24, 24).data
      let red = 0, green = 0, blue = 0, count = 0
      for (let index = 0; index < pixels.length; index += 16) {
        red += pixels[index]; green += pixels[index + 1]; blue += pixels[index + 2]; count++
      }
      resolve([red / count, green / count, blue / count])
    } catch (error) { reject(error) }
  }
  image.onerror = () => reject(new Error('Image could not be read'))
  image.src = src
})

export default function TileFinder({products,onEnquire}:Props){
  const inputRef=useRef<HTMLInputElement>(null)
  const requestId=useRef(0)
  const [preview,setPreview]=useState('')
  const [fileName,setFileName]=useState('')
  const [matches,setMatches]=useState<Product[]>([])
  const [busy,setBusy]=useState(false)
  const [error,setError]=useState('')
  const [dragging,setDragging]=useState(false)
  useEffect(() => () => {
    if (preview.startsWith('blob:')) URL.revokeObjectURL(preview)
  }, [preview])
  const findMatches=async(file:File)=>{
    const currentRequest=++requestId.current
    setError('');setMatches([]);setBusy(false)
    if(!['image/jpeg','image/png','image/webp'].includes(file.type)){setError('Choose a JPG, PNG or WEBP image.');return}
    if(file.size>3.5*1024*1024){setError('Choose an image under 3.5 MB.');return}
    const url=URL.createObjectURL(file);setPreview(url);setFileName(file.name);setBusy(true)
    try{
      const [r,g,b]=await averageColor(url)
      const scored=await Promise.all(products.map(async product=>{
        try{const [pr,pg,pb]=await averageColor(product.image);return {product,distance:Math.hypot(r-pr,g-pg,b-pb)}}
        catch{return null}
      }))
      if(currentRequest!==requestId.current)return
      const ranked=scored.filter((item):item is {product:Product;distance:number}=>item!==null).sort((a,b)=>a.distance-b.distance).slice(0,3)
      if(!ranked.length)throw new Error('No tile reference images available')
      setMatches(ranked.map(item=>item.product))
    }catch{if(currentRequest===requestId.current)setError('We couldn’t compare that image. Please try another JPG, PNG or WEBP photo.')}
    finally{if(currentRequest===requestId.current)setBusy(false)}
  }
  const changed=(event:ChangeEvent<HTMLInputElement>)=>{const file=event.target.files?.[0];event.currentTarget.value='';if(file)void findMatches(file)}
  const dropped=(event:DragEvent<HTMLDivElement>)=>{event.preventDefault();setDragging(false);const file=event.dataTransfer.files[0];if(file)void findMatches(file)}
  const clearImage=()=>{requestId.current++;setBusy(false);setPreview('');setFileName('');setMatches([]);setError('')}
  return <section className="tile-finder" id="tile-finder"><div className="finder-heading"><span className="eyebrow eyebrow-light"><i/> TILE IMAGE FINDER</span><h2>Find the tile behind<br/>your <em>inspiration.</em></h2><p>Upload a room or tile photo. Suggestions are matched locally by overall colour tone; your image is not uploaded.</p></div><div className="finder-upload"><div className="finder-steps"><article><span>01</span><div><b>Upload an image</b><p>Choose a room photo or a tile design you love.</p></div></article><article><span>02</span><div><b>Explore suggestions</b><p>See a few tile options selected by overall colour tone.</p></div></article>{preview&&<div className="finder-file-preview"><img src={preview} alt="Your selected tile inspiration"/><div><b>{fileName}</b><button type="button" onClick={clearImage}>REMOVE IMAGE</button></div></div>}</div><div className={`finder-dropzone ${dragging?'is-dragging':''}`} onDragOver={e=>{e.preventDefault();setDragging(true)}} onDragLeave={()=>setDragging(false)} onDrop={dropped}><span className="finder-upload-icon">↥</span><strong>{busy?'Finding similar colour tones…':'SELECT A FILE OR DRAG AND DROP HERE'}</strong><small>JPG, PNG or WEBP · Maximum file size: 3.5 MB</small><button type="button" disabled={busy} onClick={()=>inputRef.current?.click()}>{busy?'COMPARING…':'SELECT FILE'}</button><input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp" onChange={changed}/>{error&&<p role="alert">{error}</p>}</div></div>{matches.length>0&&<div className="finder-results"><div className="finder-results-heading"><span className="eyebrow"><i/> SUGGESTED TILE LOOKS</span><small>Based on colour tone · confirm product details with our team</small></div><div className="finder-result-grid">{matches.map((product,i)=><article key={product.name}><img src={product.image} alt={product.alt}/><div><small>0{i+1} · {product.code}</small><b>{product.name}</b><span>{product.size} · {product.finish}</span><button onClick={()=>onEnquire(`${product.name} image-match enquiry`)}>ASK ABOUT THIS TILE →</button></div></article>)}</div></div>}</section>
}
