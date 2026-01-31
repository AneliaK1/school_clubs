export default function ModerationCard({number, text, color}){
  return(
    <div className="flex flex-row items-center justify-center shadow-sm bg-white border border-1 rounded-xl h-16 md:h-36 relative ">
      <div className={`text-xl md:text-3xl font-semibold ${color}`}>{number}</div>
      <div className="absolute top-2/3 text-xs md:text-sm text-neutral-500 ">{text}</div>
    </div>
  )
}