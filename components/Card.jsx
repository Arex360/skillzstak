export default function Card({img,title,className,onClick}){
    return(
        <div onClick={onClick} className={"card "+className}>
            <img src={img} alt=""/>
            <div className="card-title">
                <p className="w-full">{title}</p>
            </div>
        </div>
    )
}   