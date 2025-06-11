const BackgroundElements = () => {
 return (
 <div className="absolute inset-0 overflow-hidden pointer-events-none">
 <div className="absolute left-0 top-0 w-[500px] h-[500px] rounded-full bg-blue-500/5 blur-3xl"/>
 <div className="absolute right-0 bottom-0 w-[800px] h-[800px] rounded-full bg-purple-500/5 blur-3xl"/>
 <div className="absolute right-1/3 top-1/4 w-[300px] h-[300px] rounded-full bg-yellow-500/5 blur-3xl"/>
 </div>
 );
};

export default BackgroundElements; 